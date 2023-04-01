import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserManagementComponent } from '../user-management.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input()targetUser;
  isEdited =false;
  error:string =null;
  @ViewChild('newCostName',{static:false}) newCostName:ElementRef;
  @ViewChild('newCostValue',{static:false}) newCostValue:ElementRef;

  constructor(private usersService:UsersService, private userComponent :UserManagementComponent){}

  allowEdit(){
    this.isEdited =!this.isEdited;
  }

  onDeleteUser(id:string){
    this.usersService.deleteUser(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
    setTimeout(() =>this.userComponent.ngOnInit(),500);
  }

  onCancel(){
    this.isEdited=!this.isEdited;
  }

  onEditUser(){
    const editName = this.newCostName.nativeElement.value;
    const editValue =this.newCostValue.nativeElement.value;
    this.usersService.updateUser(this.targetUser.id,editName,editValue).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message})
    this.isEdited = !this.isEdited;
    setTimeout(() =>this.userComponent.ngOnInit(),500);
  }
}
