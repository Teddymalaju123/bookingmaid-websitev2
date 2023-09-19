import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Maid } from '../interface/miad.interface';
import { MaidService } from '../service/maid.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Use FormBuilder from '@angular/forms'
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Work } from '../interface/work.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-maid-list',
  templateUrl: './maid-list.component.html',
  styleUrls: ['./maid-list.component.scss']
})

export class MaidListComponent implements OnInit {
  [x: string]: any;
  private router: Router;
  private service: MaidService;
  private _changeDetectorRef = inject(ChangeDetectorRef);
  validateForm!: FormGroup;
  editForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  dataMaids: Maid[] = [];
  rangePickerTime: Work[] = [];


  constructor(
    private fb: FormBuilder, // Use FormBuilder instead of UntypedFormBuilder
    router: Router,
    service: MaidService,
    _changeDetectorRef: ChangeDetectorRef
  ) {
    this.router = router;
    this.service = service;
    this.editForm = this.fb.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    });

    registerLocaleData(en, 'en');

  }

  selectedUserId: number | null = null;

  showModal(id_user: number): void {
    this.selectedUserId = id_user;
    this.isVisible = true;
  }

  selectedWorkId: number | null = null;


  handleOk(): void {
    const { rangePickerTime } = this.validateForm.value;

    if (!Array.isArray(rangePickerTime) || rangePickerTime.length !== 2) {
      console.error('Please select a valid time range.');
      return;
    }

    if (this.selectedUserId === null) {
      console.error('Please select a user.');
      return;
    }

    const startTime: Date = rangePickerTime[0];
    const endTime: Date = rangePickerTime[1];
    const id_user: number = this.selectedUserId;

    const timeData: Work = {
      id_worktime: 0,
      status: 'เริ่มงาน',
      workingtime: startTime,
      endworking: endTime,
      id_user: id_user,
    };

    this.service.saveTime(timeData).subscribe({
      next: (_response: any) => {
        this.isVisible = false;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.getMaid();
    this.validateForm = this.fb.group({
      rangePickerTime: [[]],
    });
  }

  getMaid(): void {
    this.service.getMaid().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataMaids = data
        this._changeDetectorRef.detectChanges()
      },
      error: (err) => {
      }
    });
  }
  add() {
    this.router.navigate(['/user/user-add']);
  }

  isTimeModalVisible = false;
  isTimeOkLoading = false;

  showTimeModal(id_user: number): void {
    this.selectedUserId = id_user;
    this.isTimeModalVisible = true;
  }

  handleTimeCancel(): void {
    this.isTimeModalVisible = false;
  }

  handleTimeOk(): void {
    const { startTime, endTime } = this.editForm.value;
  
    if (!startTime || !endTime) {
      console.error('Please select valid start and end times.');
      return;
    }
  
    if (this.selectedUserId === null) {
      console.error('Please select a user.');
      return;
    }
  
    const id_user: number = this.selectedUserId;
  
    const timeData: Work = {
      id_worktime: 0,
      status: 'เริ่มงาน',
      workingtime: startTime,
      endworking: endTime,
      id_user: id_user,
    };
  
    this.service.saveTime(timeData).subscribe({
      next: (_response: any) => {
        this.isTimeModalVisible = false;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  deleteMaidTime(id_worktime: number): void {
    this.service.deleteMaidTime(id_worktime).subscribe(
      () => {
        console.log(`ลบตารางงานแม่บ้าน ID: ${id_worktime} สำเร็จ`);
      },
      (error) => {
        console.log(`ID: ${id_worktime} `);
        console.error(`เกิดข้อผิดพลาดในการลบตารางงานแม่บ้าน: ${error}`);
      }
    );
  }
}



  
  

