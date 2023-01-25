import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export interface AuthResponseData {
    token: string;
}

@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http:HttpClient) {}

    signup(login: string, password: string){

       return this.http.post<AuthResponseData>('https://localhost:5001/users/register',{Username: login, Password: password})
       .pipe(catchError(errorRes =>
        { 
            let errorMessage ='An unknown error ocurred!'; 
            if(!errorRes.error && !errorRes.error.error){
                return throwError(errorMessage)
            }
            else{
            errorMessage =errorRes.error.message
            return throwError(errorMessage);
                }
        }))
    }

    
}