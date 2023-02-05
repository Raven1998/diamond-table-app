import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({providedIn:'root'})
export class StatisticsService{


    constructor(private http:HttpClient){}


    getNotes(){
      return this.http.get<{[key : string]:any}>('https://localhost:5001/statistics/transactions/average/daysofweek')
    .pipe(map(responseData =>{
      const statsArray: any[] =[];
      for (const key in responseData){statsArray.push({...responseData[key], nr: key})};
      console.log(statsArray)
      return statsArray;
    }))
    
    }

}