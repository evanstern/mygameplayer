from django.contrib.auth import get_user_model
from tastypie.resources import ModelResource as ModelBase

class UserResource(ModelBase):
    class Meta:
        queryset = get_user_model().objects.all()
        resource_name = "user"
        excludes = ["password", "is_superuser", "is_staff", "is_active"]

