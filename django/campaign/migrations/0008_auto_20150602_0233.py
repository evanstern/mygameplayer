# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0007_auto_20150602_0232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='players',
            field=models.ManyToManyField(related_name='campaigns', through='campaign.Players', to='accounts.UserProfile'),
        ),
    ]
