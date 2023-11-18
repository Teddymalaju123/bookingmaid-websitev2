import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResidentService } from '../../user-management/service/resident.service';
import { Maid } from '../interface/miad.interface';
import { MaidService } from '../service/maid.service';

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
  private service_maid = inject(MaidService);
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
        this.getMaid();
      }
    });
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      profile: new FormControl<string | null>(null),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      id_card: new FormControl<number | null>(null, Validators.required),
      birthday: new FormControl<Date | null>(null),
      address: new FormControl<string | null>(null),
    });
  }

  getMaid(): void {
    this.service_maid.getbyIdMaid(this.selectedUserid).subscribe({
      next: (response: any) => {
        const data: any = response;
        this.validateForm.patchValue(data[0]);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }

  editUser() { 
    const { id_user, username, password, profile, fname, lname, phone, id_card, birthday, address} = this.validateForm.value;
    const formData = {
      id_user: id_user,
      username: username,
      password: password,
      profile: profile,
      fname: fname,
      lname: lname,
      phone: phone,
      id_card: id_card,
      birthday: birthday,
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
    const deleteConfirmed = window.confirm('คุณต้องการลบแม่บ้านใช่หรือไม่?');

    if (deleteConfirmed) {
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

  handleUploadimg(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data : any = "";
      if (reader.result?.toString().startsWith('data:image/png;base64,')) {
        data = reader.result?.toString().replace('data:image/png;base64,', '');
      } else if (reader.result?.toString().startsWith('data:image/jpeg;base64,')) {
        data = reader.result?.toString().replace('data:image/jpeg;base64,', '');
      } else {
        data = reader.result?.toString();
      }
      console.log(reader.result);

      this.validateForm.get("profile")?.patchValue(data)
    };
  }
}