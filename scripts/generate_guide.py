#!/usr/bin/env python3
"""
StyleMeDaily Auto Content Agent
Generates new fashion guides using Claude API for text and Imagen 4.0 Ultra for images.
"""

import anthropic
import json
import re
import subprocess
import sys
import os
from datetime import datetime
from pathlib import Path
from google import genai
from google.genai import types

# ── Paths ──────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
GUIDES_DATA = ROOT / "src" / "lib" / "guides-data.ts"
GUIDES_CONTENT = ROOT / "src" / "lib" / "guides-content-new.ts"
IMAGES_DIR = ROOT / "public" / "images" / "guides"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# ── Amazon affiliate URLs pool ─────────────────────────────────────────────
AMZN_URLS = [
    "https://amzn.to/4rVjOFg",
    "https://amzn.to/3ZCaw4S",
    "https://amzn.to/3Mro3JB",
    "https://amzn.to/3OhrhzW",
    "https://amzn.to/4anggFT",
    "https://amzn.to/4rfVnSQ",
    "https://amzn.to/4tH7kT9",
    "https://amzn.to/40drBCf",
    "https://amzn.to/4kNVNxy",
    "https://amzn.to/3Mro7cj",
    "https://amzn.to/4tEIRhl",
    "https://amzn.to/3OrVpsf",
    "https://amzn.to/4rUPDhk",
    "https://amzn.to/4qBF7dJ",
    "https://amzn.to/4tH7kT9",
]

def escape_ts(s: str) -> str:
    """Escape single quotes for TypeScript string literals."""
    return s.replace("\\", "\\\\").replace("'", "\\'")

def get_existing_slugs() -> list[str]:
    """Read existing guide slugs from guides-data.ts."""
    content = GUIDES_DATA.read_text(encoding="utf-8")
    return re.findall(r"slug:\s*'([^']+)'", content)

def generate_imagen_image(gemini_client, prompt: str, slug: str, suffix: str, aspect_ratio: str = "16:9") -> str:
    """Generate an image using Imagen 4 Ultra and save it locally."""
    print(f"🎨 Generating Imagen 4.0 Ultra image for: {prompt[:50]}...")
    model_name = "imagen-4.0-ultra-generate-001"
    
    try:
        response = gemini_client.models.generate_images(
            model=model_name,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                output_mime_type="image/jpeg",
                aspect_ratio=aspect_ratio,
            )
        )
        
        if response.generated_images:
            image_data = response.generated_images[0].image.image_bytes
            filename = f"{slug}-{suffix}.jpg"
            filepath = IMAGES_DIR / filename
            with open(filepath, "wb") as f:
                f.write(image_data)
            print(f"✅ Saved image to {filepath}")
            return f"/images/guides/{filename}"
        else:
            print("⚠️ No image returned from Imagen API.")
    except Exception as e:
        print(f"❌ Error generating image: {e}")
    
    return "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=400&fit=crop"

