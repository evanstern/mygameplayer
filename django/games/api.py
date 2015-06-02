from tastypie.resources import (
    ModelResource as ModelBase,
    ALL_WITH_RELATIONS,
)
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie import fields

from games import models as gamesmodels

class GameResource(ModelBase):
    name = fields.CharField("name")

    class Meta:
        queryset = gamesmodels.Game.objects.all()
        resource_name = "game"
        authentication = SessionAuthentication()
        authorization = Authorization()
        filtering = {"name": ["iexact", "exact", "contains", "icontains",],}

class MatchResource(ModelBase):
    game = fields.ForeignKey("games.api.GameResource", "game", full=True,)
    campaign = fields.ForeignKey("campaign.api.CampaignResource", "campaign")
    players = fields.ManyToManyField("accounts.api.UserProfileResource", "players", null=True)

    class Meta:
        queryset = gamesmodels.Match.objects.all()
        resource_name = "match"
        authentication = SessionAuthentication()
        authorization = Authorization()
        filtering = {"campaign": ALL_WITH_RELATIONS,}

