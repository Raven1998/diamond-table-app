import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit{

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    console.log(id);
  }

}