def generate_guide_json(client, existing_slugs: list[str]) -> dict:
    """Call Gemini API to generate a new unique fashion guide optimized for Amazon affiliates."""

    prompt = f"""You are an elite fashion content strategist for StyleMeDaily. Your goal is to drive massive organic traffic and maximize Amazon Affiliate conversions.

Generate ONE new SEO-optimized fashion guide. Return ONLY valid JSON, no other text.

EXISTING SLUGS (must NOT duplicate any of these):
{json.dumps(existing_slugs, indent=2)}

Use this EXACT JSON structure:
{{
  "slug": "unique-kebab-case-slug-2026",
  "title": "High-Click-Through SEO Title (Include Year if relevant)",
  "category": "workwear",
  "description": "SEO meta description under 155 characters designed to get clicks.",
  "readTime": "12 min",
  "date": "{datetime.now().strftime('%Y-%m-%d')}",
  "tag": "Guide",
  "emoji": "👗",
  "hero_image_prompt": "A detailed, photorealistic prompt for an AI image generator (Imagen 4) for the main cover image. Feature a high-fashion editorial look related to the topic. End the prompt with 'Typography text overlay reading StyleMeDaily'.",
  "affiliateProducts": [
    {{
      "name": "Specific Amazon Product Name (e.g. Levi's Ribcage Straight Ankle Jeans)",
      "price": "$XX",
      "url_index": 0,
      "tag": "Best Overall",
      "product_image_prompt": "A photorealistic product photography shot on a clean white background of [product name], studio lighting, e-commerce style, 4k."
    }}
  ],
  "content": [
    {{
      "heading": "Catchy Section Heading",
      "paragraphs": [
        "Highly engaging, expert fashion advice paragraph... (80+ words)",
        "Another paragraph that builds desire for the recommended styles..."
      ]
    }}
  ]
}}

RULES:
- category must be one of: workwear, casual, date-night, seasonal, body-type, budget, occasion
- tag must be one of: Guide, Product Review, Trending, Hot, Pillar Guide, Viral, Style Tips, Seasonal, Popular, Budget Picks
- Include exactly 4 affiliate products (use url_index 0 to {len(AMZN_URLS)-1}). Make the product names sound like real, highly-searched Amazon fashion items (e.g., 'Chunky Gold Hoop Earrings', 'Oversized Boyfriend Blazer').
- Include exactly 5 content sections, each with 2-3 detailed paragraphs (80+ words each). Write compelling copy that makes people want to buy the looks.
- slug must be unique and descriptive, not in existing list.
- MUST RETURN VALID JSON ONLY.

Pick a fresh, highly-searchable fashion topic. Ideas:
old money aesthetic on a budget, airport outfit ideas, what to wear to a spring wedding, 
capsule wardrobe for work, european summer outfits, how to style a blazer, minimalist wardrobe essentials."""

    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=prompt,
    )

    text = response.text
    # Extract JSON from response
    json_match = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    if json_match:
        return json.loads(json_match.group(1))
    json_match = re.search(r"\{[\s\S]*\}", text)
    if json_match:
        return json.loads(json_match.group())
    raise ValueError(f"No valid JSON in Gemini response:\n{text[:500]}")


def resolve_urls_and_generate_images(guide: dict, gemini_client) -> dict:
    """Generate images via Imagen 4 and resolve Amazon URLs."""
    slug = guide["slug"]
    
    # Generate hero image (16:9)
    hero_prompt = guide.pop("hero_image_prompt", f"High fashion editorial photography for {guide['title']}")
    guide["image"] = generate_imagen_image(gemini_client, hero_prompt, slug, "hero", "16:9")

    # Process products and generate 1:1 thumbnails
    for i, p in enumerate(guide["affiliateProducts"]):
        p["url"] = AMZN_URLS[p.get("url_index", 0) % len(AMZN_URLS)]
        p["brand"] = "Amazon"
        p.pop("url_index", None)
        
        prod_prompt = p.pop("product_image_prompt", f"Product photography on white background of {p['name']}")
        p["image"] = generate_imagen_image(gemini_client, prod_prompt, slug, f"prod{i}", "1:1")

    return guide


def format_guide_data_ts(guide: dict) -> str:
    """Format guide metadata as TypeScript object for guides-data.ts."""
    products_ts = ""
    for p in guide["affiliateProducts"]:
        tag_part = f", tag: '{escape_ts(p.get('tag', ''))}'" if p.get("tag") else ""
        image_part = f", image: '{p.get('image', '')}'" if p.get("image") else ""
        products_ts += (
            f"      {{ name: '{escape_ts(p['name'])}', brand: '{p['brand']}', "
            f"price: '{p['price']}', url: '{p['url']}'{tag_part}{image_part} }},\n"
        )

    return f"""  {{
    slug: '{guide['slug']}',
    title: '{escape_ts(guide['title'])}',
    category: '{guide['category']}',
    description: '{escape_ts(guide['description'])}',
    readTime: '{guide['readTime']}',
    date: '{guide['date']}',
    tag: '{guide['tag']}',
    emoji: '{guide['emoji']}',
    image: '{guide['image']}',
    affiliateProducts: [
{products_ts}    ],
  }},
"""


