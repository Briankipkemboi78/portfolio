from django import forms
from .models import Profile, Skill, Project

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'short_intro', 'location', 'bio', 'social_github', 'social_linkedin', 'imageURL']

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['name', 'description', 'top_skill']

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'imageURL', 'description', 'tags']
