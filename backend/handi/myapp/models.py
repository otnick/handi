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
    
class Fischart(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Fisch(models.Model):
    name = models.ForeignKey(Fischart, on_delete=models.CASCADE)
    laenge = models.IntegerField(default=0)
    ort = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Angler(models.Model):
    name = models.CharField(max_length=100)
    fische = models.ManyToManyField(Fisch)
    rekord = models.ForeignKey(Fisch, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
 
class Rekord(models.Model):
    fisch = models.ForeignKey(Fisch, on_delete=models.CASCADE)
    angler = models.ForeignKey(Angler, on_delete=models.CASCADE)

    def __str__(self):
        return self.fisch

    