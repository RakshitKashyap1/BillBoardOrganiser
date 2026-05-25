from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """
    Custom User model extending Django's built-in AbstractUser.
    Replaces the default username login with email login and adds role-based access.
    """
    ROLE_CHOICES = (
        ('advertiser', 'Advertiser'),
        ('owner', 'Media Owner'),
        ('admin', 'Admin'),
    )
    # Role dictates what parts of the system the user can access
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='advertiser')
    # Full name of the user
    name = models.CharField(max_length=255)
    # Email is used as the unique identifier for authentication
    email = models.EmailField(unique=True)

    # Tell Django to use 'email' for login instead of 'username'
    USERNAME_FIELD = 'email'
    # Required fields when creating a superuser via CLI
    REQUIRED_FIELDS = ['username', 'name', 'role']

    def __str__(self):
        """String representation of the user."""
        return f"{self.name} ({self.role})"
