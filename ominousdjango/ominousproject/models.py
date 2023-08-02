from django.db import models

#Blog model
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

#Notes model
CATEGORIES = [
    ("Pwn", "Pwn"),
    ("Web", "Web"),
    ("Crypto", "Crypto"),
    ("Forensic", "Forensic"),
    ('Cloud', 'Cloud'),
    ("Miscelleneuos", "Miscelleneuos")
]

PLATFORMS = [
    ('Hackthebox', 'Hackthebox'),
    ('Tryhackme', 'Tryhackme'),
    ('Pico', 'Pico')
]
DIFFICULTIES = [
    ('Very Easy', 'Very Easy'),
    ('Easy', 'Easy'),
    ('Medium', 'Medium'),
    ('Hard', 'Hard'),
    ('Insane', 'Insane')
]

class Notes(models.Model):
    machine = models.CharField(max_length=60, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTIES)
    platform = models.CharField(max_length=20, choices=PLATFORMS)
    date = models.CharField(max_length=10)
    description = models.TextField(max_length=None)

    def __str__(self):
        return self.machine

    class Meta:
        verbose_name_plural = "Notes"
