# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0003_auto_20150530_1430'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='user_profiles',
            field=models.ManyToManyField(related_name='campaigns', through='campaign.Players', to='accounts.UserProfile'),
        ),
    ]
