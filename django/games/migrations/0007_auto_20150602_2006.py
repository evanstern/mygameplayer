# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_match_campaign'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='campaign',
            field=models.ForeignKey(related_name='games', to='campaign.Campaign', null=True),
        ),
    ]
