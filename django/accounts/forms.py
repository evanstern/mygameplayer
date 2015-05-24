import hashlib, datetime, random
from django import forms
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth.forms import (
    AuthenticationForm as BaseAuthenticationForm,
    UserCreationForm,
)
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.utils.translation import ugettext, ugettext_lazy as _
from django.forms import widgets, ModelForm
from django.template import loader

class AuthenticationForm(BaseAuthenticationForm):
    username = forms.CharField(label=_("Email"), widget=widgets.TextInput(attrs={
        "class": "form-control",
        "placeholder": "your@email.address",
    }), required=True,)
    password = forms.CharField(label=_("Password"), widget=widgets.PasswordInput(attrs={
        "class": "form-control",
        "placeholder": "Password",
    }), required=True,)

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(label=("Email (this will be your username)"), widget=widgets.TextInput(attrs={
        "class": "form-control",
        "placeholder": "your@email.address",
    }), required=True,)
    first_name = forms.CharField(label=_("First name"), widget=widgets.TextInput(attrs={
        "class": "form-control",
        "placeholder": "First name",
    }), required=True,)
    last_name = forms.CharField(label=_("Last name"), widget=widgets.TextInput(attrs={
        "class": "form-control",
        "placeholder": "Last name",
    }), required=True,)
    password1 = forms.CharField(label=_("Password"), widget=widgets.PasswordInput(attrs={
        "class": "form-control",
        "placeholder": "password",
    }), required=True,)
    password2 = forms.CharField(label=_("Password confirmation"), widget=widgets.PasswordInput(attrs={
        "class": "form-control",
        "placeholder": "Password confirmation",
    }), required=True,)

    def clean_email(self):
        User = get_user_model()
        email = self.cleaned_data["email"]
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError("duplicate email")

    def send_mail(self, context, from_email, to_email,
                  subject_template_name="registration/new_user_subject.txt",
                  email_template_name="registration/new_user_email.html",):
        subject = loader.render_to_string(subject_template_name, context)
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(email_template_name, context)
        email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])

        # TODO: send HTML email as well
#        html_email = loader.render_to_string(html_email_template_name, context)
#        email_message.attach_alternative(html_email, "text/html")

        email_message.send()

    def save(self, request, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        if commit:
            user.is_active = False
            user.save()
            email = user.email

            salt = hashlib.sha1(str(random.random())).hexdigest()[:5]
            activation_key = hashlib.sha1(salt+email).hexdigest()
            key_expires = datetime.datetime.today() + datetime.timedelta(2)

            user = get_user_model().objects.get(email__iexact=email)
            user.profile.activation_key = activation_key
            user.profile.key_expires = key_expires
            user.profile.save()

            context = {
                "user": user,
                "activation_key": activation_key,
                "site": get_current_site(request),
            }
            from_email = "no_reply@mygameplayer.com"

            self.send_mail(context, from_email, email)
        return user

    class Meta:
        model = get_user_model()
        fields = ["first_name", "last_name", "email", "password1", "password2"]




