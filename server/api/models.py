from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser

class Status(models.IntegerChoices):
    TODO = 1,'Todo'
    IN_PROGRESS = 2,'InPorgress'
    DONE = 3,'Done'

# custom user model for storing user auth and other data
class CustomUser(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=50)

    # this is the field which will be used when loggin in
    USERNAME_FIELD = "email"
    # required field when creating superuser, email and password is required by default
    REQUIRED_FIELDS = ['first_name','last_name','username',]

class Tasks(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey('api.CustomUser' ,related_name='tasks', on_delete=models.CASCADE)
    task = models.CharField(max_length=50)
    status = models.IntegerField(choices=Status.choices, default=1)
    description = models.TextField(max_length=200, default="")
    due = models.DateTimeField()

    class Meta:
        verbose_name = ("Task")
        verbose_name_plural = ("Tasks")

    def __str__(self):
        return self.name
