from django.urls import path, include
from . import views  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/",views.UserCreate.as_view()),
    path('', include('rest_framework.urls')), # enables sessions auth for browsable API
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("tasks/",views.TaskListCreate.as_view())
]

