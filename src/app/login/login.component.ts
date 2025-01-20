import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule], // הוספת ReactiveFormsModule
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const user: Login = this.loginForm.value;

    this.loginService.login(user).subscribe({
      next: (response) => {
        sessionStorage.setItem('jwt', response); // שמירת ה-JWT ב-localStorage
        this.router.navigate(['/gift-manage']); // ניתוב לדף הבא
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
