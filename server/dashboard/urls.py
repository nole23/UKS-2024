from django.urls import path
from . import views

urlpatterns = [
    # Rute za modele u dashboard aplikaciji

    # Projekti
    path('projects/', views.create_project, name='project_list_create'),  # POST metod za kreiranje projekta
    path('projects/<int:pk>/', views.get_projects, name='project_detail'),  # GET metod za dobijanje detalja projekta

    # Repozitorijumi
    path('repositories/', views.create_repository, name='repository_list_create'),  # POST metod za kreiranje repozitorijuma
    path('repositories/<int:pk>/', views.get_repositories, name='repository_detail'),  # GET metod za dobijanje detalja repozitorijuma

    # Grane
    path('branches/', views.create_branch, name='branch_list_create'),  # POST metod za kreiranje grane
    path('branches/<int:pk>/', views.get_branches, name='branch_detail'),  # GET metod za dobijanje detalja grane

    # Fajlovi
    path('files/', views.create_file, name='file_list_create'),  # POST metod za kreiranje fajla
    path('files/<int:pk>/', views.get_files, name='file_detail'),  # GET metod za dobijanje detalja fajla

    # Pull Requestovi
    path('pullrequests/', views.create_pull_request, name='pullrequest_list_create'),  # POST metod za kreiranje pull requesta
    path('pullrequests/<int:pk>/', views.get_pull_requests, name='pullrequest_detail'),  # GET metod za dobijanje detalja pull requesta

    # Issues
    path('issues/', views.create_issue, name='issue_list_create'),  # POST metod za kreiranje issue-a
    path('issues/<int:pk>/', views.get_issues, name='issue_detail'),  # GET metod za dobijanje detalja issue-a

    # Commits
    path('commits/', views.create_commit, name='commit_list_create'),  # POST metod za kreiranje commit-a
    path('commits/<int:pk>/', views.get_commits, name='commit_detail'),  # GET metod za dobijanje detalja commit-a
]
