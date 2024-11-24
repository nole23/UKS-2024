from django.db import models


# Create your models here.
# Model za Milestone
class Milestone(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateTimeField(null=True, blank=True)
    project = models.ForeignKey('dashboard.Project', related_name='milestones', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('closed', 'Closed')], default='open')

    def __str__(self):
        return self.title
