from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from core.permissions import IsAdminUser

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT token obtain view that uses our custom serializer
    to include additional user information (like role) in the token payload.
    """
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    """
    API view for user registration.
    Allows any user (unauthenticated) to create a new account.
    """
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class UserListView(generics.ListAPIView):
    """
    API view to list all users.
    Restricted to authenticated Admin users only.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class VerifyOwnerView(generics.UpdateAPIView):
    """
    API view to manually verify and upgrade a user to the 'owner' role.
    Restricted to Admin users.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def update(self, request, *args, **kwargs):
        # Fetch the user instance
        user = self.get_object()
        # Upgrade the user's role to 'owner'
        user.role = 'owner'
        user.save()
        # Return the updated user data
        return Response(UserSerializer(user).data)
