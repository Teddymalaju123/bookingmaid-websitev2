import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AntDesignModule } from 'src/app/common/ant-design.module';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-add', component: UserAddComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    AntDesignModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule
  ],
  exports: [RouterModule],
})
export class UserManagementModule { }
