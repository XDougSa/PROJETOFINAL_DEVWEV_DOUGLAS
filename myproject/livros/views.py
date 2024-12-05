from rest_framework import viewsets, status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Livro
from .serializers import LivroSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# ViewSet para o modelo Livro
class LivroViewSet(viewsets.ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    permission_classes = [IsAuthenticated]

class RegisterView(APIView): 
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            # Gera o token JWT para o novo usuário 
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# View para obter o token JWT
class CustomTokenObtainPairView(TokenObtainPairView):
    pass

# View para renovar o token JWT
class CustomTokenRefreshView(TokenRefreshView):
    pass