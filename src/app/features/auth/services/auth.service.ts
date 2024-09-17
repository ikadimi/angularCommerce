import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { LoginForm, RegisterationForm } from "../components/models/auth.model";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApiWithNotificationService } from "../../../shared/services/api-with-notification.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private authUrl = environment.authEndpoint;
    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public user: Observable<any> = this.userSubject.asObservable();


    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private apiWithNotification: ApiWithNotificationService) {
        this.loadUserFromCookie();
    }

    getUserValue() {
        return this.userSubject.getValue();
    }

    private loadUserFromCookie() {
        this.http.get(`${this.authUrl}/me`).subscribe({
            next: (user) => this.userSubject.next(user),
            error: (error) => {
                if (error.status === 401) {
                    this.userSubject.next(null);
                }
                console.log('self auth error', error.status)}
            });
    }

    private setTokenToLocalStorage() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loggedIn', 'true');
        }
    }

    private removeTokenFromLocalStorage() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('loggedIn');
        }
    }

    login(userLogin: LoginForm) {
        return this.apiWithNotification.callApi(`${this.authUrl}/login`, 'POST', userLogin).pipe(
            tap(() => {
                this.loadUserFromCookie();
                this.setTokenToLocalStorage();
            })
        )
    }

    register(userRegistration: RegisterationForm) {
        return this.apiWithNotification.callApi(`${this.authUrl}/register`, 'POST', userRegistration).pipe(
            tap(() => this.loadUserFromCookie())
        )
    }

    logout() {
        return this.http.post(`${this.authUrl}/logout`, {}).pipe(
            tap(() => {
                this.userSubject.next(null);
                this.removeTokenFromLocalStorage();
            })
        );
    }
}