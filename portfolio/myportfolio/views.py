from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView
from .models import *
from django.contrib.auth.decorators import user_passes_test
from .forms import AboutForm, ServiceForm, RecentWorkForm



class HomeTemplateView(TemplateView):
    template_name = 'home.html'

    # override get context date method
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)  # first, call super get context data
        context['about'] = About.objects.first()
        context['services'] = Service.objects.all()
        context['works'] = RecentWork.objects.all()
        return context
    
def is_superuser(user):
    return user.is_superuser

@user_passes_test(is_superuser)
def edit_about(request):
    about = About.objects.first()
    if request.method == 'POST':
        form = AboutForm(request.POST, request.FILES, instance=about)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = AboutForm(instance=about)
    return render(request, 'edit_about.html', {'form': form})

@user_passes_test(is_superuser)
def edit_service(request, service_id):
    service = get_object_or_404(Service, id=service_id)
    if request.method == 'POST':
        form = ServiceForm(request.POST, instance=service)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = ServiceForm(instance=service)
    return render(request, 'edit_service.html', {'form': form})

@user_passes_test(is_superuser)
def edit_work(request, work_id):
    work = get_object_or_404(RecentWork, id=work_id)
    if request.method == 'POST':
        form = RecentWorkForm(request.POST, request.FILES, instance=work)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = RecentWorkForm(instance=work)
    return render(request, 'edit_work.html', {'form': form})