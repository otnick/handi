from django.shortcuts import render
from rest_framework import viewsets, routers
from .models import Spieler, Liga, Fischart, Fisch, Angler, Rekord
from .serializers import SpielerSerializer, LigaSerializer, FischartSerializer, FischSerializer, AnglerSerializer, RekordSerializer

# Create your views here.
class SpielerViewSet(viewsets.ModelViewSet):
    queryset = Spieler.objects.all()
    serializer_class = SpielerSerializer

class LigaViewSet(viewsets.ModelViewSet):
    queryset = Liga.objects.all()
    serializer_class = LigaSerializer

class FischartViewSet(viewsets.ModelViewSet):
    queryset = Fischart.objects.all()
    serializer_class = FischartSerializer

class FischViewSet(viewsets.ModelViewSet):
    queryset = Fisch.objects.all()
    serializer_class = FischSerializer

class AnglerViewSet(viewsets.ModelViewSet):
    queryset = Angler.objects.all()
    serializer_class = AnglerSerializer

class RekordViewSet(viewsets.ModelViewSet):
    queryset = Rekord.objects.all()
    serializer_class = RekordSerializer


router = routers.DefaultRouter()
router.register(r'spieler', SpielerViewSet)
router.register(r'liga', LigaViewSet)
router.register(r'fischart', FischartViewSet)
router.register(r'fisch', FischViewSet)
router.register(r'angler', AnglerViewSet)
router.register(r'rekord', RekordViewSet)
