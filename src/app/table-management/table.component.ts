import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Cost } from "../cost-management/cost.model";
import { CostsService } from "../cost-management/costs.service";
import { TableManagementComponent } from "./table-management.component";
import { TablesService } from "./tables.service";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
  })
export class TableComponent implements OnInit{
    @Input()targetTable;
    isEdited =false;
    error:string =null;
    loadedCosts:Cost[] =[];
    @ViewChild('newTableName',{static:false}) newTableName:ElementRef;
    @ViewChild('newTableDesc',{static:false}) newTableValue:ElementRef;
    @ViewChild('newTableCost',{static:false}) newTableCost:ElementRef;

    constructor(private tablesService:TablesService, private costsService:CostsService, private tableComponent: TableManagementComponent){}


    ngOnInit(): void {
      this.costsService.getCosts().subscribe(costs =>{
        this.loadedCosts = costs;
      },error =>{this.error =error.message});
    }
    allowEdit(){
      this.isEdited =!this.isEdited;
    }

    onDeleteTable(id:string){
      this.tablesService.deleteTable(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
      setTimeout(() =>this.tableComponent.ngOnInit(),500);
    }

    onCancel(){
      this.isEdited=!this.isEdited;
    }

    onEditTable(){
      const editName = this.newTableName.nativeElement.value;
      const editDesc =this.newTableValue.nativeElement.value;
      const editTableCost =this.newTableCost.nativeElement.value;
      this.tablesService.updateTable(this.targetTable.id,editName,editDesc,editTableCost).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message})
      this.isEdited = !this.isEdited;
      setTimeout(() =>this.tableComponent.ngOnInit(),500);
    }

}