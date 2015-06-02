# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_remove_userprofile_campaigns'),
        ('campaign', '0005_auto_20150530_1635'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='owner',
            field=models.ForeignKey(default=15, to='accounts.UserProfile'),
            preserve_default=False,
        ),
    ]
