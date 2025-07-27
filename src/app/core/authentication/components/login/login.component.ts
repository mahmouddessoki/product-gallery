import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../interfaces/iuser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService)



  ngOnInit(){
    this.loginUser()
  }
  loginUser() {
    const credentials: LoginRequest = {
      username: 'mor_2314',
      password: '83r5^_'
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Logged in! Token:', res.token);
        // Navigate to dashboard or show success message
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }



}
