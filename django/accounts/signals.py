from django.contrib.auth import get_user_model
from django.db.models import signals
from django.dispatch import receiver

from .models import UserProfile

@receiver(signals.post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if not created:
        return
    user_profile = UserProfile(user=instance,)
    user_profile.save()

signals.post_save.connect(create_user_profile, sender=get_user_model())
