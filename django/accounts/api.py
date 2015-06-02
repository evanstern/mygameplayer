from django.contrib.auth import get_user_model
from tastypie.resources import (
    ModelResource as ModelBase,
    ALL,
    ALL_WITH_RELATIONS,
)
from tastypie import fields
from accounts import models

class UserResource(ModelBase):
    user_profile = fields.ToOneField("accounts.api.UserProfileResource", "profile",)
    class Meta:
        queryset = get_user_model().objects.all()
        resource_name = "user"
        excludes = ["password", "is_superuser", "is_staff", "is_active"]
        filtering = {"user_profile": ALL_WITH_RELATIONS,
                     "email": ["iexact", "exact",]}

class UserProfileResource(ModelBase):
    user = fields.ToOneField("accounts.api.UserResource", "user",)
    campaigns = fields.ToManyField("campaign.api.CampaignResource", "campaigns",)
    player_name = fields.CharField("player_name")

    class Meta:
        queryset = models.UserProfile.objects.all()
        resource_name = "user_profile"
        excludes = ["activation_key", "key_expires",]
        filtering = {"campaigns": ALL_WITH_RELATIONS,
                     "user": ALL_WITH_RELATIONS,
                     "player_name": ["exact", "contains",],}


