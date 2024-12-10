from django.core.exceptions import ValidationError
from django.test import TestCase
from dashboard.models import Project
from milestons.models import Milestone

class MilestoneModelTest(TestCase):
    """Testiranje modela Milestone"""

    def setUp(self):
        # Kreiranje projekta koji će biti povezan sa Milestone
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        # Kreiranje Milestone objekta povezanog sa projektom
        self.milestone = Milestone.objects.create(
            title="Test Milestone",
            description="Test milestone description",
            due_date="2024-12-31T00:00:00Z",
            project=self.project
        )

    def test_milestone_creation(self):
        """Testira kreiranje Milestone objekta"""
        # Provera da li su podaci tačni
        self.assertEqual(self.milestone.title, "Test Milestone")
        self.assertEqual(self.milestone.description, "Test milestone description")
        self.assertEqual(self.milestone.due_date, "2024-12-31T00:00:00Z")
        self.assertEqual(self.milestone.project.name, "Test Project")
        self.assertEqual(self.milestone.status, "open")  # Provera da li je status podrazumevano 'open'

    def test_milestone_string_representation(self):
        """Testira string reprezentaciju Milestone objekta"""
        # Provera da li string reprezentacija vraća tačan naziv
        self.assertEqual(str(self.milestone), "Test Milestone")

    def test_milestone_status_default(self):
        """Testira da li status podrazumevano postavljen na 'open'"""
        # Provera da li je status podrazumevano 'open'
        self.assertEqual(self.milestone.status, 'open')

    def test_milestone_due_date(self):
        """Testira da li je due_date pravilno postavljen"""
        # Provera da li je due_date ispravno postavljen
        self.assertEqual(self.milestone.due_date, "2024-12-31T00:00:00Z")

    def test_milestone_status_choices(self):
        """Testira da li status može biti samo 'open' ili 'closed'"""
        # Testira nevalidnu vrednost za status (npr. 'invalid')
        invalid_milestone = Milestone(
            title="Invalid Milestone",
            description="Invalid milestone description",
            status='invalid',  # Nevalidni status
            project=self.project
        )

        # Očekujemo ValidationError jer status mora biti 'open' ili 'closed'
        with self.assertRaises(ValidationError):
            invalid_milestone.full_clean()  # Pokreće validaciju
