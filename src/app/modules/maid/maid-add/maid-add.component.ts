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
      profile: new FormControl<string | null>(null),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      nickname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      roomnumber: new FormControl<string | null>(null),
      roomsize: new FormControl<string | null>(null),
      maid_rating: new FormControl<number | null>(null),
      id_card: new FormControl<number | null>(null, Validators.required),
      birthday: new FormControl<number | null>(null),
      address: new FormControl<string | null>(null),
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

  handleUploadimg(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.validateForm.get("profile")?.patchValue(reader.result)
    };
}
}