def format_guide_content_ts(guide: dict) -> str:
    """Format guide content as TypeScript for guides-content-new.ts."""
    sections_ts = ""
    for section in guide["content"]:
        paragraphs_ts = ", ".join(
            [f"'{escape_ts(p)}'" for p in section["paragraphs"]]
        )
        sections_ts += (
            f"  {{ heading: '{escape_ts(section['heading'])}', "
            f"paragraphs: [{paragraphs_ts}] }},\n"
        )

    return f"\n'{guide['slug']}': [\n{sections_ts}],\n"


def insert_guide_into_data_file(guide_ts: str):
    """Insert guide entry into guides-data.ts before the closing ];"""
    content = GUIDES_DATA.read_text(encoding="utf-8")
    marker = "];\n\nexport function getGuideBySlug"
    if marker not in content:
        raise ValueError("Could not find insertion point in guides-data.ts")
    updated = content.replace(marker, guide_ts + marker)
    GUIDES_DATA.write_text(updated, encoding="utf-8")


def insert_guide_into_content_file(content_ts: str):
    """Insert guide content into guides-content-new.ts before the closing };"""
    content = GUIDES_CONTENT.read_text(encoding="utf-8")
    marker = "\n};\n"
    if marker not in content:
        raise ValueError("Could not find insertion point in guides-content-new.ts")
    last_idx = content.rfind(marker)
    updated = content[:last_idx] + content_ts + content[last_idx:]
    GUIDES_CONTENT.write_text(updated, encoding="utf-8")


def git_commit_and_push(slug: str, title: str):
    """Commit and push the new guide."""
    subprocess.run(["git", "config", "user.email", "agent@stylemedaily.com"], check=True, cwd=ROOT)
    subprocess.run(["git", "config", "user.name", "StyleMeDaily Content Agent"], check=True, cwd=ROOT)
    subprocess.run(["git", "add", "."], check=True, cwd=ROOT)
    subprocess.run(
        ["git", "commit", "-m", f"feat: auto-generate guide '{title}' [{slug}] with Imagen 4"],
        check=True, cwd=ROOT,
    )
    subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=True, cwd=ROOT)
    subprocess.run(["git", "push", "origin", "main"], check=True, cwd=ROOT)
    print(f"✅ Committed and pushed: {slug}")


def main():
    print("🤖 StyleMeDaily Content Agent (Premium Edition) starting...")

    # Initialize clients
    gemini_client = genai.Client(vertexai=True, project="fashion-money-maker", location="us-central1")

    existing_slugs = get_existing_slugs()
    print(f"📚 Found {len(existing_slugs)} existing guides")

    print("✍️  Generating new SEO-optimized guide with Gemini 3.1 Pro...")
    guide_raw = generate_guide_json(gemini_client, existing_slugs)
    
    print("📸 Generating Amazon-style product & hero images with Imagen 4.0 Ultra...")
    guide = resolve_urls_and_generate_images(guide_raw, gemini_client)

    print(f"📝 Finalized: '{guide['title']}' [{guide['slug']}]")

    if guide["slug"] in existing_slugs:
        print(f"❌ Duplicate slug detected: {guide['slug']}. Aborting.")
        sys.exit(1)

    guide_data_ts = format_guide_data_ts(guide)
    guide_content_ts = format_guide_content_ts(guide)

    insert_guide_into_data_file(guide_data_ts)
    insert_guide_into_content_file(guide_content_ts)
    print("📂 Content files updated successfully")

    git_commit_and_push(guide["slug"], guide["title"])
    print("🚀 Premium guide is live!")


if __name__ == "__main__":
    main()
