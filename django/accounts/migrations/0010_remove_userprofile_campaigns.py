# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_remove_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='campaigns',
        ),
    ]
