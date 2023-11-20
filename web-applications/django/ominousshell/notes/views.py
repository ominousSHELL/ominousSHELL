from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse
from notes.models import Notes
import mysql.connector
import json

def notes(request):
    context = {}
    return render(request, 'notes.html', context)

def note_page(request, category, platform, note_id):
    context = {
        'category' : category,
        'platform' : platform,
        'note_id': note_id
    }
    return render(request, f'{category}/{platform}/{note_id}.html', context)

def database_notes(request):
    if request.GET.get("query") and request.GET.get("platform"):
        queryset = []

        query = request.GET.get("query")
        platform  = request.GET.get("platform")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT * FROM notes_notes WHERE (machine LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%') AND platform='{platform}'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                note = dict(zip(columns, row))
                queryset.append(note)

        notes = json.dumps(queryset)
        return HttpResponse(notes, content_type="application/json")

    if request.GET.get('notes_counter'):
        notes_counter = request.GET.get("notes_counter")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM notes_notes WHERE category='{notes_counter}'")
            notes_counters = cursor.fetchone()

        notes_counters = notes_counters[0]
        return HttpResponse(notes_counters)

    if request.GET.get('platform_counter'):
        platform_counter = request.GET.get("platform_counter")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT COUNT(platform) FROM notes_notes WHERE platform='{platform_counter}'")
            platform_counters = cursor.fetchone()

        platform_counters = platform_counters[0]
        return HttpResponse(platform_counters)

