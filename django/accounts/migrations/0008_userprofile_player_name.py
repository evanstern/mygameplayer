# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_userprofile_campaigns'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='player_name',
            field=models.CharField(db_index=True, max_length=256, blank=True),
        ),
    ]
