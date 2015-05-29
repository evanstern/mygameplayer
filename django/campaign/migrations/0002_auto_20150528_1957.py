# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='date_ended',
            field=models.DateTimeField(default=None, help_text=b'When the campaign ended', null=True),
        ),
    ]
