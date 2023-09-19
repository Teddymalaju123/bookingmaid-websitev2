import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Maid } from '../../maid/interface/miad.interface';
import { ResidentService } from '../service/resident.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit{
  validateForm!: FormGroup;
  private router = inject(Router);
  service: ResidentService = new ResidentService;
  changeDetectorRef: ChangeDetectorRef | undefined
  dataMaids: Maid[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      roomnumber: new FormControl<string | null>(null,Validators.required),
      roomsize: new FormControl<string | null>(null),
      maid_rating: new FormControl<number | null>(null),
      type_id: new FormControl<number | null>(null, Validators.required),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.service.createUser(this.validateForm.value, '/some-url').subscribe({
        next: (response: any) => {
          const data: any = response;
          this.dataMaids = data;
          this.changeDetectorRef?.detectChanges();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log("error", err);
        }
      });
      console.log('submit', this.validateForm.value);
    } else {
      console.log('error mai kao valid', this.validateForm.value);
    }
  }





}