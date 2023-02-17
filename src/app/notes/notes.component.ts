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
  message:string =null;
  loadedNotes:Note[] =[];
  isEdited =false;
  

  constructor(private http: HttpClient,private notesService: NotesService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes =>{
      this.loadedNotes = notes;
    },error =>{this.onShowError(error.message)});

  }

  onCreateNote(form:NgForm){
    console.log(form.value.note)
    const note:string = form.value.note

    this.notesService.createNote(note).subscribe(responseData =>{console.log(responseData); this.onShowMessage('Note created successfully');},error =>{this.onShowError(error.message)});
    setTimeout(() =>this.ngOnInit(),500);
    
  }

  onShowError(error :string){
    this.error = error;

    setTimeout(()=>{ this.error=null;},3000);
    
  }

  onShowMessage(message:string){
    this.message = message;

    setTimeout(()=>{ this.message=null;},3000);
    
  }

  



}
