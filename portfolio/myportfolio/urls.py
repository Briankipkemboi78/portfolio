from django.urls import path
from . import views



urlpatterns = [
    path('', views.main, name='main'),
    path('about/', views.about, name='about'),
    path('edit_about/', views.edit_about, name='edit_about'),
    #path('education/', views.education, name='education'),
    #path('projects/', views.projects, name='projects'),
    #path('contact/', views.contact, name='contact'),
]
