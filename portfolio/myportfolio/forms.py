from django import forms
from .models import About, Service, RecentWork

class AboutForm(forms.ModelForm):
    class Meta:
        model = About
        fields = ['short_description', 'description', 'image']

class ServiceForm(forms.ModelForm):
    class Meta:
        model = Service
        fields = ['name', 'description']

class RecentWorkForm(forms.ModelForm):
    class Meta:
        model = RecentWork
        fields = ['title', 'image']
