import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaidService } from '../service/maid.service';
import { Work } from '../interface/work.interface';
import { Maid } from '../interface/miad.interface';

@Component({
  selector: 'app-edit-maid',
  templateUrl: './edit-maid.component.html',
  styleUrls: ['./edit-maid.component.css']
})
export class EditMaidComponent implements OnInit{
  [x: string]: any;
  validateForm!: FormGroup;
  private router: Router = new Router;
  private service: MaidService = new MaidService;
  private fb: FormBuilder = new FormBuilder;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute, // เพิ่ม ActivatedRoute ใน constructor
    // ... อื่น ๆ
  ) {
    this.router = this.router;
    this.service = this.service;
  }

  data!: Maid;
  
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idWorktime = params['id_worktime'];
      if (idWorktime) {
        this.selectedWorkId = idWorktime;
        
      }
    });
    this.validateForm = this.fb.group({
      day: [null, Validators.required],
      id_timeworktype: [null], 
    });
  }


  selectedWorkId: number | null = null;
  editmaid(idWorktime: number) { // เพิ่มพารามิเตอร์ idWorktime ที่รับค่า id_worktime
    this.selectedWorkId = idWorktime;
    const { id_timeworktype, day } = this.validateForm.value;
    const id_worktime: number | null = this.selectedWorkId;
  
    if (id_worktime === null) {
      console.error('Please select a user.');
      return;
    }
  
    const formData = {
      id_timeworktype: id_timeworktype,
      day: day,
      
    };
  
    this.service.editMaidTime(id_worktime, formData).subscribe({
      next: (_response: any) => {
        this.router.navigate(['/maid/maid-detail']);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }
  

}

