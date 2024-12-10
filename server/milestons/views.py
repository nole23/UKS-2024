from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Milestone
from .serializers import MilestoneSerializer

# Kreiranje Milestone-a
@api_view(['POST'])
def create_milestone(request):
    if request.method == 'POST':
        serializer = MilestoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Dobijanje Milestone-a sa određenim ID-jem
@api_view(['GET'])
def get_milestone(request, pk):
    try:
        milestone = Milestone.objects.get(pk=pk)
    except Milestone.DoesNotExist:
        return Response({'error': 'Milestone not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = MilestoneSerializer(milestone)
    return Response(serializer.data)

# Dobijanje svih Milestone-ova vezanih za projekat
@api_view(['GET'])
def get_milestones(request, project_id):
    milestones = Milestone.objects.filter(project__id=project_id)
    serializer = MilestoneSerializer(milestones, many=True)
    return Response(serializer.data)
