from django.db import models

CATEGORIES = [
    ("Linux", "Linux"),
    ("Windows", "Windows"),
    ("Security", "Security"),
    ("Software", "Software"),
    ("Networking", "Networking"),
    ("Miscelleneuos", "Miscelleneuos")
]

class Blog(models.Model):
    title = models.CharField(max_length=60, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    date = models.CharField(max_length=10)
    description = models.TextField(max_length=None)

    def __str__(self):
        return self.title
