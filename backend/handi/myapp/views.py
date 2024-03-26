from django.shortcuts import render
from rest_framework import viewsets, routers
from .models import Spieler, Liga
from .serializers import SpielerSerializer, LigaSerializer

# Create your views here.
class SpielerViewSet(viewsets.ModelViewSet):
    queryset = Spieler.objects.all()
    serializer_class = SpielerSerializer

class LigaViewSet(viewsets.ModelViewSet):
    queryset = Liga.objects.all()
    serializer_class = LigaSerializer

router = routers.DefaultRouter()
router.register(r'spieler', SpielerViewSet)
router.register(r'liga', LigaViewSet)