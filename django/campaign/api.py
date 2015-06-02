from django.conf.urls import url
from tastypie.resources import ModelResource as ModelBase
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.utils import trailing_slash
from tastypie import fields

from campaign import models as campaignmodels

class CampaignResource(ModelBase):
    owner = fields.ForeignKey("accounts.api.UserProfileResource", "owner", full=True)
    players = fields.ToManyField("accounts.api.UserProfileResource", "players", full=True, null=True)
    matches = fields.ToManyField("games.api.MatchResource", "matches", full=True, null=True)

    class Meta:
        queryset = campaignmodels.Campaign.objects.all()
        authantication = SessionAuthentication()
        authorization = Authorization()
        resource_name = "campaign"

    def prepend_urls(self):
        return [
            url(r'^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/players%s$' % (
                self._meta.resource_name, trailing_slash(),
            ), self.wrap_view("get_players"),
            name="api_get_players_for_campaign",),
            url(r'^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/matches%s$' % (
                self._meta.resource_name, trailing_slash(),
            ), self.wrap_view("get_matches"),
            name="api_get_matches_for_campaign",),
        ]

    def get_players(self, request, **kwargs):
        self.method_check(request, ["get", "post",])
        from accounts.api import UserProfileResource

        if request.method == "POST":
            content_type = request.META.get("CONTENT_TYPE", "application/json")
            bundle = self.build_bundle(data={"pk": kwargs["pk"]}, request=request)
            campaign = self.cached_obj_get(bundle=bundle, **self.remove_api_resource_names(kwargs))

            data = self.deserialize(request, request.body, format=content_type)

            user_profile_resource = UserProfileResource()
            profile = UserProfileResource._meta.queryset.get(pk=data["id"])

            player = campaignmodels.Players(campaign=campaign, user_profile=profile)
            player.save()

            return user_profile_resource.get_detail(request, pk=profile.pk)

        return UserProfileResource().get_list(request, campaigns=kwargs["pk"])

    def get_matches(self, request, **kwargs):
        self.method_check(request, ["get",])
        from games.api import MatchResource
        return MatchResource().get_detail(request, campaign=kwargs["pk"])

    def get_object_list(self, request):
        return super(CampaignResource, self).get_object_list(request).filter(owner=request.user.profile)

    def obj_create(self, bundle, **kwargs):
        profile = bundle.request.user.profile
        bundle = super(CampaignResource, self).obj_create(bundle, owner=profile, **kwargs)
        return bundle

    def save_m2m(self, bundle):
        # don't save m2m relations...
        pass

    def apply_authorization_limits(self, request, object_list):
        return object_list.filter(user_profile=request.user.profile)

#class PlayersResource(ModelBase):
#    class Meta:
#        queryset = campaignmodels.Players.objects.all()
#        resource_name = "players"
#        authentication = SessionAuthentication()
#        authorization = Authorization()

