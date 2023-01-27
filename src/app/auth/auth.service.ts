import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export interface AuthResponseData {
    name: string;
    role: string;
    token: string;
}

@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http:HttpClient) {}

    signup(login: string, password: string){

       return this.http.post<AuthResponseData>('https://localhost:5001/users/register',{Username: login, Password: password})
       .pipe(catchError(this.handleError))
    }

    login(login: string, password:string){

        return this.http.post<AuthResponseData>('https://localhost:5001/login',{Username: login, Password: password})
        .pipe(catchError(this.handleError))
    }


    //Private method for handlingErrors
    private handleError(errorRes:HttpErrorResponse){

        let errorMessage ='An unknown error ocurred!'; 
        if(!errorRes.error && !errorRes.error.error){
            return throwError(errorMessage)
        }
        else{
        errorMessage =errorRes.error.message
        return throwError(errorMessage);
            }

    }

    
}