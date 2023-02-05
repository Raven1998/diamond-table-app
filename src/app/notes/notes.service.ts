import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { Note } from "./note.model";

@Injectable({providedIn:'root'})
export class NotesService{


    constructor(private http:HttpClient){}

    createNote(content:string){

       return this.http.post('https://localhost:5001/notes',{content : content})

    }

    getNotes(){
      return this.http.get<{[key : string]:Note}>('https://localhost:5001/notes')
    .pipe(map(responseData =>{
      const notesArray: Note[] =[];
      for (const key in responseData){notesArray.push({...responseData[key], nr: key})};
      console.log(notesArray)
      return notesArray;
    }))
    
    }

    
    updateNote(id:string,content:string){
      const requestParams = new HttpParams().append('newContent',content)
      return this.http.patch('https://localhost:5001/notes/'+id,{},{params: requestParams})
    }

    deleteNote(id:string){
      return this.http.delete('https://localhost:5001/notes/'+id)
    }
    
}

