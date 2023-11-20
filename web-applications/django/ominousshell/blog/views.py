from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse
from blog.models import Blog
import mysql.connector
import json

def blog(request):
    context = {}
    return render(request, 'blog.html', context)

def blog_page(request, category, blog_id):
    context = {
        'category' : category,
        'blog_id': blog_id
    }
    return render(request, f'{category}/{blog_id}.html', context)

def database_blog(request):
    if request.GET.get("query"):
        queryset = []

        query = request.GET.get("query")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT * FROM blog_blog WHERE title LIKE '%{query}%' OR category LIKE '%{query}%' OR description LIKE '%{query}%'")
            columns = [col[0] for col in cursor.description]
            for row in cursor.fetchall():
                blog = dict(zip(columns, row))
                queryset.append(blog)

        blogs = json.dumps(queryset)
        return HttpResponse(blogs, content_type="application/json")

    if request.GET.get('blogs_counter'):
        blogs_counter = request.GET.get("blogs_counter")
        with connections["default"].cursor() as cursor:
            cursor.execute(f"SELECT COUNT(category) FROM blog_blog WHERE category='{blogs_counter}'")
            blogs_counters = cursor.fetchone()

        blogs_counters = blogs_counters[0]
        return HttpResponse(blogs_counters)
