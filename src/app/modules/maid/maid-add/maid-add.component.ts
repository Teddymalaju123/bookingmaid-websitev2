import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MaidService } from '../service/maid.service';
import { Maid } from '../interface/miad.interface';

@Component({
  selector: 'app-maid-add',
  templateUrl: './maid-add.component.html',
  styleUrls: ['./maid-add.component.css']
})
export class MaidAddComponent {
  validateForm!: FormGroup;
  private router = inject(Router);
  service: MaidService = new MaidService;
  changeDetectorRef: ChangeDetectorRef | undefined
  dataMaids: Maid[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      profile: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null, Validators.required),
      lname: new FormControl<string | null>(null, Validators.required),
      nickname: new FormControl<string | null>(null, Validators.required),
      phone: new FormControl<string | null>(null, Validators.required),
      roomnumber: new FormControl<string | null>(null, Validators.required),
      roomsize: new FormControl<string | null>(null, Validators.required),
      maid_rating: new FormControl<number | null>(null, Validators.required),
      id_card: new FormControl<number | null>(null, Validators.required),
      birthday: new FormControl<Date | null>(null, Validators.required),
      address: new FormControl<string | null>(null, Validators.required),
      type_id: new FormControl<number | null>(3),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.service.createMaid(this.validateForm.value, '/some-url').subscribe({
        next: (response: any) => {
          const data: any = response;
          this.dataMaids = data;
          this.changeDetectorRef?.detectChanges();
          this.router.navigate(['/maid/maid-list']);
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