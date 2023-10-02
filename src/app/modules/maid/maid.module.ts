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
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { MaidDetailComponent } from './maid-detail/maid-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMaidComponent } from './edit-maid/edit-maid.component';
import { MaidModifyComponent } from './maid-modify/maid-modify.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    MaidListComponent,
    MaidAddComponent,
    MaidDetailComponent,
    EditMaidComponent,
    MaidModifyComponent,
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
    NzCardModule,
    NzModalModule,
    NzButtonModule,
    NzTimePickerModule,
    NzTimelineModule,
    NzDatePickerModule,
    NzCalendarModule,
    NzSpaceModule,
    NzDropDownModule


  ]
})
export class MaidModule { }
