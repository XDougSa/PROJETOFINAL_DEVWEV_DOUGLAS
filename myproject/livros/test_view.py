# livros/test_views.py
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Livro

class LivroAPITest(TestCase):

    def setUp(self):
        #Cria um usuário para autenticação
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.client = APIClient()

        #Autentica usuário e pega o token
        response = self.client.post('/livros/api/token/', {'username': 'testuser', 'password': 'testpassword'})
        self.token = response.data['access']

        #Headers para requisições autenticadas
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        #Dados para criação de livro
        self.livro_data = {
            'titulo': 'teste',
            'descricao': 'teste',
            'foto': None  
        }

        #Cria um livro para ser usado nos testes
        self.livro = Livro.objects.create(**self.livro_data)

    def test_create_livro(self):
        #Testando a criação de um novo livro via API
        response = self.client.post('/livros/api/livros/', self.livro_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['titulo'], 'teste')
        self.assertEqual(response.data['descricao'], 'teste')

    def test_list_livros(self):
        #Testando a listagem de livros
        response = self.client.get('/livros/api/livros/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Deve retornar 1 livro criado

    def test_update_livro(self):
        #Testando a atualização de um livro
        update_data = {'titulo': 'teste Atualizada', 'descricao': 'teste atualizado'}
        response = self.client.put(f'/livros/api/livros/{self.livro.id}/', update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['titulo'], 'teste Atualizada')

    def test_delete_livro(self):
        #Testando a remoção de um livro
        response = self.client.delete(f'/livros/api/livros/{self.livro.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_unauthorized_access(self):
        #Testando acesso não autorizado sem token
        client_without_token = APIClient()
        response = client_without_token.get('/livros/api/livros/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_access_with_invalid_token(self):
        #Testando acesso com token inválido
        client_with_invalid_token = APIClient()
        invalid_token = "invalid_token"
        response = client_with_invalid_token.get('/livros/api/livros/', HTTP_AUTHORIZATION=f'Bearer {invalid_token}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_livro(self):
        #Testando a recuperação de um livro específico
        response = self.client.get(f'/livros/api/livros/{self.livro.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['titulo'], self.livro.titulo)

    def test_partial_update_livro(self):
        #Testando atualização parcial de um livro
        partial_update_data = {'titulo': 'titulo parcialmente atualizado'}
        response = self.client.patch(f'/livros/api/livros/{self.livro.id}/', partial_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['titulo'], 'titulo parcialmente atualizado')

    def test_invalid_livro_creation(self):
        #Testando criação de um livro com dados inválidos
        invalid_data = {'titulo': '', 'descricao': ''}
        response = self.client.post('/livros/api/livros/', invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('titulo', response.data)
        self.assertIn('descricao', response.data)

    def test_delete_nonexistent_livro(self):
        #Testando exclusão de um livro que não existe
        response = self.client.delete('/livros/api/livros/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_filter_livros_by_title(self):
        #Testando filtro de livros por título
        response = self.client.get('/livros/api/livros/?titulo=teste')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['titulo'], 'teste')

