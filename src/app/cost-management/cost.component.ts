import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { CostManagementComponent } from "./cost-management.component";
import { CostsService } from "./costs.service";

@Component({
    selector: 'app-cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss']
  })
export class CostComponent{
    @Input()targetCost;
    isEdited =false;
    error:string =null;
    @ViewChild('newCostName',{static:false}) newCostName:ElementRef;
    @ViewChild('newCostValue',{static:false}) newCostValue:ElementRef;

    constructor(private costsService:CostsService, private costComponent :CostManagementComponent){}

    allowEdit(){
      this.isEdited =!this.isEdited;
    }

    onDeleteCost(id:string){
      this.costsService.deleteCost(id).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message});
      setTimeout(() =>this.costComponent.ngOnInit(),500);
    }

    onCancel(){
      this.isEdited=!this.isEdited;
    }

    onEditCost(){
      const editName = this.newCostName.nativeElement.value;
      const editValue =this.newCostValue.nativeElement.value;
      this.costsService.updateCost(this.targetCost.id,editName,editValue).subscribe(responseData =>{console.log(responseData)},error =>{this.error =error.message})
      this.isEdited = !this.isEdited;
      setTimeout(() =>this.costComponent.ngOnInit(),500);
    }

}