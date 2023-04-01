import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/table-management/tables.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit{

  error =null;
  reservation:any;
  timeOfStart:string
  timeOfEnd:string
  day:string
  table:any
  constructor(private route:ActivatedRoute, private tablesService :TablesService, private scheduleService :ScheduleService){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const data = history.state.data;
  
    this.reservation =data;
    this.tablesService.getSingleTable(this.reservation.poolTableId).subscribe(table =>{
      this.table = table;
    },error =>{this.error =error.message});
    
    console.log(this.reservation)
    this.getSeparatedDateDetails()
  }

  getSeparatedDateDetails(){
    const data :string= this.reservation.startDate;
    const data1:string =this.reservation.endDate;
    const startHour = data.substring(11,16)
    this.timeOfStart =startHour;
    const endHour =data1.substring(11,16)
    this.timeOfEnd =endHour;
    const day =data.substring(0,10)
    this.day =day;
    
  }
  onDeleteReservation(id:string){
    this.scheduleService.deleteReservation(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
  }

}
