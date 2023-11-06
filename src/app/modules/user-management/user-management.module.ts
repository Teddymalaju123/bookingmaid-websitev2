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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { UserBookingComponent } from './user-booking/user-booking.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'user-booking', component: UserBookingComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserBookingComponent
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
    NzCardModule,
    NzModalModule,
    NzButtonModule,
    NzTreeSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    
  ],
  exports: [RouterModule],
})
export class UserManagementModule { }
