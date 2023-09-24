import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Maid } from '../interface/miad.interface';
import { MaidService } from '../service/maid.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzModalService } from 'ng-zorro-antd/modal'; // ใช้ NzModalService แทน NzModalRef

@Component({
  selector: 'app-maid-list',
  templateUrl: './maid-list.component.html',
  styleUrls: ['./maid-list.component.scss']
})
export class MaidListComponent implements OnInit {
  // ไม่ต้องระบุ [x: string]: any; ใน class นี้

  private router: Router;
  private service: MaidService;
  private _changeDetectorRef: ChangeDetectorRef;

  validateForm!: FormGroup;
  isVisible = false;
  isOkLoading = false;
  dataMaids: Maid[] = [];


  constructor(
    private fb: FormBuilder,
    router: Router,
    service: MaidService,
    _changeDetectorRef: ChangeDetectorRef,
    private modalService: NzModalService 
  ) {
    this.router = router;
    this.service = service;
    this._changeDetectorRef = _changeDetectorRef;

    registerLocaleData(en, 'en');
  }

  selectedUserId: number | null = null;

  showModal(id_user: number): void {
    this.selectedUserId = id_user;
    this.isVisible = true;
  }

  handleOk(): void {
    const { id_timeworktype, day } = this.validateForm.value;
    const id_user: number | null = this.selectedUserId;

    if (id_user === null) {
      console.error('Please select a user.');
      return;
    }

    const formData = {
      id_user: id_user,
      id_timeworktype: id_timeworktype,
      day: day,
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

  handleCancel(): void {
    this.isVisible = false;
    // this.modalRef.destroy(); ไม่ต้องเรียก destroy() ในกรณีใช้ NzModalService
  }

  ngOnInit(): void {
    this.getMaid();
    this.validateForm = this.fb.group({
      day: [null, Validators.required],
      id_timeworktype: [null], // กำหนดให้ใช้ id_timeworktype แทน roomsize
    });
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

  detail() {
    this.router.navigate(['/maid/maid-detail']);
  }

  goedit(id: any){
    this.router.navigate(['/maid/maid-modify'], {
      queryParams: {
        id_user : id
      }
    });
  }

}
