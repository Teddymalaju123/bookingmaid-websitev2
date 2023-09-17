import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit{
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      checkPassword: new FormControl<string | null>(null, Validators.required),
      fname: new FormControl<string | null>(null),
      lname: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
      roomnumber: new FormControl<string | null>(null, Validators.required),
      roomsize: new FormControl<string | null>(null, Validators.required),
      maid_rating: new FormControl<number | null>(null),
      id_type: new FormControl<string | null>(null, Validators.required),
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      this.markAsDirtyAndValidate(this.validateForm);
    }
  }

  updateConfirmValidator(): void {
    setTimeout(() => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value || control.value !== control.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  markAsDirtyAndValidate(group: FormGroup): void {
    Object.values(group.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control instanceof FormGroup) {
        this.markAsDirtyAndValidate(control);
      }
    });
  }

}