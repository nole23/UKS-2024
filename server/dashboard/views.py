# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Repository, Branch, File, PullRequest, Issue, Commit
from .serializers import ProjectSerializer, RepositorySerializer, BranchSerializer, FileSerializer, PullRequestSerializer, IssueSerializer, CommitSerializer

# =============================== Project ===============================

# Get sve projekte
@api_view(['GET'])
def get_projects(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectSerializer(project)
    return Response(serializer.data)

# Kreiraj novi projekat
@api_view(['POST'])
def create_project(request):
    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== Repository ===============================

# Get sve repozitorijume
@api_view(['GET'])
def get_repositories(request, pk):
    try:
        repositories = Repository.objects.get(pk=pk)
    except Repository.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RepositorySerializer(repositories)
    return Response(serializer.data)

# Kreiraj novi repozitorijum
@api_view(['POST'])
def create_repository(request):
    if request.method == 'POST':
        serializer = RepositorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== Branch ===============================

# Get sve grane
@api_view(['GET'])
def get_branches(request, pk):
    try:
        branches = Branch.objects.get(pk=pk)
    except Branch.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BranchSerializer(branches)
    return Response(serializer.data)

# Kreiraj novu granu
@api_view(['POST'])
def create_branch(request):
    if request.method == 'POST':
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== File ===============================

# Get sve fajlove
@api_view(['GET'])
def get_files(request):
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

# Kreiraj novi fajl
@api_view(['POST'])
def create_file(request):
    if request.method == 'POST':
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== PullRequest ===============================

# Get sve pull requestove
@api_view(['GET'])
def get_pull_requests(request):
    pull_requests = PullRequest.objects.all()
    serializer = PullRequestSerializer(pull_requests, many=True)
    return Response(serializer.data)

# Kreiraj novi pull request
@api_view(['POST'])
def create_pull_request(request):
    if request.method == 'POST':
        serializer = PullRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== Issue ===============================

# Get sve issue-e
@api_view(['GET'])
def get_issues(request, pk):
    try:
        issues = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = IssueSerializer(issues)
    return Response(serializer.data)

# Kreiraj novi issue
@api_view(['POST'])
def create_issue(request):
    if request.method == 'POST':
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================== Commit ===============================

# Get sve commite
@api_view(['GET'])
def get_commits(request, pk):
    try:
        commits = Commit.objects.get(pk=pk)
    except Commit.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = CommitSerializer(commits)
    return Response(serializer.data)

# Kreiraj novi commit
@api_view(['POST'])
def create_commit(request):
    if request.method == 'POST':
        serializer = CommitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
