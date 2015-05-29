import json
from django.core import serializers
from django.db import models

class AbstractBaseModel(models.Model):

    class Meta:
        abstract = True

class SerializeMixin(models.Model):

    def serialize(self, exclude=[]):
        if not exclude and hasattr(self, "SERIALIZE_EXCLUDE"):
            exclude = self.SERIALIZE_EXCLUDE
        j = json.loads(serializers.serialize("json", [self]))[0]
        j["fields"] = {x:y for x,y in j.get("fields").iteritems() if x not in exclude}
        return j

    class Meta:
        abstract = True
