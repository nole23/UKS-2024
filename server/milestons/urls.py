from django.urls import path
from . import views

urlpatterns = [
    # Rute za Milestone modele
    path('milestones/', views.create_milestone, name='create_milestone'),  # POST metod za kreiranje Milestone-a
    path('milestones/<int:pk>/', views.get_milestone, name='milestone_detail'),  # GET metod za dobijanje Milestone-a sa ID-jem
    path('projects/<int:project_id>/milestones/', views.get_milestones, name='project_milestones'),  # GET metod za dobijanje svih Milestone-ova za projekat
]
