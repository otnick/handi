from rest_framework import serializers
from .models import Spieler, Liga

class SpielerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spieler
        fields = '__all__'

class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = '__all__'