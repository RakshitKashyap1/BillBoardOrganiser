from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to users with the 'admin' role.
    """
    def has_permission(self, request, view):
        # Check if user is authenticated and has the admin role
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')

class IsOwnerUser(permissions.BasePermission):
    """
    Allows access only to users with the 'owner' (Media Owner) role.
    """
    def has_permission(self, request, view):
        # Check if user is authenticated and has the owner role
        return bool(request.user and request.user.is_authenticated and request.user.role == 'owner')

class IsAdvertiserUser(permissions.BasePermission):
    """
    Allows access only to users with the 'advertiser' role.
    """
    def has_permission(self, request, view):
        # Check if user is authenticated and has the advertiser role
        return bool(request.user and request.user.is_authenticated and request.user.role == 'advertiser')

class IsAdSpaceOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an AdSpace to edit it.
    Read permissions are allowed to any request.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the AdSpace.
        return obj.owner == request.user
