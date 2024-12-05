import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/livros/api/token/'; // URL da API para login
  private registerUrl = 'http://localhost:8000/livros/register/';  // URL da API para registro
  private storage: Storage;

  constructor(private http: HttpClient, private storageService: Storage) {
    this.storage = storageService;
    this.initStorage();
  }

  // Inicialização do Storage do Ionic
  private async initStorage() {
    await this.storage.create();
  }

  // Função de login, que faz uma requisição POST para o backend
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  // Função para registrar um novo usuário
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.registerUrl, { username, email, password });
  }

  // Função para armazenar o token JWT no storage
  storeToken(token: string): void {
    this.storage.set('token', token);
  }

  // Função para obter o token do storage
  getToken(): Promise<any> {
    return this.storage.get('token');
  }

  // Função para decodificar o token JWT
  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  }

  // Função de logout, removendo o token do storage
  logout(): void {
    this.storage.remove('token');
  }

  // Verifica se o usuário está autenticado (se o token existe e é válido)
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
        if (decodedToken.exp > currentTime) {
          return true; // Token válido
        } else {
          this.logout(); // Token expirado, logout
        }
      }
    }
    return false; // Sem token ou token inválido
  }
}
