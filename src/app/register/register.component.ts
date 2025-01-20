import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Register } from '../models/register.model';
import { LoginService } from '../Service/login.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent {
  lowercase: boolean = false;
  uppercase: boolean = false;
  digits: boolean = false;
  specialCharacters: boolean = false;
  minimumLength: boolean = false;

  frmUserRegister: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),  // שונה ל'name'
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  checkPasswordConditions(password: string) {
    this.lowercase = /[a-z]/.test(password);
    this.uppercase = /[A-Z]/.test(password);
    this.digits = /\d/.test(password);
    this.specialCharacters = /[!@#$%^&*]/.test(password);
    this.minimumLength = password.length >= 6;
  }

  register() {
    if (this.frmUserRegister.valid) {
      const user: Register = this.frmUserRegister.value;
      this.loginService.register(user).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'משתמש נוצר בהצלחה',
            life: 3000,
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          const errorMessage = error?.error?.message || 'שגיאה לא צפויה.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error Occurred',
            detail: errorMessage,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'נא למלא את כל השדות בצורה תקינה.',
      });
    }
  }
}
