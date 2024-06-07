from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import get_user_model

# getting custom user model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'id','full_name','username','email','password','re_password'
        ]
    
    def validate(self, data):
        # Call super to run default validations
        data = super().validate(data)

        # Validate password using Django's built-in password validators
        password = data.get('password')
        if password:
            validate_password(password)

        # Check if the password and re-entered password match
        if password != data.get('re_password'):
            raise serializers.ValidationError("The passwords do not match.")

        # Pop out the re-entered password before returning the validated data
        data.pop('re_password')

        return data
    
    
    def create(self, validated_data):
        # Hash the password before saving the user
        validated_data['password'] = make_password(validated_data['password'])

        return super().create(validated_data)