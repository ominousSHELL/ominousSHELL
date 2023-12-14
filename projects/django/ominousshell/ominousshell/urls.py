"""
URL configuration for ominousshell project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from homepage.views import home
from blog.views import blog, database_blog, blog_page
from notes.views import notes, database_notes, note_page
from cheatsheets.views import cheatsheets, database_cheatsheets, cheatsheet_page
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('blog/', blog),
    path('notes/', notes),
    path('cheatsheets/', cheatsheets),
    path('blogs/<str:category>/<int:blog_id>.html', blog_page),
    path('notes/<str:category>/<str:platform>/<int:note_id>.html', note_page),
    path('cheatsheets/<str:category>/<int:cheatsheet_id>.html', cheatsheet_page),
    path('database_blog/', database_blog),
    path('database_notes/', database_notes),
    path('database_cheatsheets/', database_cheatsheets)
]
