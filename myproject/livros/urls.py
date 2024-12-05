from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LivroViewSet, CustomTokenObtainPairView, CustomTokenRefreshView
from .views import RegisterView

# Configuração do roteador para o LivroViewSet
router = DefaultRouter()
router.register(r'livros', LivroViewSet)

urlpatterns = [
    # Rota para autenticação
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),  
    
    # API de livros
    path('api/', include(router.urls)),  # Rota para a API de livros
    
    # Rota para cadastro de novo usuário
    path('register/', RegisterView.as_view(), name='register'),  # Adicionando a URL para cadastro de usuário
]
