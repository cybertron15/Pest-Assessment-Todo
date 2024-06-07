from django.urls import path, include
from . import views  
urlpatterns = [
    path("signup/",views.UserCreate.as_view()),
]
