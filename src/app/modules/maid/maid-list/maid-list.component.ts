import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Maid } from '../interface/miad.interface';
import { MaidService } from '../service/maid.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'; 
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzModalRef } from 'ng-zorro-antd/modal/public-api';


@Component({
  selector: 'app-maid-list',
  templateUrl: './maid-list.component.html',
  styleUrls: ['./maid-list.component.scss']
})

export class MaidListComponent implements OnInit {
  [x: string]: any;
  private router: Router;
  private service: MaidService;
  private modal: NzModalRef
  private _changeDetectorRef = inject(ChangeDetectorRef);
  validateForm!: FormGroup;
  isVisible = false;
  isOkLoading = false;
  dataMaids: Maid[] = [];
  date = null;


  constructor(
    private fb: FormBuilder, 
    router: Router,
    service: MaidService,
    _changeDetectorRef: ChangeDetectorRef,
     modal: NzModalRef
    
  ) {
    this.router = router;
    this.service = service;
    this.modal = modal;
  


    registerLocaleData(en, 'en');

  }

  selectedUserId: number | null = null;

  showModal(id_user: number): void {
    this.selectedUserId = id_user;
    this.isVisible = true;
  }

  handleOk(): void {
    this.saveTime();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modal.destroy(); // ปิด Modal อย่างถูกต้อง
  }

  saveTime(): void {
    const { id_timeworktype } = this.validateForm.value;
    const id_user: number | null = this.selectedUserId;

    if (id_user === null) {
      console.error('Please select a user.');
      return;
    }

    const formData = {
      id_user: id_user,
      id_timeworktype: id_timeworktype,
      date: this.date,
    };

    this.service.saveTime(formData).subscribe({
      next: (_response: any) => {
        this.isVisible = false;
        // ปิด Modal อย่างถูกต้อง (ถ้าคุณใช้ modal)
      },
      error: (err) => {
        console.error('Error', err);
        // จัดการข้อผิดพลาดเมื่อเกิดข้อผิดพลาดในการบันทึก
      },
    });
  }

  ngOnInit(): void {
    this.getMaid();
    this.validateForm = this.fb.group({
      id_timeworktype: [null], // กำหนดให้ใช้ id_timeworktype แทน roomsize
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getMaid(): void {
    this.service.getMaid().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataMaids = data;
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  add() {
    this.router.navigate(['/maid/maid-add']);
  }

  detail(id: any) {
    this.router.navigate(['/maid/maid-detail'], {
      queryParams: {
        id_user: id,
      },
    });
  }
}





