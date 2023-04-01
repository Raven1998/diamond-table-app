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

     getReservations(date:any, tableId:string){
        return this.http.get<any>('https://localhost:5001/reservations/all')
      .pipe(map(responseData =>{
        const resArray:Reservation[]=[];
        for (const key in responseData){resArray.push({...responseData[key], nr: key})};
        //console.log(resArray)

        
        let requirement =date.replace(".","-");
        let condition =requirement.replace(".","-");
    
        const splittedDate = condition.split('-');
        const parsedDate = splittedDate[2]+"-"+splittedDate[1]+"-"+splittedDate[0]
        
        //Array of reservations filtered by date - we need reservations only for specified date.
        const filteredReservations =[];
        for(let i =0;i<resArray.length;i++){
            if(resArray[i].startDate.startsWith(parsedDate))
            { filteredReservations.push(resArray[i])}
        }
        
        

        //Reservation filtered by specified table
        const tableFilteredReservations =[];
        for(let i =0;i<filteredReservations.length;i++){
          if(filteredReservations[i].poolTableId == tableId)
          { tableFilteredReservations.push(filteredReservations[i])}
      }
        
        console.log(tableFilteredReservations);
        return tableFilteredReservations;
      }))
      
      }

      getSingleReservation(id:string){
        return this.http.get<any>('https://localhost:5001/reservations/'+id)
      .pipe(map(responseData =>{
        const reservation=responseData;
       // console.log(reservation);
        return reservation;
       
      }
        
      ));
      }

      deleteReservation(id:string){
        return this.http.delete('https://localhost:5001/reservations/'+id)
      }

}