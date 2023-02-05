import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  loadedReservations:Reservation[] =[];

  constructor(private scheduleService:ScheduleService, private tablesService:TablesService){}

  ngOnInit(): void {
    this.tablesService.getTables().subscribe(tables =>{
      this.loadedTables = tables;
    },error =>{this.error =error.message});

    this.scheduleService.getReservations().subscribe(reservations =>{
      this.loadedReservations = reservations;
    },error =>{this.error =error.message});

    console.log(this.loadedReservations);

  }

  onCreateReservation(form:NgForm){
    const resTableId = form.value.resTableId;
    const bookerName =form.value.bookerName;
    const email = form.value.email;
    const phone = form.value.phone;
    const startDate=form.value.startDate;
    const endDate=form.value.endDate;
    const isPaid =form.value.isPaid.toString();
    
    console.log(endDate);

    //"StartDate": "17/12/2022 15:55",
    //"EndDate": "17/12/2022 15:55",
    this.scheduleService.createReservation(resTableId,bookerName,email,phone,startDate,endDate,isPaid).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
    this.ngOnInit();
    
  }
}
