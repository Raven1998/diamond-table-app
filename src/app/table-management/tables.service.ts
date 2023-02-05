import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Table } from "./table.model";



@Injectable({providedIn:'root'})
export class TablesService{


    constructor(private http:HttpClient){}

    createTable(name:string, desc:string, costId:string){

       return this.http.post('https://localhost:5001/pooltables',{Name : name, Description: desc, CostId: costId})

    }

    getTables(){
      return this.http.get<{[key : string]:Table}>('https://localhost:5001/pooltables')
    .pipe(map(responseData =>{
      const costsArray: Table[] =[];
      for (const key in responseData){costsArray.push({...responseData[key], nr: key})};
      console.log(costsArray)
      return costsArray;
    }))
    
    }

    
    updateTable(id:string, name:string, value:string){
      let params={
        Name:name,
        CostValue:value
      }

      const requestParams = new HttpParams({fromObject:params})
      return this.http.patch('https://localhost:5001/pooltables/'+id,{},{params: requestParams})
    }

    deleteTable(id:string){
      return this.http.delete('https://localhost:5001/pooltables/'+id)
    }
    
}

