import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls: ['./auth.component.scss']
   
})
export class AuthComponent{
    isLoginMode=true; //Standard Login or First Time Login
    isLoading=false;
    error:string =null;
    
    constructor(private authService:AuthService, private router: Router) {}



    //Switching beetwen modes
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    

    onSubmit(form:NgForm){
        if (!form.valid){return;}
        const login = form.value.login;
        const password = form.value.password;

        let authObs:Observable<AuthResponseData>;
        
        this.isLoading=true;
        //For First Time Login mode
        if(!this.isLoginMode){
        authObs = this.authService.signup(login,password)
            
        }
        //For standard login mode
        else{
            authObs = this.authService.login(login,password)
        }

        //Subscribing the observable for First Time Login or standard login 
        authObs.subscribe(
            resData =>{
                console.log(resData)
                this.isLoading=false;
                this.router.navigate(['']);
            }, 
            errorMessage =>{
                this.error=errorMessage;
                this.isLoading=false;
              console.log(errorMessage) ;
            }
                
        );

        form.reset();
    }


}