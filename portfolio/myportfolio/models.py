from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    imageURL = models.URLField(blank=True, null=True)
    name = models.CharField(max_length=255)
    short_intro = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    bio = models.TextField()
    social_github = models.URLField(blank=True, null=True)
    social_linkedin = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Skill(models.Model):
    profile = models.ForeignKey(Profile, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    top_skill = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Project(models.Model):
    profile = models.ForeignKey(Profile, related_name="projects", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    imageURL = models.URLField(blank=True, null=True)
    description = models.TextField()
    tags = models.ManyToManyField('Tag', related_name="projects")

    def __str__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

