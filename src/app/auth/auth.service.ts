import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Subject, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    name: string;
    role: string;
    token: string;
}

@Injectable({providedIn:"root"})
export class AuthService{

    user = new Subject<User>()

    constructor(private http:HttpClient) {}

    signup(login: string, password: string){

       return this.http.post<AuthResponseData>('https://localhost:5001/users/register',{Username: login, Password: password})
       .pipe(catchError(this.handleError))
    }

    login(login: string, password:string){

        return this.http.post<AuthResponseData>('https://localhost:5001/login',{Username: login, Password: password})
        .pipe(catchError(this.handleError), tap(resData=>{this.handleAuthentication(resData.name,resData.role,resData.token)}))
    }


    private handleAuthentication(login:string, role:string, token:string){

            const expirationDate = new Date(new Date().getTime() + 28800000);
            const user =new User(login,role,token,expirationDate);
            this.user.next(user);
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