from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
from ominousnotes.models import Notes
import mysql.connector
import json

database = mysql.connector.connect(
        host  = "localhost",
        user = "root",
        passwd = "anonymous",
        database = "ominousdb"
)

def notes(request):
    context = {}
    return render(request, 'notes.html', context)


def database_notes(request):
    if request.GET.get("query") and request.GET.get("platform"):
        queryset = []

        query = request.GET.get("query")
        platform  = request.GET.get("platform")
        with database.cursor() as cursor:
            #import pdb;pdb.set_trace()
            cursor.execute(f"SELECT * FROM ominousnotes_notes WHERE (machine LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%') AND platform='{platform}'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                note = dict(zip(columns, row))
                queryset.append(note)

        notes = json.dumps(queryset)
        return HttpResponse(notes, content_type="application/json")

    if request.GET.get('notes_counter'):
        notes_counter = request.GET.get("notes_counter")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM ominousnotes_notes WHERE category='{notes_counter}'")
            notes_counters = cursor.fetchone()

        notes_counters = notes_counters[0]
        return HttpResponse(notes_counters)

