from django.contrib import admin
from unfold.admin import ModelAdmin  # Use Unfold's enhanced ModelAdmin

from django.contrib.auth.models import User, Group
from .models import (
    HeroSection,
    AboutSection,
    ShipSectionConfig,
    ContactSection,
    SocialLink,
    Ship,
)

# Unregister default User and Group
admin.site.unregister(User)
admin.site.unregister(Group)


# --- Custom Admin Class for Singleton Models ---
class SingletonAdmin(ModelAdmin):
    """
    Prevent adding more than one instance in the admin.
    """

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


# --- Register Limited (Singleton) Models ---
@admin.register(HeroSection)
class HeroSectionAdmin(SingletonAdmin):
    pass


@admin.register(AboutSection)
class AboutSectionAdmin(SingletonAdmin):
    pass


@admin.register(ShipSectionConfig)
class ShipSectionConfigAdmin(SingletonAdmin):
    pass


@admin.register(ContactSection)
class ContactSectionAdmin(SingletonAdmin):
    pass


# --- Register Repeatable Models ---
@admin.register(Ship)
class ShipAdmin(ModelAdmin):
    pass


@admin.register(SocialLink)
class SocialLinkAdmin(ModelAdmin):
    fieldsets = (
        (
            "Social Media Links",
            {"fields": ("fb_link", "insta_link", "linkedin_link", "whatsapp_link")},
        ),
    )
