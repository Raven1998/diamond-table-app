import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { TablesService } from "./tables.service";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
  })
export class TableComponent{
    @Input()targetTable;
    isEdited =false;
    error:string =null;
    @ViewChild('newCostName',{static:false}) newCostName:ElementRef;
    @ViewChild('newCostValue',{static:false}) newCostValue:ElementRef;

    constructor(private tablesService:TablesService){}

    allowEdit(){
      this.isEdited =!this.isEdited;
    }

    onDeleteTable(id:string){
      this.tablesService.deleteTable(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
      
    }

    onCancel(){
      this.isEdited=!this.isEdited;
    }

    onEditTable(){
      const editName = this.newCostName.nativeElement.value;
      const editValue =this.newCostValue.nativeElement.value;
      this.tablesService.updateTable(this.targetTable.id,editName,editValue).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message})
      this.isEdited = !this.isEdited;
    }

}