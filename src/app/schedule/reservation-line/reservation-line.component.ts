import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ScheduleComponent } from '../schedule.component';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-reservation-line',
  templateUrl: './reservation-line.component.html',
  styleUrls: ['./reservation-line.component.scss']
})
export class ReservationLineComponent implements OnInit{
  @Input()targetTable;
    Date =null;
    loadedReservations =[]
    error =null;
    resCount:number;
    currentTimeMargin:string =null;
    constructor(private scheduleService: ScheduleService, private scheduleComponent: ScheduleComponent){}

    ngOnInit(): void {
      this.Date = this.scheduleComponent.Date;
      this.scheduleService.getReservations(this.Date,this.targetTable.id).subscribe(reservations =>{
        this.loadedReservations = reservations;
        this.resCount =reservations.length;
      },error =>{this.error =error.message});

      setInterval(()=>this.showCurrentTimeLine(),1000);
    }

    showCurrentTimeLine(){
      const presentDate =new Date();

      if (presentDate.getHours() >11 && presentDate.getHours()<23){
      let pointOfReferrence = new Date();
      pointOfReferrence.setHours(11,0);
      let difference = (presentDate.getTime()-pointOfReferrence.getTime())/60000;
      const margin = difference*0.13888;
      this.currentTimeMargin =margin +"%";
      }
    }
}
