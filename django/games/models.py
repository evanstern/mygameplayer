from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class Game(models.Model):
    """
    Hold information about a game
    """
    name = models.CharField(max_length=256, unique=True, db_index=True,
                            help_text=_("The name of the game"),)

    class Meta:
        app_label = "games"

class Match(models.Model):
    """
    One isntance of playing a game
    """
    game = models.ForeignKey("games.Game", related_name="matches")
    campaign = models.ForeignKey("campaign.Campaign", null=True, related_name="matches")
    players = models.ManyToManyField("accounts.UserProfile")

    date_started = models.DateTimeField(help_text=_(
        "When the match began"), auto_now_add=True,)
    last_time_played = models.DateTimeField(help_text=_(
        "The last time this match was played"), auto_now=True,)
    date_ended = models.DateTimeField(help_text=_(
        "When the match ended"), null=True)

    class Meta:
        app_label = "games"

