import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; 

interface Livro {
  id: number;
  titulo: string;
  descricao: string;
  foto: string;
}

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage implements OnInit {
  livros: Livro[] = [];
  isModalOpen: boolean = false;  // Controle de abertura do modal
  selectedImage: string = '';  // Armazena o caminho da imagem selecionada
  selectedTitle: string = '';  // Armazena o título do livro selecionado
  selectedDescription: string = '';  // Armazena a descrição do livro selecionado

  constructor(
    private livroService: LivroService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.livroService.listarLivros().subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar livros', error);
      }
    );
  }

  removerLivro(id: number) {
    this.livroService.removerLivro(id).subscribe(
      () => {
        this.livros = this.livros.filter(livro => livro.id !== id);
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao remover livro', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
