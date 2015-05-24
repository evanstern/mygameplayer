from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model
from django.contrib.auth.views import login as auth_login
from django.utils import timezone

from .forms import AuthenticationForm, RegistrationForm
from .models import UserProfile

def profile(request):
    return render(request, "accounts/profile.html")

def login(request, template_name='registration/login.html',
          redirect_field_name=REDIRECT_FIELD_NAME,
          authentication_form=AuthenticationForm,
          current_app=None, extra_context=None):
    return auth_login(request, template_name=template_name,
                      redirect_field_name=redirect_field_name,
                      authentication_form=authentication_form,
                      current_app=current_app,
                      extra_context=extra_context,)

def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            form.save(request)
            return render(request, "registration/new_user_email_confirm.html", dict(email=email))
    form = RegistrationForm()
    return render(request, "registration/new_user.html", dict(register_form=form))

def register_confirm(request, activation_key):
    if request.user.is_authenticated():
        HttpResponseRedirect("/accounts/profile")

    user_profile = get_object_or_404(UserProfile, activation_key=activation_key)
    if user_profile.key_expires < timezone.now():
        return render(request, "registration/new_user_confirm_expired.html", dict(user=user_profile.user))

    user = user_profile.user
    user.is_active = True
    user.key_expires = timezone.now()
    user.save()

    return render(request, "registration/new_user_confirm.html", dict(user=user))

