import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importe o serviço de autenticação
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.passwordConfirm) {
      alert('As senhas não coincidem!');
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.router.navigate(['/login']);  // Redireciona para a tela de login após o registro
      },
      (error) => {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário');
      }
    );
  }
}
