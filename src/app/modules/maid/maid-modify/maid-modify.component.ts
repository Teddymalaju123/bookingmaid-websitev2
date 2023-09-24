import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResidentService } from '../../user-management/service/resident.service';
import { Maid } from '../interface/miad.interface';

@Component({
  selector: 'app-maid-modify',
  templateUrl: './maid-modify.component.html',
  styleUrls: ['./maid-modify.component.css']
})
export class MaidModifyComponent implements OnInit{
  [x: string]: any;
  validateForm!: FormGroup;
  private router = inject(Router);
  private service = inject(ResidentService);
  private fb = inject(FormBuilder);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _activatedRoute = inject(ActivatedRoute);

  data!: Maid;
  selectedUserid: number | null = null;
  id_user: number | null = null;
  
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idUser = params['id_user'];
      if (idUser) {
        this.selectedUserid = idUser;
        console.log(this.selectedUserid);
      }
    });
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      age: new FormControl<number | null>(null),
      address: new FormControl<string | null>(null),
    });
  }

  editUser() { 
    const { id_user, username, password, fname, lname, phone, age, address} = this.validateForm.value;
    const formData = {
      id_user: id_user,
      username: username,
      password: password,
      fname: fname,
      lname: lname,
      phone: phone,
      age: age,
      address: address,
    };
    this.service.editUser(this.selectedUserid!, formData).subscribe({
      next: (_response: any) => {
        this._changeDetectorRef?.detectChanges();
        this.router.navigate(['/maid/maid-list']);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  deleteUser(): void {
    this.id_user = this.selectedUserid
    this.service.deleteUser(this.id_user!).subscribe(
      (response) => {
        this.router.navigate(['/maid/maid-list']);
        console.log('ลบข้อมูลสำเร็จ')
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบตารางการทำงานแม่บ้าน:', error);
      }
    );
  }
}