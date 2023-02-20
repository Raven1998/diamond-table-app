import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit{
  @Input()targetRes;
    width :string;
    margin:string;
    reservationType;
    startTime;
    endTime;
    isPaid;
    resID
    constructor(){}

    ngOnInit(): void {
      this.prepareReservationBox();
      const startDate = this.targetRes.startDate;
      this.startTime = startDate.substring(11,16)
      const endDate = this.targetRes.endDate;
      this.endTime = endDate.substring(11,16)
      this.isPaid = this.targetRes.isPaid;
      this.resID =this.targetRes.id;
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

    let boxSize=duration*8.33;

    this.width=boxSize+"%";
  }

  calculateBoxPosition(){
    let start =Date.parse(this.targetRes.startDate);
    
    const pointOfReferrence = new Date(start);
    pointOfReferrence.setHours(11);
    pointOfReferrence.setMinutes(0);

    const difference = (start-pointOfReferrence.getTime())/900000;

    let boxMargin=difference*2.0833;

    this.margin=boxMargin+"%";
  
  }
}
