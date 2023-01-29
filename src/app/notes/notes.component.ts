import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { exhaustMap, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{
  error:string =null;
  loadedNotes:Note[] =[];

  constructor(private http: HttpClient,private notesService: NotesService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes =>{
      this.loadedNotes = notes;
    });
  }

  onCreateNote(form:NgForm){
    console.log(form.value.note)
    const note:string = form.value.note

    this.notesService.createNote(note);
    
    //return this.authService.user.pipe(take(1), exhaustMap(user =>{return this.http.post('https://localhost:5001/notes',{content:note},{headers:new HttpHeaders({'Authorization' :'Bearer '+user.token})});}))
    
  }



}
