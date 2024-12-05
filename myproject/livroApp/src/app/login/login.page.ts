import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; // Inicialize com string vazia
  password: string = ''; // Inicialize com string vazia

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const token = response.access;
        this.authService.storeToken(token);
        this.router.navigate(['/livros']);
      },
      (error) => {
        alert('Login falhou!');
      }
    );
  }
}
