import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AppComponent } from "../app.component";
import { Reservation } from "./reservation.model";


@Injectable({providedIn:'root'})
export class ScheduleService{

    constructor(private http:HttpClient){}

    createReservation(tableId:string, bookerName:string, email:string, phonenumber:string,startDate:string,endDate:string,isPaid:string,note :string,resType:string){

        return this.http.post('https://localhost:5001/reservations',{PoolTableId : tableId, BookerName :bookerName, email:email,PhoneNumber: phonenumber,StartDate: startDate, EndDate: endDate, IsPaid: isPaid, Note: note, ReservationType: resType})
 
     }

     getReservations(date:any){
        return this.http.get<any>('https://localhost:5001/reservations/all')
      .pipe(map(responseData =>{
        const resArray:Reservation[]=[];
        for (const key in responseData){resArray.push({...responseData[key], nr: key})};
        console.log(resArray)

        
        let requirement =date.replace(".","-");
        let condition =requirement.replace(".","-");
    
        const splittedDate = condition.split('-');
        const parsedDate = splittedDate[2]+"-"+splittedDate[1]+"-"+splittedDate[0]
        
        const filteredReservations =[];
        for(let i =0;i<resArray.length;i++){
            if(resArray[i].startDate.startsWith(parsedDate))
            { filteredReservations.push(resArray[i])}
        }
    
        console.log(filteredReservations);
        return filteredReservations;
      }))
      
      }


}