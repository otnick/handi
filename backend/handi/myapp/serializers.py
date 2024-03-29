from rest_framework import serializers
from .models import Spieler, Liga, Fischart, Fisch, Angler, Rekord

class SpielerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spieler
        fields = '__all__'

class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = '__all__'

class FischartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fischart
        fields = '__all__'

class FischSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fisch
        fields = '__all__'

class AnglerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Angler
        fields = '__all__'

class RekordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rekord
        fields = '__all__'