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
    constructor(private scheduleService: ScheduleService, private scheduleComponent: ScheduleComponent){}

    ngOnInit(): void {
      this.Date = this.scheduleComponent.Date;
      this.scheduleService.getReservations(this.Date,this.targetTable.id).subscribe(reservations =>{
        this.loadedReservations = reservations;
      },error =>{this.error =error.message});

      
    }


}
