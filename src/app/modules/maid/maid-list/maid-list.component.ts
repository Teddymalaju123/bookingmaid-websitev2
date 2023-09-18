import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Maid } from '../interface/miad.interface';
import { MaidService } from '../service/maid.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Work } from '../interface/work.interface';

@Component({
  selector: 'app-maid-list',
  templateUrl: './maid-list.component.html',
  styleUrls: ['./maid-list.component.scss']
})

export class MaidListComponent implements OnInit {
  [x: string]: any;
  private router: Router;
  private service: MaidService;
  private changeDetectorRef?: ChangeDetectorRef;
  validateForm!: UntypedFormGroup;
  isVisible = false;
  isOkLoading = false;
  someDate: Date = new Date(); // Example date value
  someNumber: number = 12345; // Example number value
  dataMaids: Maid[] = [];
  rangePickerTime: Work[] = [];


  constructor(
    private fb: UntypedFormBuilder,
    router: Router,
    service: MaidService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.router = router;
    this.service = service;
    this.changeDetectorRef = changeDetectorRef;


    registerLocaleData(en, 'en');
  }


  selectedUserId: number | null = null;

showModal(id_user: number): void {
  this.selectedUserId = id_user;
  this.isVisible = true;
}

handleOk(): void {
  if (this.validateForm.valid && this.selectedUserId !== null) {
    const { rangePickerTime } = this.validateForm.value;

    const startTime: Date = rangePickerTime[0];
    const endTime: Date = rangePickerTime[1];

    const id_user: number = this.selectedUserId;

    const timeData: Work = {
      id_worktime: 0, 
      status: 'เริ่มงาน', 
      workingtime: startTime,
      endworking: endTime,
      id_user: id_user
    };

    this.service.saveTime(timeData).subscribe({
      next: (response: any) => {
        this.isVisible = false;
      },
      error: (err) => {
        console.log("error", err);
      }
    });
  } else {
    console.error('Form is not valid or no user selected.');
  }
}

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.getMaid();
    this.validateForm = this.fb.group({
      rangePickerTime: [[]]
    });
  }

  getMaid(): void {
    this.service.getMaid().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataMaids = data;
        this.changeDetectorRef?.detectChanges();
      },
      error: (err) => {
        // Handle error
      }
    });
  }

  add() {
    this.router.navigate(['/maid/maid-add']);
  }
}
