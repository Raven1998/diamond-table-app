import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{

  constructor(private statsService:StatisticsService){}
  loadedStats :any[] =[]
  error:string =null;

  ngOnInit(): void {
    this.statsService.getNotes().subscribe(stats =>{
      this.loadedStats = stats;
    },error =>{this.error =error.message});

    console.log(this.loadedStats)
  }


}
