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
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.getMaid();
    this.validateForm = this.fb.group({
      day: [null, Validators.required],
      id_timeworktype: [null], 
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

  convertToThaiDate(inputDate: Date): string {
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    const date = new Date(inputDate);
    const thaiMonth = monthsInThai[date.getMonth()];
    const thaiYear = date.getFullYear() + 543;
  
    return ` ${date.getDate()} ${thaiMonth} ${thaiYear}`;
  }

  convertImage(image:string) {
    return "data:image/jpeg;base64," + image
  }

}
