# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0001_initial'),
        ('accounts', '0006_auto_20150524_1610'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='campaigns',
            field=models.ManyToManyField(to='campaign.Campaign'),
        ),
    ]
