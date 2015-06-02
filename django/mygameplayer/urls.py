"""mygameplayer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r"^$", views.home, name="home")
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r"^$", Home.as_view(), name="home")
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r"^blog/", include(blog_urls))
"""
from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin

from . import views

_api_patterns = []
from accounts.api import UserResource, UserProfileResource
_api_patterns += UserResource().urls
_api_patterns += UserProfileResource().urls
from campaign.api import CampaignResource
_api_patterns += CampaignResource().urls

urlpatterns = [
    url(r"^$", views.index, name="home"),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^about/", views.about, name="about"),
    url(r"^contact/", views.contact, name="contact"),
    url(r"^support/", views.support, name="support"),
    url(r"^accounts/", include("accounts.urls")),
    url(r"^api/", include(_api_patterns)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r"^__debug__/", include(debug_toolbar.urls)),
    ]

