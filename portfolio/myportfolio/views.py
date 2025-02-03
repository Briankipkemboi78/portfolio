from django.shortcuts import render, redirect
from .models import Profile, Skill, Project
from .forms import ProfileForm, SkillForm, ProjectForm
from django.http import HttpResponseForbidden
from django.contrib.auth.decorators import login_required

@login_required
def main(request):
    return render(request, 'main.html')

@login_required
def about(request):
    profile = Profile.objects.get(user=request.user)
    topSkills = Skill.objects.filter(profile=profile, top_skill=True)
    otherSkills = Skill.objects.filter(profile=profile, top_skill=False)
    return render(request, 'about.html', {
        'profile': profile,
        'topSkills': topSkills,
        'otherSkills': otherSkills,
    })

@login_required
def edit_about(request):
    profile = Profile.objects.get(user=request.user)
    
    # Check if the logged-in user is the superuser (you)
    if not request.user.is_superuser:
        return HttpResponseForbidden("You are not authorized to edit this content.")
    
    skills = Skill.objects.filter(profile=profile)
    projects = Project.objects.filter(profile=profile)

    if request.method == 'POST':
        profile_form = ProfileForm(request.POST, instance=profile)
        if profile_form.is_valid():
            profile_form.save()

        for skill in skills:
            skill_form = SkillForm(request.POST, instance=skill)
            if skill_form.is_valid():
                skill_form.save()

        for project in projects:
            project_form = ProjectForm(request.POST, instance=project)
            if project_form.is_valid():
                project_form.save()

        return redirect('about')

    else:
        profile_form = ProfileForm(instance=profile)
        skill_forms = [SkillForm(instance=skill) for skill in skills]
        project_forms = [ProjectForm(instance=project) for project in projects]

    return render(request, 'edit_about.html', {
        'profile_form': profile_form,
        'skill_forms': skill_forms,
        'project_forms': project_forms,
    })
