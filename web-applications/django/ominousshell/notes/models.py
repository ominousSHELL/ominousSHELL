from django.db import models

CATEGORIES = [
    ("Pwn", "Pwn"),
    ("Hardware", "Hardware"),
    ("Crypto", "Crypto"),
    ("Reversing", "Reversing"),
    ('GamePwn', 'GamePwn'),
    ("Blockchain", "Blockchain"),
    ("Forensics", "Misc"),
    ("Mobile", "Mobile"),
    ("Web", "Web")
]

PLATFORMS = [
    ('HTB', 'HTB'),
    ('THM', 'THM')
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