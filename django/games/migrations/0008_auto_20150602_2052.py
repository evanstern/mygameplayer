# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_auto_20150602_2006'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='date_ended',
            field=models.DateTimeField(help_text='When the match ended', null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='campaign',
            field=models.ForeignKey(related_name='matches', to='campaign.Campaign', null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='game',
            field=models.ForeignKey(related_name='matches', to='games.Game'),
        ),
    ]
