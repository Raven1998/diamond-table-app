import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  

  currentDate:Date =null;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();

    if(this.currentDate==null){this.currentDate = new Date()}
    
  }

  getDate(){
    return this.currentDate.toLocaleDateString('pl-PL');
  }

  dateUp(){
    const newDate= this.currentDate;
    newDate.setDate(this.currentDate.getDate()+1);
    
    this.currentDate =newDate;
  }

  dateDown(){
    const newDate= this.currentDate;
    newDate.setDate(this.currentDate.getDate()-1);
    
    this.currentDate =newDate;
  }
}
