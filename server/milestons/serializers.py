from django.utils import timezone
from rest_framework import serializers
from .models import Milestone

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'

    def validate_due_date(self, value):
        if value and value < timezone.now():  # Koristi timezone.now()
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value
