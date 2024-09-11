import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginForm, RegisterationForm } from "../components/models/auth.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private baseUrl = 'http://localhost:3001';
    constructor(private http: HttpClient) {}

    login(userLogin: LoginForm) {
        return this.http.post(`${this.baseUrl}/login`, userLogin);
    }

    register(userRegistration: RegisterationForm) {
        return this.http.post(`${this.baseUrl}/register`, userRegistration);
    }
}