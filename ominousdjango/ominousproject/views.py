from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse 
from ominousproject.models import Blog
from ominousproject.models import Notes
import mysql.connector
import json

database = mysql.connector.connect(
        host  = "localhost",
        user = "root",
        passwd = "anonymous",
        database = "ominousdb"
)


def project(request):
    context = {}

    return render(request, 'project.html', context)

def database_blog(request):
    if request.GET.get("query"):
        queryset = []

        query = request.GET.get("query")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT * FROM ominousproject_blog WHERE title LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                blog = dict(zip(columns, row))
                queryset.append(blog)

        blogs = json.dumps(queryset)
        return HttpResponse(blogs, content_type="application/json")

    if request.GET.get('blogs_counter'):
        blogs_counter = request.GET.get("blogs_counter")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM ominousproject_blog WHERE category='{blogs_counter}'")
            blogs_counters = cursor.fetchone()

        blogs_counters = blogs_counters[0]
        return HttpResponse(blogs_counters)

def database_notes(request):
    if request.GET.get("query") and request.GET.get("platform"):
        queryset = []

        query = request.GET.get("query")
        platform  = request.GET.get("platform")
        with database.cursor() as cursor:
            #import pdb;pdb.set_trace()
            cursor.execute(f"SELECT * FROM ominousproject_notes WHERE (machine LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%') AND platform='{platform}'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                note = dict(zip(columns, row))
                queryset.append(note)

        notes = json.dumps(queryset)
        return HttpResponse(notes, content_type="application/json")

    if request.GET.get('notes_counter'):
        notes_counter = request.GET.get("notes_counter")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM ominousproject_notes WHERE category='{notes_counter}'")
            notes_counters = cursor.fetchone()

        notes_counters = notes_counters[0]
        return HttpResponse(notes_counters)
