import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { Note } from "./note.model";

@Injectable({providedIn:'root'})
export class NotesService{


    constructor(private http:HttpClient){}

    createNote(content:string){

        this.http.post('https://localhost:5001/notes',{content : content},{headers:new HttpHeaders({'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ik1hY2llaiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE2NzUwMzI5MTUsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY4LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY4LyJ9.DQJwuMMxh7Mu07y4jVT3fe-75xTPxb9BY87ldpvXTiU'})}).subscribe(responseData =>{console.log(responseData)})

    }

    getNotes(){
      return this.http.get<{[key : string]:Note}>('https://localhost:5001/notes',{headers: new HttpHeaders({'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ik1hY2llaiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE2NzUwMzI5MTUsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY4LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY4LyJ9.DQJwuMMxh7Mu07y4jVT3fe-75xTPxb9BY87ldpvXTiU'})})
    .pipe(map(responseData =>{
      const notesArray: Note[] =[];
      for (const key in responseData){notesArray.push({...responseData[key], id: key})};
      return notesArray;
    }))
    
    }
    
}