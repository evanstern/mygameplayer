# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_remove_match_players'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchplayers',
            name='match',
        ),
        migrations.RemoveField(
            model_name='matchplayers',
            name='user',
        ),
        migrations.DeleteModel(
            name='MatchPlayers',
        ),
    ]
