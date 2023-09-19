import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'maid',
        loadChildren: () =>
          import('src/app/modules/maid/maid.module').then(
            (m) => m.MaidModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('src/app/modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('src/app/modules/reportmaid/reportmaid.module').then(
            (m) => m.ReportmaidModule
          ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
