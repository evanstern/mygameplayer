# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0001_initial'),
        ('games', '0005_match_players'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='campaign',
            field=models.ForeignKey(to='campaign.Campaign', null=True),
        ),
    ]
