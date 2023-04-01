import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{
  error:string =null;
  loadedUsers:User[] =[];
  isEdited =false;
  message:string =null;

  constructor(private usersService:UsersService){}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users =>{
      this.loadedUsers = users;
    },error =>{this.error =error.message});

  }

  onCreateUser(form:NgForm){
    
    const costName:string = form.value.costName;
    const costValue:string = form.value.costValue;

    this.usersService.createUser(costName,costValue).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
    setTimeout(() =>this.ngOnInit(),500);
    
  }
}
