from django.db import models

class Livro(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    foto = models.ImageField(upload_to='livros/', blank=True, null=True)
    
    def __str__(self):
        return self.titulo
    
    
