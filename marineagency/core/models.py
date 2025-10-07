from django.db import models

# Removed: from django.core.exceptions import ValidationError


# --- 1. Hero Section (Simple Model, limited via Admin) ---
class HeroSection(models.Model):
    """
    Model for the main Hero Section, limited to a single record via Admin customization.
    (h1) -> title, (p) -> subtitle
    """

    title = models.CharField(
        max_length=255,
        verbose_name="Headline (H1)",
        help_text="The main headline for the website's hero section.",
    )
    subtitle = models.TextField(
        verbose_name="Subtext (P)",
        help_text="The descriptive paragraph below the main headline.",
    )

    def __str__(self):
        # We can still refer to it as 'Configuration' for clarity in the Admin
        return "Hero Section Configuration"

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"


# --- 2. About Section (Simple Model, limited via Admin) ---
class AboutSection(models.Model):
    """
    Model for the About section content and statistic counters, limited to a single record via Admin customization.
    """

    # Paragraphs
    first_paragraph = models.TextField(
        verbose_name="First Paragraph",
        help_text="The opening paragraph of the About section.",
    )
    second_paragraph = models.TextField(
        verbose_name="Second Paragraph",
        help_text="The follow-up paragraph of the About section.",
    )

    # Statistic Counters
    clients_number = models.PositiveIntegerField(
        verbose_name="Clients Number",
        default=0,
        help_text="The total number of clients served.",
    )
    vessels_number = models.PositiveIntegerField(
        verbose_name="Vessels Number",
        default=0,
        help_text="The total number of vessels listed or brokered.",
    )
    deals_number = models.PositiveIntegerField(
        verbose_name="Deals Number",
        default=0,
        help_text="The total number of successful deals closed.",
    )

    def __str__(self):
        return "About & Statistics Configuration"

    class Meta:
        verbose_name = "About Section & Stats"
        verbose_name_plural = "About Section & Stats"


# --- 3. Ship Section Configuration (Simple Model, limited via Admin) ---
class ShipSectionConfig(models.Model):
    """
    Holds the introductory paragraph for the 'Ships for Sale' section.
    """

    subtitle_paragraph = models.TextField(
        verbose_name="Section Subtitle Paragraph",
        help_text="The introductory text that appears under 'Ships for Sale'.",
    )

    def __str__(self):
        return "Ships Section Intro Configuration"

    class Meta:
        verbose_name = "Ships Section Intro"
        verbose_name_plural = "Ships Section Intro"


# --- 4. Ship Cards (Repeatable) ---
class Ship(models.Model):
    """
    Model for individual ship listings/cards. This model is not a singleton.
    """

    image = models.ImageField(
        upload_to="ships/",
        verbose_name="Ship Image",
        help_text="Upload a photo of the vessel. (e.g., cargo-vessel.avif)",
    )
    title = models.CharField(
        max_length=100,
        verbose_name="Vessel Type/Title",
        help_text="e.g., Cargo Vessels, Chemical Tanker, Offshore Rig",
    )
    subtitle = models.CharField(
        max_length=200,
        verbose_name="Card Description",
        help_text="e.g., 2010 built • 52k DWT • prompt delivery",
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name="Show in Carousel",
        help_text="If checked, this ship may be included in the homepage carousel.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Ship Listing"
        verbose_name_plural = "Ship Listings"
        ordering = ["-created_at"]


# --- 5. Contact Section (Simple Model, limited via Admin) ---
class ContactSection(models.Model):
    """
    Model for contact information, limited to a single record via Admin customization.
    """

    address = models.TextField(
        verbose_name="Physical Address",
        help_text="The company's full physical address.",
    )
    phone = models.CharField(
        max_length=50,
        verbose_name="Phone Number",
        help_text="The primary contact phone number.",
    )
    email = models.EmailField(
        verbose_name="Email Address", help_text="The primary contact email address."
    )
    # Using CharField for flexibility to represent strings like "Mon - Fri: 9am - 5pm"
    open_time_1 = models.CharField(
        max_length=100,
        verbose_name="Opening Time Line 1",
        help_text="e.g., 'Monday - Friday: 9:00 - 17:00'",
    )
    open_time_2 = models.CharField(
        max_length=100,
        verbose_name="Opening Time Line 2",
        help_text="e.g., 'Saturday: 10:00 - 14:00' or similar details.",
    )
    open_time_3 = models.CharField(
        max_length=100,
        verbose_name="Opening Time Line 3",
        help_text="Additional day/time details (e.g., 'Sunday: Closed').",
    )

    def __str__(self):
        return "Primary Contact Information Configuration"

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"


# --- Social Media Links (Singleton) ---
class SocialLink(models.Model):
    """
    Model for storing all social media links in a single record.
    """

    fb_link = models.URLField(
        verbose_name="Facebook URL",
        blank=True,
        help_text="Full URL to your Facebook page/profile.",
    )
    insta_link = models.URLField(
        verbose_name="Instagram URL",
        blank=True,
        help_text="Full URL to your Instagram profile.",
    )
    linkedin_link = models.URLField(
        verbose_name="LinkedIn URL",
        blank=True,
        help_text="Full URL to your LinkedIn profile.",
    )
    whatsapp_link = models.URLField(
        verbose_name="WhatsApp URL",
        blank=True,
        help_text="Full URL to your WhatsApp chat link (e.g., https://wa.me/123456789).",
    )

    def __str__(self):
        return "Social Links Configuration"

    class Meta:
        verbose_name = "Social Links"
        verbose_name_plural = "Social Links"
