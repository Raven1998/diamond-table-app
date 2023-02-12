import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Reservation } from "./reservation.model";


@Injectable({providedIn:'root'})
export class ScheduleService{

    constructor(private http:HttpClient){}

    createReservation(tableId:string, bookerName:string, email:string, phonenumber:string,startDate:string,endDate:string,isPaid:string,note :string,resType:string){

        return this.http.post('https://localhost:5001/reservations',{PoolTableId : tableId, BookerName :bookerName, email:email,PhoneNumber: phonenumber,StartDate: startDate, EndDate: endDate, IsPaid: isPaid, Note: note, ReservationType: resType})
 
     }

     getReservations(){
        return this.http.get<any>('https://localhost:5001/reservations/all')
      .pipe(map(responseData =>{
        const resArray: Reservation[] =[];
        for (const key in responseData){resArray.push({...responseData[key], nr: key})};
        console.log(resArray)
        return resArray;
      }))
      
      }


}