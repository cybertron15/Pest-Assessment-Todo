from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, TaskSerializers, SimpleUserSerializer
from.models import Tasks

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import PasswordVerificationSerializer

# getting custom user model
User = get_user_model()

# Create your views here.
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = SimpleUserSerializer(user)
        return Response(serializer.data)
    
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
    
class TaskRetriveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication,SessionAuthentication]
    queryset = Tasks.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user)

class VerifyPasswordAndUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordVerificationSerializer

    def get_object(self):
        return self.request.user