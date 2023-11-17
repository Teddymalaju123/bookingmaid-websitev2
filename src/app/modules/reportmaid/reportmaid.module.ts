import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReportproblemComponent } from './reportproblem/reportproblem.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReportBookingComponent } from './report-booking/report-booking.component';

const routes: Routes = [
  { path: 'reportproblem', component: ReportproblemComponent },
  { path: 'report-booking', component: ReportBookingComponent },
];

@NgModule({
  declarations: [
    ReportproblemComponent,
    ReportBookingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule
  ],
  exports: [RouterModule],
})
export class ReportmaidModule { }
