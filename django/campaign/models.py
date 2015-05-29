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

    class Meta:
        app_label = "campaign"
