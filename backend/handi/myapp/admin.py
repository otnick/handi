from django.contrib import admin
from .models import Liga, Spieler, Fischart, Fisch, Angler, Rekord

# Register your models here.
admin.site.register(Liga)
admin.site.register(Spieler)
admin.site.register(Fischart)
admin.site.register(Fisch)
admin.site.register(Angler)
admin.site.register(Rekord)
