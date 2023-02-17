import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CostComponent } from '../cost-management/cost.component';
import { Cost } from '../cost-management/cost.model';
import { CostsService } from '../cost-management/costs.service';
import { Table } from './table.model';
import { TablesService } from './tables.service';

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent implements OnInit{
  error:string =null;
  loadedTables:Table[] =[];
  loadedCosts:Cost[] =[];
  isEdited =false;

  constructor(private costsService:CostsService, private tablesService:TablesService){}

  ngOnInit(): void {
    this.costsService.getCosts().subscribe(costs =>{
      this.loadedCosts = costs;
    },error =>{this.error =error.message});

    this.tablesService.getTables().subscribe(tables =>{
      this.loadedTables = tables;
    },error =>{this.error =error.message});
  }
  
    onCreateTable(form:NgForm){
      const tableName = form.value.tableName;
      const tableDesc = form.value.tableDesc;
      const tableCostId = form.value.tableCostId;
      this.tablesService.createTable(tableName,tableDesc,tableCostId).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
      setTimeout(() =>this.ngOnInit(),500);
    
  }

}
