import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaidListComponent } from './maid-list/maid-list.component';
import { MaidRoutingModule } from './maid-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MaidAddComponent } from './maid-add/maid-add.component';
import { AntDesignModule } from 'src/app/common/ant-design.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [
    MaidListComponent,
    MaidAddComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzTableModule,
    MaidRoutingModule,
    AntDesignModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule

  ]
})
export class MaidModule { }
