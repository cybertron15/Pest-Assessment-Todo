from django.urls import path, include
from . import views  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', include('rest_framework.urls')), # enables sessions auth for browsable API
    path("signup/",views.UserCreate.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("tasks/",views.TaskListCreate.as_view(), name='task_create_list'),
    path("tasks/<str:pk>",views.TaskRetriveUpdateDelete.as_view(), name='task_retrive_update_delete_list'),
    path("taskstatus/<str:pk>",views.TaskStatusUpdate.as_view(), name='task_update_status'),
    path('update-sensitive/', views.VerifyPasswordAndUpdateView.as_view(), name='update-sensitive'),
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
]

