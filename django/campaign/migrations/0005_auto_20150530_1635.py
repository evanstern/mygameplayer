# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0004_auto_20150530_1629'),
    ]

    operations = [
        migrations.RenameField(
            model_name='campaign',
            old_name='user_profiles',
            new_name='players',
        ),
        migrations.AlterField(
            model_name='players',
            name='campaign',
            field=models.ForeignKey(related_name='players_set', to='campaign.Campaign'),
        ),
    ]
