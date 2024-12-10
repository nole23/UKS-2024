from rest_framework import status
from rest_framework.test import APITestCase
from dashboard.models import Project
from milestons.models import Milestone
from django.urls import reverse

class MilestoneTests(APITestCase):

    def setUp(self):
        # Kreiramo projekat za vezivanje Milestone-a
        self.project = Project.objects.create(name="Test Project")
        self.milestone_data = {
            'title': 'Test Milestone',
            'description': 'This is a test milestone.',
            'due_date': '2024-12-31T23:59:59Z',
            'project': self.project.id
        }

    def test_create_milestone(self):
        url = reverse('create_milestone')
        response = self.client.post(url, self.milestone_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Test Milestone')

    def test_get_milestone(self):
        milestone = Milestone.objects.create(
            title="Test Milestone",
            description="Test Description",
            due_date="2024-12-31T23:59:59Z",
            project=self.project
        )
        url = reverse('milestone_detail', args=[milestone.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Test Milestone")

    def test_get_milestones_for_project(self):
        Milestone.objects.create(
            title="Test Milestone 1",
            description="Description 1",
            due_date="2024-12-31T23:59:59Z",
            project=self.project
        )
        Milestone.objects.create(
            title="Test Milestone 2",
            description="Description 2",
            due_date="2025-01-01T23:59:59Z",
            project=self.project
        )
        url = reverse('project_milestones', args=[self.project.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
