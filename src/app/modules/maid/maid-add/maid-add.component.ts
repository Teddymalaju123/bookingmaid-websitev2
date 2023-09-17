import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-maid-add',
  templateUrl: './maid-add.component.html',
  styleUrls: ['./maid-add.component.css']
})
export class MaidAddComponent {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id_user: new FormControl<number | null>(null),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
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
      console.log('submit', this.validateForm.value);
    }
  }
}