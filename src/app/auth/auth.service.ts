import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'

export interface AuthResponseData {
    token: string;
}

@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http:HttpClient) {}

    signup(login: string, password: string){

       return this.http.post<AuthResponseData>('https://localhost:5001/users/register',{Username: login, Password: password});
    }

    
}