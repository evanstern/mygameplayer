from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site

from accounts.forms import AuthenticationForm

def index(request):
    site = get_current_site(request)
    return render(request, "mygameplayer/index.html", {"form": AuthenticationForm,
                                                       "site": site,})
