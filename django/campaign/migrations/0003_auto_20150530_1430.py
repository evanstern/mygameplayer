# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_userprofile_campaigns'),
        ('campaign', '0002_auto_20150528_1957'),
    ]

    operations = [
        migrations.CreateModel(
            name='Players',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('campaign', models.ForeignKey(to='campaign.Campaign')),
                ('user_profile', models.ForeignKey(to='accounts.UserProfile')),
            ],
        ),
        migrations.AddField(
            model_name='campaign',
            name='user_profiles',
            field=models.ManyToManyField(to='accounts.UserProfile', through='campaign.Players'),
        ),
    ]
