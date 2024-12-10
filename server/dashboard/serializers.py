# dashboard/serializers.py

from rest_framework import serializers
from .models import Project, Repository, Branch, File, PullRequest, Issue, Commit
from users.models import CustomUser

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'name', 'project', 'description', 'created_at', 'updated_at']

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class PullRequestSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()  # Pretvaranje korisnika u string (možete koristiti i PrimaryKeyRelatedField)
    milestone = serializers.StringRelatedField(required=False)  # Ako je milestone opcionalan

    class Meta:
        model = PullRequest
        fields = '__all__'


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['title', 'description', 'created_by', 'status', 'repository_id']

    def create(self, validated_data):
        # Ako repository_id nije prosleđen, postavi podrazumevanu vrednost (npr. ID 1)
        if 'repository_id' not in validated_data:
            validated_data['repository_id'] = 1  # Postavi podrazumevani ID repozitorijuma

        user = CustomUser.objects.get(pk=1)  # Uzmi korisnika iz trenutnog zahteva
        validated_data['created_by'] = user

        return super().create(validated_data)


class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'