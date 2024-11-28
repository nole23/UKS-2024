from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Kreiranje novog korisnika
@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Dohvat svih korisnika
@api_view(['GET'])
def get_all_users(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

# Login korisnika (koristi email i lozinku)
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"message": "User logged in successfully"}, status=200)
    else:
        return JsonResponse({"message": "Invalid credentials"}, status=400)
