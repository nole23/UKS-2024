from django.test import TestCase
from django.contrib.auth import get_user_model
from dashboard.models import Project, Repository, Branch, File, PullRequest, Issue, Commit
from users.models import CustomUser  # Importujemo CustomUser model
from milestons.models import Milestone  # Importujemo Milestone model

class ProjectModelTest(TestCase):
    """Testiranje modela Project"""

    def setUp(self):
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )

    def test_project_creation(self):
        """Testira kreiranje projekta"""
        self.assertEqual(self.project.name, "Test Project")
        self.assertEqual(self.project.description, "Test project description")

    def test_project_string_representation(self):
        """Testira string reprezentaciju projekta"""
        self.assertEqual(str(self.project), "Test Project")


class RepositoryModelTest(TestCase):
    """Testiranje modela Repository"""

    def setUp(self):
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        self.repository = Repository.objects.create(
            name="Test Repo",
            project=self.project,
            description="Test repository description"
        )

    def test_repository_creation(self):
        """Testira kreiranje repozitorijuma"""
        self.assertEqual(self.repository.name, "Test Repo")
        self.assertEqual(self.repository.project.name, "Test Project")

    def test_repository_string_representation(self):
        """Testira string reprezentaciju repozitorijuma"""
        self.assertEqual(str(self.repository), "Test Repo")


class BranchModelTest(TestCase):
    """Testiranje modela Branch"""

    def setUp(self):
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        self.repository = Repository.objects.create(
            name="Test Repo",
            project=self.project,
            description="Test repository description"
        )
        self.branch = Branch.objects.create(
            name="Test Branch",
            repository=self.repository
        )

    def test_branch_creation(self):
        """Testira kreiranje grane"""
        self.assertEqual(self.branch.name, "Test Branch")
        self.assertEqual(self.branch.repository.name, "Test Repo")

    def test_branch_string_representation(self):
        """Testira string reprezentaciju grane"""
        self.assertEqual(str(self.branch), "Test Branch")


class CommitModelTest(TestCase):
    """Testiranje modela Commit"""

    def setUp(self):
        # Koristi CustomUser za kreiranje korisnika
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )

        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        self.repository = Repository.objects.create(
            name="Test Repo",
            project=self.project,
            description="Test repository description"
        )
        self.branch = Branch.objects.create(
            name="Test Branch",
            repository=self.repository
        )
        self.file = File.objects.create(
            name="Test File",
            path="path/to/file",
            branch=self.branch
        )
        self.commit = Commit.objects.create(
            message="Initial commit",
            file=self.file,
            author=self.user,  # povezuje sa CustomUser modelom
            commit_hash="abc1234"
        )

    def test_commit_creation(self):
        """Testira kreiranje commit-a"""
        print(self.commit.author.username)
        self.assertEqual(self.commit.message, "Initial commit")
        self.assertEqual(self.commit.author.username, "testuser")
        self.assertEqual(self.commit.file.name, "Test File")

    def test_commit_string_representation(self):
        """Testira string reprezentaciju commit-a"""
        self.assertEqual(str(self.commit), "abc1234 - Initial commit")


class IssueModelTest(TestCase):
    """Testiranje modela Issue"""

    def setUp(self):
        # Koristi CustomUser za kreiranje korisnika
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        self.repository = Repository.objects.create(
            name="Test Repo",
            project=self.project,
            description="Test repository description"
        )
        self.issue = Issue.objects.create(
            title="Test Issue",
            description="Test issue description",
            repository=self.repository,
            created_by=self.user,  # povezuje sa CustomUser modelom
        )

    def test_issue_creation(self):
        """Testira kreiranje issue-a"""
        self.assertEqual(self.issue.title, "Test Issue")
        self.assertEqual(self.issue.repository.name, "Test Repo")
        self.assertEqual(self.issue.created_by.username, "testuser")

    def test_issue_string_representation(self):
        """Testira string reprezentaciju issue-a"""
        self.assertEqual(str(self.issue), "Test Issue")


class PullRequestModelTest(TestCase):
    """Testiranje modela PullRequest"""

    def setUp(self):
        # Koristi CustomUser za kreiranje korisnika
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )
        self.project = Project.objects.create(
            name="Test Project",
            description="Test project description"
        )
        self.repository = Repository.objects.create(
            name="Test Repo",
            project=self.project,
            description="Test repository description"
        )
        self.source_branch = Branch.objects.create(
            name="Source Branch",
            repository=self.repository
        )
        self.target_branch = Branch.objects.create(
            name="Target Branch",
            repository=self.repository
        )
        self.milestone = Milestone.objects.create(
            title="Test Milestone",
            description="Test milestone description",
            project=self.project
        )
        self.pull_request = PullRequest.objects.create(
            title="Test Pull Request",
            description="Test pull request description",
            repository=self.repository,
            source_branch=self.source_branch,
            target_branch=self.target_branch,
            created_by=self.user,  # povezuje sa CustomUser modelom
            milestone=self.milestone  # povezuje sa Milestone modelom
        )

    def test_pull_request_creation(self):
        """Testira kreiranje pull request-a"""
        self.assertEqual(self.pull_request.title, "Test Pull Request")
        self.assertEqual(self.pull_request.source_branch.name, "Source Branch")
        self.assertEqual(self.pull_request.target_branch.name, "Target Branch")
        self.assertEqual(self.pull_request.created_by.username, "testuser")

    def test_pull_request_string_representation(self):
        """Testira string reprezentaciju pull request-a"""
        self.assertEqual(str(self.pull_request), "Test Pull Request")
