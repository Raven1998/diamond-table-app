import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note.model';
import { NotesComponent } from './notes.component';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
  })
  export class NoteComponent implements OnInit{
    @Input()targetNote
    isEdited =false;
    error:string =null;
    parsedCreationDate:string =null;
    @ViewChild('newContent',{static:false}) newContent:ElementRef;
    constructor(private notesService: NotesService, private notesComponent:NotesComponent){
        
    }

    ngOnInit(): void {
      const date = this.targetNote.createdDate;
      const newDate = date.replace('T',' ');

      this.parsedCreationDate =newDate.substr(0,16);
    }
    allowEdit(){
        this.isEdited =true;
        
      }
      onEditNote(){
        const editData = this.newContent.nativeElement.value;
        this.notesService.updateNote(this.targetNote.id,editData).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message})
        this.isEdited = !this.isEdited;
      }
      onDeleteNote(id:string){
        this.notesService.deleteNote(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
        this.notesComponent.ngOnInit();
      }

      onCancel(){
        this.isEdited=!this.isEdited;
      }

    


  }