import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit{

  error =null;
  reservation:any;
  constructor(private route:ActivatedRoute, private scheduleService :ScheduleService){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.scheduleService.getSingleReservation(id).subscribe(reservations =>{
      this.reservation = reservations;
    },error =>{this.error =error.message});
    
  }

}
