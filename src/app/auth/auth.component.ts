import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { of } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{

    isLoginMode=true; //Standard Login or First Time Login
    error:string =null;
    
    constructor(private authService:AuthService) {}

    //Switching beetwen modes
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    

    onSubmit(form:NgForm){
        if (!form.valid){return;}
        const login = form.value.login;
        const password = form.value.password;
        
        //For First Time Login mode
        if(!this.isLoginMode){
        this.authService.signup(login,password).subscribe(
            resData =>{
                console.log(resData)
            }, 
            errorMessage =>{
                this.error=errorMessage;
              console.log(errorMessage) ;
            }
                
        );
        }
        //For standard login mode
        else{}

        form.reset();
    }


}