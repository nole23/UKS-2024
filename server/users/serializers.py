# users/serializers.py
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)  # Uzimanje lozinke
        user = super().create(validated_data)
        if password:
            user.set_password(password)  # Postavljanje hashovane lozinke
            user.save()
        return user
