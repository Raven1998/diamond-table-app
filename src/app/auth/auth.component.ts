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

    isLoginMode=true;

    constructor(private authService:AuthService) {}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    

    onSubmit(form:NgForm){
        if (!form.valid){return;}
        const login = form.value.login;
        const password = form.value.password;
        
        
        this.authService.signup(login,password).subscribe(resData =>{console.log(resData)}, error =>{console.log(error);});
    }


}