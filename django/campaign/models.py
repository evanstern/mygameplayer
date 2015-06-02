from django.db import models

# Create your models here.

class Campaign(models.Model):
    """
    A series of game matches makes up a campaign
    """
    date_started = models.DateTimeField(help_text=("When the campaign started"),
                                        auto_now_add=True,)
    date_ended = models.DateTimeField(help_text=("When the campaign ended"), null=True, default=None)
    name = models.CharField(max_length=256, help_text=("The name of this campaign"),)

    players = models.ManyToManyField("accounts.UserProfile", through="campaign.Players", related_name="campaigns")
    owner = models.ForeignKey("accounts.UserProfile")

    class Meta:
        app_label = "campaign"

class Players(models.Model):
    """
    A player is a user (profile) involved in a campaign
    """
    user_profile = models.ForeignKey("accounts.UserProfile")
    campaign = models.ForeignKey("campaign.Campaign", related_name="players_set")

    class Meta:
        app_label = "campaign"

