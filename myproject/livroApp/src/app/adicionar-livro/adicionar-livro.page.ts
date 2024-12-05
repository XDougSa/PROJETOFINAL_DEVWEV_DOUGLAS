import { Component } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-livro',
  templateUrl: './adicionar-livro.page.html',
  styleUrls: ['./adicionar-livro.page.scss'],
})
export class AdicionarLivroPage {
  livro = {
    titulo: '',
    descricao: '',
    foto: null  // A foto será atribuída aqui
  };

  constructor(private livroService: LivroService, private router: Router) {}

  // Método para capturar o arquivo de imagem
  onFileSelected(event: any) {
    const file = event.target.files[0];  // Obtém o primeiro arquivo selecionado
    this.livro.foto = file;  // Atribui o arquivo à propriedade 'foto' do livro
  }

  // Método para adicionar livro usando FormData
  adicionarLivro() {
    if (this.livro.titulo && this.livro.descricao && this.livro.foto) {
      const formData = new FormData();
      formData.append('titulo', this.livro.titulo);
      formData.append('descricao', this.livro.descricao);
      formData.append('foto', this.livro.foto);  // Aqui estamos enviando a foto

      // Envia a requisição para o serviço
      this.livroService.adicionarLivro(formData).subscribe(
        (response) => {
          console.log('Livro adicionado com sucesso!', response);
          this.router.navigate(['/livros']);  // Redireciona para a página de lista de livros após sucesso
        },
        (error) => {
          console.error('Erro ao adicionar livro', error);
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos!');
    }
  }
}
