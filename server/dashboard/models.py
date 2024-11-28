from django.db import models
from milestons.models import Milestone
from users.models import CustomUser

# Model za Project
class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Model za Repository
class Repository(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, related_name='repositories', on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Model za Branch
class Branch(models.Model):
    name = models.CharField(max_length=100)
    repository = models.ForeignKey(Repository, related_name='branches', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Model za File
class File(models.Model):
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=200)
    branch = models.ForeignKey(Branch, related_name='files', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Model za PullRequest
class PullRequest(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    repository = models.ForeignKey(Repository, related_name='pull_requests', on_delete=models.CASCADE)
    source_branch = models.ForeignKey(Branch, related_name='source_pull_requests', on_delete=models.CASCADE)
    target_branch = models.ForeignKey(Branch, related_name='target_pull_requests', on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, related_name='created_pull_requests', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)
    milestone = models.ForeignKey(Milestone, related_name='pull_requests', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title

# Model za Issue
class Issue(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    repository = models.ForeignKey(Repository, related_name='issues', on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, related_name='created_issues', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(CustomUser, related_name='assigned_issues', null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('closed', 'Closed')], default='open')
    milestone = models.ForeignKey(Milestone, related_name='issues', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title

# Model za Commit
class Commit(models.Model):
    message = models.CharField(max_length=255)
    file = models.ForeignKey(File, related_name='commits', on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, related_name='commits', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    commit_hash = models.CharField(max_length=40, unique=True)  # Git commit hash (SHA-1)

    def __str__(self):
        return f'{self.commit_hash[:7]} - {self.message}'
