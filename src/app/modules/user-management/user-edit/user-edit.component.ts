import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Maid } from '../../maid/interface/miad.interface';
import { ResidentService } from '../service/resident.service';
import { MaidService } from '../../maid/service/maid.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
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
  
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const idUser = params['id_user'];
      if (idUser) {
        this.selectedUserid = idUser;
        console.log(this.selectedUserid);
        this.getResident();
      }
    });
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      id_card: new FormControl<number | null>(null),
      age: new FormControl<number | null>(null),
      address: new FormControl<string | null>(null),
    });
  }

  getResident(): void {
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
        this.router.navigate(['/user/user-list']);
      },
      error: (err) => {
        console.error('Error', err);
      },
    });
  }
}
