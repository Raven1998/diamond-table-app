import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TableManagementComponent } from './table-management/table-management.component';
import { CostManagementComponent } from './cost-management/cost-management.component';
import { CostComponent } from './cost-management/cost.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { TableComponent } from './table-management/table.component';



const appRoutes: Routes =[
 {path:'', component: ScheduleComponent, canActivate: [AuthGuard]},
 {path:'table-management', component: TableManagementComponent, canActivate: [AuthGuard]},
 {path:'cost-management', component: CostManagementComponent, canActivate: [AuthGuard]},
 {path:'notes', component: NotesComponent, canActivate: [AuthGuard]},
 {path:'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
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
    NoteComponent,
    CostComponent,
    TableComponent

  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
