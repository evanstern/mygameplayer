import datetime, json, hashlib

from django.core import serializers
from django.contrib import admin
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.db import models

from mygameplayer.models import AbstractBaseModel, SerializeMixin

class UserManager(BaseUserManager):
    def create_user(self, email, username, first_name="", last_name="", password=None):
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, first_name, last_name, password):
        user = self.create_user(email, username, first_name=first_name,
                                last_name=last_name, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin, SerializeMixin):
    email = models.EmailField(max_length=256, unique=True, db_index=True,
                              help_text="your@email.address",)
    first_name = models.CharField(max_length=256, help_text="Your first name")
    last_name = models.CharField(max_length=256, help_text="Your last name")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    SERIALIZE_EXCLUDE = ["password"]

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.first_name[0] + self.last_name

    def serialize(self, *args, **kwargs):
        serialized = super(User, self).serialize(*args, **kwargs)
        serialized["fields"]["gravatar_hash"] = hashlib.md5(self.email.lower()).hexdigest()
        return serialized

    class Meta:
        app_label = "accounts"

class UserAdmin(admin.ModelAdmin):
    search_fields = ("email", "first_name", "last_name",)
    list_filter = ("is_active", "is_staff", "is_superuser",)
    readonly_fields = ("user_permissions", "last_login", "groups",)
    fieldsets = (
        ("User details", {"fields": ("email", ("first_name", "last_name"),)}),
        ("Admin controlled", {"fields": ("is_staff", "is_superuser", "is_active",)}),
        ("Read only", {"fields": ("user_permissions", "groups", "last_login",)})
    )

admin.site.register(User, UserAdmin)

class UserProfile(AbstractBaseModel, SerializeMixin):
    user = models.OneToOneField("accounts.User", related_name="profile")
    activation_key = models.CharField(max_length=40, blank=True)
    key_expires = models.DateTimeField(default=timezone.now)

    player_name = models.CharField(max_length=256, blank=True, db_index=True,)

    SERIALIZE_EXCLUDE = ["activation_key", "key_expires"]

    class Meta:
        app_label = "accounts"
        verbose_name_plural = "User profiles"

admin.site.register(UserProfile)

