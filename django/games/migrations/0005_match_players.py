# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20150524_1610'),
        ('games', '0004_auto_20150525_0252'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='players',
            field=models.ManyToManyField(to='accounts.UserProfile'),
        ),
    ]
