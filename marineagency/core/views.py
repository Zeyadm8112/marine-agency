from django.shortcuts import render
from .models import (
    HeroSection,
    AboutSection,
    ShipSectionConfig,
    Ship,
    ContactSection,
    SocialLink,
)


# Create your views here.
def home(request):
    context = {
        "hero": HeroSection.objects.first(),
        "about": AboutSection.objects.first(),
        "ship_intro": ShipSectionConfig.objects.first(),
        "featured_ships": Ship.objects.filter(is_featured=True),
        "all_ships": Ship.objects.all(),
        "contact": ContactSection.objects.first(),
        "social_links": SocialLink.objects.all(),
    }
    return render(request, "index.html", context)
