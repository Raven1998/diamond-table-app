import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Cost } from "./cost.model";



@Injectable({providedIn:'root'})
export class CostsService{


    constructor(private http:HttpClient){}

    createCost(name:string, CostValue:string){

       return this.http.post('https://localhost:5001/costs',{name : name, CostValue: CostValue})

    }

    getCosts(){
      return this.http.get<{[key : string]:Cost}>('https://localhost:5001/costs')
    .pipe(map(responseData =>{
      const costsArray: Cost[] =[];
      for (const key in responseData){costsArray.push({...responseData[key], nr: key})};
      console.log(costsArray)
      return costsArray;
    }))
    
    }

    
    updateCost(id:string, name:string, value:string){
      let params={
        Name:name,
        CostValue:value
      }

      const requestParams = new HttpParams({fromObject:params})
      return this.http.patch('https://localhost:5001/costs/'+id,{},{params: requestParams})
    }

    deleteCost(id:string){
      return this.http.delete('https://localhost:5001/costs/'+id)
    }
    
}

