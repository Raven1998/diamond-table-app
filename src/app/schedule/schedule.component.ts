import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Table } from '../table-management/table.model';
import { TablesService } from '../table-management/tables.service';
import { Reservation } from './reservation.model';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{

  error:string =null;
  loadedTables:Table[] =[];
  loadedReservations =[];
  Date = null;


  constructor(private scheduleService:ScheduleService, private tablesService:TablesService, private appComponent :AppComponent){}

  ngOnInit(): void {
    this.Date = this.appComponent.getDate();
    this.tablesService.getTables().subscribe(tables =>{
      this.loadedTables = tables;
    },error =>{this.error =error.message});

    
  }

  onCreateReservation(form:NgForm){
    const resTableId = form.value.resTableId;
    const bookerName =form.value.bookerName;
    const email = form.value.email;
    const phone = form.value.phone;
    const date =form.value.date;
    const start=form.value.start;
    const end=form.value.end;
    const isPaid =form.value.isPaid.toString();
    const Note = form.value.note;
    const resType = form.value.resType.toLowerCase();
  
    
    

    const splittedDate = date.split('-');
    const parsedDate = splittedDate[2]+"/"+splittedDate[1]+"/"+splittedDate[0]
    const startDate = parsedDate+" "+start;
    const endDate = parsedDate+" "+end;

    //"StartDate": "17/12/2022 15:55",
    //"EndDate": "17/12/2022 15:55",
    this.scheduleService.createReservation(resTableId,bookerName,email,phone,startDate,endDate,isPaid,Note,resType).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
    this.ngOnInit();
    
  }

  onChangeDateUp(){
    this.appComponent.dateUp();
    this.ngOnInit();
  }

  onChangeDateDown(){
    this.appComponent.dateDown();
    this.ngOnInit();
  }
}
