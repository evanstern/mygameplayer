import json
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, resolve_url
from django.contrib.auth import (
    REDIRECT_FIELD_NAME, get_user_model,
    login as auth_login
)
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.urlresolvers import reverse
from django.conf import settings
from django.utils import timezone
from django.utils.http import is_safe_url
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.sites.shortcuts import get_current_site
from django.template.response import TemplateResponse

from .forms import AuthenticationForm, RegistrationForm
from .models import UserProfile

def profile(request):
    return render(request, "accounts/profile.html")

@sensitive_post_parameters()
@csrf_protect
@never_cache
def login(request, template_name='registration/login.html',
          redirect_field_name=REDIRECT_FIELD_NAME,
          authentication_form=AuthenticationForm,
          current_app=None, extra_context=None):
    """
    Display the login form and handle the login action. See
    django.contrib.auth.views.login
    """
    redirect_to = request.POST.get(redirect_field_name,
                                   request.GET.get(redirect_field_name, ''))

    if request.method == "POST":
        form = authentication_form(request, data=request.POST)
        if form.is_valid():
            # Log the user in (everything is OK)
            auth_login(request, form.get_user())

            # Ensure the user-originating redirection url is save.
            if not is_safe_url(url=redirect_to, host=request.get_host()):
                redirect_to = reverse("account_home", args=[request.user.username])

            return HttpResponseRedirect(redirect_to)
    else:
        form = authentication_form(request)

    current_site = get_current_site(request)

    context = {
        "form": form,
        redirect_field_name: redirect_to,
        "site": current_site,
        "site_name": current_site.name,
    }
    if extra_context is not None:
        context.update(extra_context)

    if current_app is not None:
        request.current_app = current_app

    return TemplateResponse(request, template_name, context)

def register(request):
    """
    Display the registration form and handle displaying the registration email
    confirmation page.
    """
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            form.save(request)
            return render(request, "registration/new_user_email_confirm.html",
                          dict(email=email))
    form = RegistrationForm()
    return render(request, "registration/new_user.html", dict(register_form=form))

def register_confirm(request, activation_key):
    """
    Display the registration confirmation (and registration key expiration)
    pages.
    """
    if request.user.is_authenticated():
        HttpResponseRedirect(reverse("account_home", args=[request.user.username]))

    user_profile = get_object_or_404(UserProfile, activation_key=activation_key)
    if user_profile.key_expires < timezone.now():
        return render(request, "registration/new_user_confirm_expired.html",
                      dict(user=user_profile.user))

    user = user_profile.user
    user.is_active = True
    user.key_expires = timezone.now()
    user.save()

    return render(request, "registration/new_user_confirm.html", dict(user=user))

def account_home(request, username):
    """
    Display the "home" page for an account
    """
    user = get_object_or_404(get_user_model(), username=username)
    serialized = json.dumps(dict(
        user=request.user.serialize(),
        profile=request.user.profile.serialize(),
    ))
    context = dict(account=user,
                   user=request.user,
                   is_authenticated=request.user.is_authenticated(),
                   body_class="account-home no-js",
                   serialized=serialized,)
    return render(request, "accounts/home.html", context,)

