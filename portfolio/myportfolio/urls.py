from django.urls import path
from .views import HomeTemplateView, edit_about, edit_service, edit_work

urlpatterns = [
    path('', HomeTemplateView.as_view(), name='home'),
    path('edit-about/', edit_about, name='edit_about'),
    path('edit-service/<int:service_id>/', edit_service, name='edit_service'),
    path('edit-work/<int:work_id>/', edit_work, name='edit_work'),
]