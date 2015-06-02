# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0006_campaign_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='players',
            field=models.ManyToManyField(related_name='campaigns', null=True, through='campaign.Players', to='accounts.UserProfile'),
        ),
    ]
