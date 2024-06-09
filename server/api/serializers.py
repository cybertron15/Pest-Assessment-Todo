from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tasks
# getting custom user model
User = get_user_model()
from rest_framework import serializers

class PasswordVerificationSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_email = serializers.EmailField(required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    new_full_name = serializers.CharField(write_only=True, required=False)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def update(self, instance, validated_data):
        if 'new_email' in validated_data:
            instance.email = validated_data['new_email']
        if 'new_password' in validated_data:
            instance.set_password(validated_data['new_password'])
        if 'new_full_name' in validated_data:
            instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'full_name','username','email','password','re_password'
        ]
        
    
    def validate(self, data):
        # Call super to run default validations
        data = super().validate(data)
        password = data.get('password')

        # Check if the password and re-entered password match
        if password != data.get('re_password'):
            raise serializers.ValidationError("The passwords do not match.")

        # Validate password using Django's built-in password validators
        if password:
            validate_password(password)

        # Pop out the re-entered password before returning the validated data
        data.pop('re_password')

        return data
    
    
    def create(self, validated_data):
        # Hash the password before saving the user
        validated_data['password'] = make_password(validated_data['password'])

        return super().create(validated_data)
    
class TaskSerializers(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Tasks
        fields = [
            "id",
            "owner",
            "task",
            "status",
            "description",
            "due"
        ]