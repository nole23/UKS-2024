from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_user, name='create_user'),
    path('all/', views.get_all_users, name='get_all_users'),
    path('login/', views.login_user, name='login_user'),
]
