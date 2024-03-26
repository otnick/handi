from django.db import models

class Spieler(models.Model):
    name = models.CharField(max_length=100)
    titel = models.IntegerField(default=0)
    auto = models.CharField(max_length=100)
    punkte = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Liga(models.Model):
    name = models.CharField(max_length=100)
    spieltage = models.IntegerField(default=0)
    spieler = models.ManyToManyField(Spieler)

    def __str__(self):
        return self.name