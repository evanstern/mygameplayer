from .default import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'mygameplayer_dev',
        'USER': 'evan',
        'PASSWORD': 'r2c3p0d2',
    }
}

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE_CLASSES += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

DEBUG_TOOLBAR_PATCH_SETTINGS = False

INTERNAL_IPS += [
    '127.0.0.1',
]

DEBUG = True
TEMPLATE_DEBUG = True
