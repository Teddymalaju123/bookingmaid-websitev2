import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaidService } from '../service/maid.service';
import { Maid } from '../interface/miad.interface';

@Component({
  selector: 'app-edit-maid',
  templateUrl: './edit-maid.component.html',
  styleUrls: ['./edit-maid.component.css']
})
export class EditMaidComponent implements OnInit{
  [x: string]: any;
  validateForm!: FormGroup;
  private router = inject(Router);
  private service = inject(MaidService);
  private fb = inject(FormBuilder);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _activatedRoute = inject(ActivatedRoute);

  data!: Maid;
  
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idWorktime = params['id_worktime'];
      if (idWorktime) {
        this.selectedWorkId = idWorktime;
        console.log(this.selectedWorkId);
        this.getWork()
      }
    });
    this.validateForm = this.fb.group({
      day: [null, Validators.required],
      id_timeworktype: [null, Validators.required], 
    });
  }

  getWork() {
    this.service.getMaidWorkByIdWork(this.selectedWorkId!).subscribe({
      next: (_response: any) => {
        console.log(_response);
        const data: any = _response;
        this._changeDetectorRef.detectChanges()
        this.validateForm.patchValue(data[0]);
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }


  selectedWorkId: number | null = null;
  editmaid() { 
    const { id_timeworktype, day } = this.validateForm.value;
    const formData = {
      id_timeworktype: id_timeworktype,
      day: day,
    };
    this.service.editMaidTime(this.selectedWorkId!, formData).subscribe({
      next: (_response: any) => {
        this._changeDetectorRef?.detectChanges();
        this.router.navigate(['/maid/maid-detail']);
        alert("แก้ไขเสร็จสิ้น");
      },
      error: (err) => {
        console.error('Error', err);
        alert("กรุณากรอกข้อมูลให้ครบ");
      },
    });
  }
}

