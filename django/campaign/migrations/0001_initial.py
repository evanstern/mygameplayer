# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_started', models.DateTimeField(help_text=b'When the campaign started', auto_now_add=True)),
                ('date_ended', models.DateTimeField(help_text=b'When the campaign ended')),
                ('name', models.CharField(help_text=b'The name of this campaign', max_length=256)),
            ],
        ),
    ]
