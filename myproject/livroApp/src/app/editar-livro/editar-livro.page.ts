import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.page.html',
  styleUrls: ['./editar-livro.page.scss'],
})
export class EditarLivroPage implements OnInit {
  livro = {
    titulo: '',
    descricao: '',
    foto: ''
  };
  livroId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit() {
    this.livroId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
    this.carregarLivro();
  }

  carregarLivro() {
    this.livroService.listarLivros().subscribe((livros: any[]) => {
      const livro = livros.find((livro) => livro.id === this.livroId);
      if (livro) {
        this.livro = livro;
      }
    });
  }

  // Função para lidar com o upload da imagem
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.livro.foto = reader.result as string; // Atualiza a imagem com o novo arquivo
      };
      reader.readAsDataURL(file);
    }
  }

  editarLivro() {
    this.livroService.editarLivro(this.livroId, this.livro).subscribe(
      (response) => {
        this.router.navigate(['/livros']);
      },
      (error) => {
        alert('Erro ao editar livro!');
      }
    );
  }
}
