# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Livro

# Serializer para o modelo Livro
class LivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = ['id', 'titulo', 'descricao', 'foto']

# Serializer para o modelo User (Cadastro de Usuário)
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # A senha será enviada, mas não será lida na resposta

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Criar um novo usuário com a senha de forma segura (hashing da senha)
        user = User.objects.create_user(**validated_data)
        return user
