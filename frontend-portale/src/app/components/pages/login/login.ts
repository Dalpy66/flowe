import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../service/auth';
import { CommonComponents } from '../../share/commonComponents';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login extends CommonComponents{
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    super();
  }
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
 
  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }
 
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
 
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
 
    this.isLoading = true;
    this.errorMessage = '';
 
    const { email, password, rememberMe } = this.loginForm.value;
 
    /*this.authService.login(email, password, rememberMe).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Credenziali non valide. Riprova.';
      }
    });*/

    // TODO mock
    this.isLoading = false;
    this.isLoading = false;
    this.router.navigate(['/home']);
  }
 
  loginWithGoogle(): void {
    //this.authService.loginWithGoogle();

    // TODO mock
    this.isLoading = false;
    this.isLoading = false;
    this.router.navigate(['/home']);
  }

}
