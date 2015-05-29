from tastypie.resources import ModelResource as ModelBase
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from campaign import models as campaignmodels

class CampaignResource(ModelBase):
    class Meta:
        queryset = campaignmodels.Campaign.objects.all()
        authantication = SessionAuthentication()
        authorization = Authorization()
        resource_name = "campaign"

    def get_object_list(self, request):
        return super(CampaignResource, self).get_object_list(request).filter(userprofile=request.user.profile)

    def obj_create(self, bundle, **kwargs):
        bundle = super(CampaignResource, self).obj_create(bundle, **kwargs)
        bundle.obj.userprofile_set.add(bundle.request.user.profile)
        return bundle

    def apply_authorization_limits(self, request, object_list):
        return object_list.filter(user_profile=request.user.profile)

