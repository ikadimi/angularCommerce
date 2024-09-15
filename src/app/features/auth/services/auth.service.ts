import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginForm, RegisterationForm } from "../components/models/auth.model";
import { environment } from "../../../../environments/environment";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private authUrl = environment.authEndpoint;
    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public user: Observable<any> = this.userSubject.asObservable();


    constructor(private http: HttpClient) {
        this.loadUserFromCookie();
    }

    private loadUserFromCookie() {
        this.http.get(`${this.authUrl}/me`).subscribe(user => this.userSubject.next(user));
    }

    login(userLogin: LoginForm) {
        return this.http.post(`${this.authUrl}/login`, userLogin)
                .pipe(tap(() => this.loadUserFromCookie()));
    }

    register(userRegistration: RegisterationForm) {
        return this.http.post(`${this.authUrl}/register`, userRegistration);
    }

    logout() {
        return this.http.post(`${this.authUrl}/logout`, {}).pipe(
          tap(() => this.userSubject.next(null))
        );
    }
}