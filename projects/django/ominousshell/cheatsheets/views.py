from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse
from blog.models import Blog
import mysql.connector
import json

def cheatsheets(request):
    context = {}
    return render(request, 'cheatsheets/cheatsheets.html', context)

def cheatsheet_page(request, category, cheatsheet_id):
    context = {
        'category' : category,
        'cheatsheet_id': cheatsheet_id
    }
    return render(request, f'cheatsheets/{category}/{cheatsheet_id}.html', context)

def database_cheatsheets(request):
    if request.GET.get("query"):
        queryset = []

        query = request.GET.get("query")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT * FROM cheatsheets_cheatsheets WHERE title LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                cheatsheet = dict(zip(columns, row))
                queryset.append(cheatsheet)

        cheatsheets = json.dumps(queryset)
        return HttpResponse(cheatsheets, content_type="application/json")

    if request.GET.get('cheatsheets_counter'):
        cheatsheets_counter = request.GET.get("cheatsheets_counter")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM cheatsheets_cheatsheets WHERE category='{cheatsheets_counter}'")
            cheatsheet_counters = cursor.fetchone()

        cheatsheet_counters = cheatsheet_counters[0]
        return HttpResponse(cheatsheet_counters)
