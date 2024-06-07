from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics

from .serializers import UserSerializer, TaskSerializers
from.models import Tasks

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

# getting custom user model
User = get_user_model()

# Create your views here.
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication,SessionAuthentication]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user)
    
    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(owner=user)