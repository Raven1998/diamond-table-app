import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { BehaviorSubject, catchError, Subject, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";
import { Route, Router } from "@angular/router";

export interface AuthResponseData {
    name: string;
    role: string;
    token: string;
}

@Injectable({providedIn:"root"})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any

    constructor(private http:HttpClient, private router: Router) {}

    signup(login: string, password: string){

       return this.http.post<AuthResponseData>('https://localhost:5001/users/register',{Username: login, Password: password})
       .pipe(catchError(this.handleError))
    }

    login(login: string, password:string){

        return this.http.post<AuthResponseData>('https://localhost:5001/login',{Username: login, Password: password})
        .pipe(catchError(this.handleError), tap(resData=>{this.handleAuthentication(resData.name,resData.role,resData.token)}))
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin(){
      const userData:{login:string,role:string,_token:string,_tokenExpirationDate:Date} =JSON.parse(localStorage.getItem('userData'));
      if(!userData){return};
        
      const loadedUser = new User(userData.login,userData.role,userData._token,userData._tokenExpirationDate);
      console.log(loadedUser);
      if(loadedUser.token){

        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        //this.autoLogout(expirationDuration);
      }
    }

    //autoLogout(expirationDuration: number){
    //   this.tokenExpirationTimer = setTimeout(() =>{this.logout()}, expirationDuration)
   // }


    private handleAuthentication(login:string, role:string, token:string){

            const expirationDate = new Date(new Date().getTime() + 28800000);
            const user =new User(login,role,token,expirationDate);
            this.user.next(user);
            //this.autoLogout(Date.parse(expirationDate.toString()));
            localStorage.setItem('userData', JSON.stringify(user));
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