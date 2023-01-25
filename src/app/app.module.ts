import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TableManagementComponent } from './table-management/table-management.component';
import { CostManagementComponent } from './cost-management/cost-management.component';
import { NotesComponent } from './notes/notes.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



const appRoutes: Routes =[
 {path:'', component: ScheduleComponent},
 {path:'table-management', component: TableManagementComponent},
 {path:'cost-management', component: CostManagementComponent},
 {path:'notes', component: NotesComponent},
 {path:'statistics', component: StatisticsComponent},
 {path:'auth', component: AuthComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
    TableManagementComponent,
    CostManagementComponent,
    NotesComponent,
    StatisticsComponent,
    AuthComponent,

  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
