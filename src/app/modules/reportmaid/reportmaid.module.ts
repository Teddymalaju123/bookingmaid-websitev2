import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReportproblemComponent } from './reportproblem/reportproblem.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  { path: 'reportproblem', component: ReportproblemComponent },
];

@NgModule({
  declarations: [
    ReportproblemComponent
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
