import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';  
import { switchMap } from 'rxjs/operators'; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = 'http://localhost:8000/livros/api/livros/'; // URL da API de livros

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Função que converte a Promise em Observable e retorna o cabeçalho de autenticação
  private getAuthHeader(): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const authHeader = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`  // Adiciona o token de autenticação
          })
        };
        return this.http.get(this.apiUrl, authHeader);  // Retorna a requisição HTTP com o cabeçalho
      })
    );
  }

  // Listar livros
  listarLivros(): Observable<any> {
    return this.getAuthHeader(); // Agora retorna um Observable diretamente
  }

  // Adicionar livro
  adicionarLivro(formData: FormData): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const authHeader = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`  // Adiciona o token de autenticação
          })
        };
        return this.http.post(this.apiUrl, formData, authHeader);  // Realiza a requisição POST com o cabeçalho
      })
    );
  }

  // Editar livro
  editarLivro(id: number, livro: any): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const authHeader = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        };
        return this.http.put(`${this.apiUrl}${id}/`, livro, authHeader);  // Realiza a requisição PUT
      })
    );
  }

  // Remover livro
  removerLivro(id: number): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const authHeader = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        };
        return this.http.delete(`${this.apiUrl}${id}/`, authHeader);  // Realiza a requisição DELETE
      })
    );
  }
}
