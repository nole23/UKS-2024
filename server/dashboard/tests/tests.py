# tests.py

from rest_framework import status
from rest_framework.test import APITestCase
from dashboard.models import Project, Repository, Branch, File, PullRequest, Issue, Commit
from django.urls import reverse

from users.models import CustomUser


class APIIntegrationTests(APITestCase):

    def setUp(self):
        # Setovanje podataka za testove
        self.project_data = {'name': 'Test Project'}
        self.repository_data = {'name': 'Test Repository', 'project': 1}
        self.branch_data = {'name': 'Test Branch', 'repository': 1}
        self.file_data = {'name': 'test_file.py', 'branch': 1}
        self.issue_data = {'title': 'Test Issue', 'description': 'Test Description'}
        self.commit_data = {'commit_hash': 'abc123', 'file': 1, 'author': 1}
        self.pull_request_data = {'title': 'Test Pull Request', 'description': 'Test Pull Request Description'}
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpassword123'
        }
        # Kreiranje osnovnih objekata (korisnik, projekat, itd.) potrebnih za testove
        self.user = CustomUser.objects.create_user(**self.user_data)
        self.project = Project.objects.create(name="Test Project")
        self.repository = Repository.objects.create(name="Test Repository", project=self.project)
        self.branch = Branch.objects.create(name="Test Branch", repository=self.repository)
        self.file = File.objects.create(name="test_file.py", branch=self.branch)
        self.issue = Issue.objects.create(title="Test Issue", description="Test Description", created_by=self.user, repository=self.repository)

        # Kreiranje Commit objekta
        self.commit = Commit.objects.create(commit_hash="abc123", file=self.file, author=self.user)

    # =============================== Project ===============================

    # def test_create_project(self):
    #     url = reverse('project_list_create')  # URL za kreiranje projekta
    #     response = self.client.post(url, self.project_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_project(self):
        url = reverse('project_detail', args=[self.project.id])  # URL za GET projekat sa ID-om
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.project.name)

    # =============================== Repository ===============================

    # def test_create_repository(self):
    #     url = reverse('repository_list_create')  # URL za kreiranje repozitorijuma
    #     response = self.client.post(url, self.repository_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_repository(self):
        url = reverse('repository_detail', args=[self.repository.id])  # URL za GET repozitorijum sa ID-om
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.repository.name)

    # =============================== Branch ===============================

    # def test_create_branch(self):
    #     url = reverse('branch_list_create')  # URL za kreiranje grane
    #     response = self.client.post(url, self.branch_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_branch(self):
        url = reverse('branch_detail', args=[self.branch.id])  # URL za GET granu sa ID-om
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.branch.name)

    # =============================== File ===============================

    # def test_create_file(self):
    #     url = reverse('file_list_create')  # URL za kreiranje fajla
    #     response = self.client.post(url, self.file_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # =============================== Issue ===============================

    # def test_create_issue(self):
    #     url = reverse('issue_list_create')  # URL za kreiranje issue-a
    #     response = self.client.post(url, self.issue_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_issue(self):
        url = reverse('issue_detail', args=[self.issue.id])  # URL za GET issue sa ID-om
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.issue.title)

    # =============================== PullRequest ===============================

    # def test_create_pull_request(self):
    #     url = reverse('pullrequest_list_create')  # URL za kreiranje pull request-a
    #     response = self.client.post(url, self.pull_request_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # =============================== Commit ===============================

    def test_get_commit(self):
        url = reverse('commit_detail', args=[self.commit.id])  # URL za GET commit sa ID-om
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['commit_hash'], self.commit.commit_hash)
