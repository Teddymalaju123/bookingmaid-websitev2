import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzAutocompleteModule
    
  ]
})
export class LayoutModule { }
