import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit{
  @Input()targetRes;
    width;
    margin;
    reservationType;
    constructor(){}

    ngOnInit(): void {
      this.prepareReservationBox();
    }

    prepareReservationBox(){
      this.calculateBoxWidth();
      this.calculateBoxPosition();
      this.checkReservationType();
    }
    checkReservationType(){
      this.reservationType =this.targetRes.reservationType;
    }
    calculateBoxWidth(){
    let start = Date.parse(this.targetRes.startDate);
    let end = Date.parse(this.targetRes.endDate);

    let duration =(end-start)/3600000;

    let boxSize=duration*8.32;

    this.width=boxSize+"%";
  }

  calculateBoxPosition(){
    let start =Date.parse(this.targetRes.startDate);
    
    const pointOfReferrence = new Date(start);
    pointOfReferrence.setHours(11);
    pointOfReferrence.setMinutes(0);

    const difference = (start-pointOfReferrence.getTime())/900000;

    let boxMargin=difference*1.95;

    this.margin=boxMargin+"%";
  
  }
}
