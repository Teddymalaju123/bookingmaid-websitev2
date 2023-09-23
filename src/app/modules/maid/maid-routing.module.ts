import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaidListComponent } from './maid-list/maid-list.component';
import { MaidAddComponent } from './maid-add/maid-add.component';
import { MaidDetailComponent } from './maid-detail/maid-detail.component';
import { EditMaidComponent } from './edit-maid/edit-maid.component';


const routes: Routes = [
  { path: 'maid-list', component: MaidListComponent },
  { path: 'maid-add', component: MaidAddComponent },
  { path: 'maid-detail', component: MaidDetailComponent },
  { path: 'edit-maid', component: EditMaidComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaidRoutingModule { }
