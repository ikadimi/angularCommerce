import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginForm, RegisterationForm } from "../components/models/auth.model";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private baseUrl = environment.authEndpoint;
    constructor(private http: HttpClient) {}

    login(userLogin: LoginForm) {
        return this.http.post(`${this.baseUrl}/login`, userLogin);
    }

    register(userRegistration: RegisterationForm) {
        return this.http.post(`${this.baseUrl}/register`, userRegistration);
    }
}