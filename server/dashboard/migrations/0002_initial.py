# Generated by Django 3.2.25 on 2024-11-24 15:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('milestons', '0001_initial'),
        ('dashboard', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pullrequest',
            name='milestone',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pull_requests', to='milestons.milestone'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pull_requests', to='dashboard.repository'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='source_branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source_pull_requests', to='dashboard.branch'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='target_branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target_pull_requests', to='dashboard.branch'),
        ),
        migrations.AddField(
            model_name='issue',
            name='assigned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_issues', to='users.users'),
        ),
        migrations.AddField(
            model_name='issue',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_issues', to='users.users'),
        ),
        migrations.AddField(
            model_name='issue',
            name='milestone',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='issues', to='milestons.milestone'),
        ),
        migrations.AddField(
            model_name='issue',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issues', to='dashboard.repository'),
        ),
        migrations.AddField(
            model_name='file',
            name='branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='dashboard.branch'),
        ),
        migrations.AddField(
            model_name='commit',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='users.users'),
        ),
        migrations.AddField(
            model_name='commit',
            name='file',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='dashboard.file'),
        ),
        migrations.AddField(
            model_name='branch',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='branches', to='dashboard.repository'),
        ),
    ]
