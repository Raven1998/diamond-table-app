import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { User } from "./user.model";



@Injectable({providedIn:'root'})
export class UsersService{


    constructor(private http:HttpClient){}

    createUser(name:string, CostValue:string){

       return this.http.post('https://localhost:5001/costs',{name : name, CostValue: CostValue})

    }

    getUsers(){
      return this.http.get<{[key : string]:User}>('https://localhost:5001/costs')
    .pipe(map(responseData =>{
      const costsArray: User[] =[];
      for (const key in responseData){costsArray.push({...responseData[key], nr: key})};
      console.log(costsArray)
      return costsArray;
    }))
    
    }

    
    updateUser(id:string, name:string, value:string){
      let params={
        Name:name,
        CostValue:value
      }

      const requestParams = new HttpParams({fromObject:params})
      return this.http.patch('https://localhost:5001/costs/'+id,{},{params: requestParams})
    }

    deleteUser(id:string){
      return this.http.delete('https://localhost:5001/costs/'+id)
    }
    
}

