import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  private router = inject(Router);
  private notification = inject(NzNotificationService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.fb.group({
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      type_name: new FormControl<string | null>("nitilegal", Validators.required),
    });
  }

  login(): void {
    this.authService.login(this.formGroup.value).subscribe({
      next: (response: any) => {
        const data: any = response;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.createNotification();
      }
    });
  }

  createNotification(): void {
    this.notification.create(
      'error',
      'การเข้าสู่ระบบ',
      'ผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'
    );
  }
}
