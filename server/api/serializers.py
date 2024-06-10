from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import Tasks
# getting custom user model
User = get_user_model()
from rest_framework import serializers

class PasswordVerificationSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_email = serializers.EmailField(write_only=True,required=False)
    new_username = serializers.CharField(write_only=True,required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    new_full_name = serializers.CharField(write_only=True, required=False)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value
    
    def validate_new_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already taken.')
        return value
    
    def validate_new_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already taken.')
        return value

    def validate_new_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def update(self, instance, validated_data):
        if 'new_email' in validated_data:
            instance.email = validated_data['new_email']
        if 'new_username' in validated_data:
            instance.username = validated_data['new_username']
        if 'new_password' in validated_data:
            instance.set_password(validated_data['new_password'])
        if 'new_full_name' in validated_data:
            instance.full_name = validated_data['new_full_name']
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

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'email','username']