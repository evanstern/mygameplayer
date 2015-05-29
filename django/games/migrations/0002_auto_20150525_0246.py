# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_started', models.DateTimeField(help_text='When the match began', auto_now_add=True)),
                ('last_time_played', models.DateTimeField(help_text='The last time this match was played', auto_now=True)),
                ('game', models.ForeignKey(to='games.Game')),
            ],
        ),
        migrations.CreateModel(
            name='MatchPlayers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('match', models.ForeignKey(to='games.Match')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='match',
            name='players',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, through='games.MatchPlayers'),
        ),
    ]
