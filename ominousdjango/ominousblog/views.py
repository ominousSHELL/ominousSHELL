from django.shortcuts import render
from django.db import connection
from django.http import HttpResponse
from ominousblog.models import Blog
import mysql.connector
import json

database = mysql.connector.connect(
        host  = "localhost",
        user = "root",
        passwd = "anonymous",
        database = "ominousdb"
)


def blog(request):
    context = {}
    return render(request, 'blog.html', context)

def database_blog(request):
    if request.GET.get("query"):
        queryset = []

        query = request.GET.get("query")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT * FROM ominousblog_blog WHERE title LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                blog = dict(zip(columns, row))
                queryset.append(blog)

        blogs = json.dumps(queryset)
        return HttpResponse(blogs, content_type="application/json")

    if request.GET.get('blogs_counter'):
        blogs_counter = request.GET.get("blogs_counter")
        with database.cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM ominousblog_blog WHERE category='{blogs_counter}'")
            blogs_counters = cursor.fetchone()

        blogs_counters = blogs_counters[0]
        return HttpResponse(blogs_counters)
