import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cost } from './cost.model';
import { CostsService } from './costs.service';

@Component({
  selector: 'app-cost-management',
  templateUrl: './cost-management.component.html',
  styleUrls: ['./cost-management.component.scss']
})
export class CostManagementComponent implements OnInit{
  error:string =null;
  loadedCosts:Cost[] =[];
  isEdited =false;
  message:string =null;

  constructor(private costsService:CostsService){}

  ngOnInit(): void {
    this.costsService.getCosts().subscribe(costs =>{
      this.loadedCosts = costs;
    },error =>{this.error =error.message});

  }

  onCreateCost(form:NgForm){
    console.log(form.value.cost)
    const costName:string = form.value.costName;
    const costValue:string = form.value.costValue;

    this.costsService.createCost(costName,costValue).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
    setTimeout(() =>this.ngOnInit(),500);
    
  }

}
