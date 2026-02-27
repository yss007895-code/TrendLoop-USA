from google import genai
import os
import json
import time
import subprocess
import traceback
import sys
import re
import tweepy
import shutil
import urllib.request
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
if sys.platform == "win32":
    load_dotenv(dotenv_path=r"C:\Users\yss00\.env")
else:
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "agents", ".env"))
    load_dotenv()  # also check local .env

# Initialize Clients (Vertex AI - fashion-money-maker credits)
gemini_client = genai.Client(vertexai=True, project="fashion-money-maker", location="us-central1")

GEMINI_MODEL = "gemini-3.1-pro"
IMAGE_MODEL = "gemini-3-pro-image"

# Auto-detect environment (Windows local vs Linux VM)
if sys.platform == "win32":
    WEB_ROOT = r"C:\Users\yss00\stylemedaily-web"
    PINS_FILE = r"C:\Users\yss00\pins.txt"
    ERROR_LOG = r"C:\Users\yss00\error_log.txt"
    TOPICS_FILE = r"C:\Users\yss00\generated_topics.txt"
    BACKUP_ROOT = r"C:\Users\yss00\backups"
else:
    WEB_ROOT = os.path.dirname(os.path.abspath(__file__))
    PINS_FILE = os.path.join(WEB_ROOT, "pins.txt")
    ERROR_LOG = os.path.join(WEB_ROOT, "error_log.txt")
    TOPICS_FILE = os.path.join(WEB_ROOT, "generated_topics.txt")
    BACKUP_ROOT = os.path.join(WEB_ROOT, "backups")

GUIDES_DIR = os.path.join(WEB_ROOT, "style-guides")
GUIDES_DATA_PATH = os.path.join(WEB_ROOT, "src", "lib", "guides-data.ts")

# Twitter Credentials
TWITTER_CONFIG = {
    "api_key": os.getenv("TWITTER_API_KEY"),
    "api_secret": os.getenv("TWITTER_API_SECRET"),
    "access_token": os.getenv("TWITTER_ACCESS_TOKEN"),
    "access_token_secret": os.getenv("TWITTER_ACCESS_TOKEN_SECRET")
}

def perform_backup():
    """Creates a timestamped backup of the project's critical files."""
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup_dir = os.path.join(BACKUP_ROOT, f"backup_{timestamp}")
    
    print(f"Creating backup in: {backup_dir}")
    try:
        os.makedirs(backup_dir, exist_ok=True)
        files_to_backup = [
            os.path.join(WEB_ROOT, "agent.py"),
            TOPICS_FILE,
            PINS_FILE,
            GUIDES_DATA_PATH,
        ]
        for file_path in files_to_backup:
            if os.path.exists(file_path):
                shutil.copy2(file_path, backup_dir)
        print("Backup completed successfully.")
        return True
    except Exception as e:
        print(f"Backup failed: {e}")
        return False

def post_to_twitter(title, slug):
    """Posts a new style guide announcement to Twitter."""
    print(f"Attempting to post to Twitter: {title}")
    try:
        twitter_client = tweepy.Client(
            consumer_key=TWITTER_CONFIG["api_key"],
            consumer_secret=TWITTER_CONFIG["api_secret"],
            access_token=TWITTER_CONFIG["access_token"],
            access_token_secret=TWITTER_CONFIG["access_token_secret"]
        )
        tweet_text = f"✨ New Style Guide: {title}\n\nCheck out the latest 2026 fashion trends on StyleMeDaily! 👗✨\n\nhttps://stylemedaily.com/guides/{slug}\n\n#FashionTrends #StyleInspo #2026Fashion"
        response = twitter_client.create_tweet(text=tweet_text)
        print(f"Successfully posted to Twitter: {response.data['id']}")
        return True
    except Exception as e:
        print(f"Twitter Posting failed: {e}")
        return False

# Target keywords for US MZ Women (2026 Trends)
MZ_AESTHETICS = [
    "coquette aesthetic 2026",
    "dark academia fashion",
    "coastal grandmother style",
    "mob wife aesthetic",
    "tech-integrated streetwear",
    "maximalist vintage revival",
    "balletcore essentials",
    "cottagecore spring outfits",
    "clean girl aesthetic 2026",
    "eclectic grandpa style",
    "office siren fashion",
    "indie sleaze revival",
    "soft girl aesthetic",
    "gorpcore for women"
]

def get_unused_keyword():
    """Reads used topics from file and returns a random unused keyword."""
    used_topics = []
    if os.path.exists(TOPICS_FILE):
        with open(TOPICS_FILE, "r", encoding="utf-8") as f:
            used_topics = [line.strip() for line in f.readlines() if line.strip()]
    unused = [k for k in MZ_AESTHETICS if k not in used_topics]
    if not unused:
        print("All predefined topics have been used. Resetting topic list.")
        with open(TOPICS_FILE, "w", encoding="utf-8") as f:
            f.write("")
        import random
        return random.choice(MZ_AESTHETICS)
    import random
    return random.choice(unused)

def mark_topic_as_used(keyword):
    """Appends the keyword to the generated_topics.txt file."""
    with open(TOPICS_FILE, "a", encoding="utf-8") as f:
        f.write(keyword + "\n")

# Verified fallback images (all confirmed 200 OK)
FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
]

def validate_image_url(url, timeout=10):
    """Verify image URL returns HTTP 200 via HEAD request."""
    if not url or not url.startswith("http"):
        return False
    try:
        req = urllib.request.Request(url, method="HEAD")
        req.add_header("User-Agent", "Mozilla/5.0 ImageValidator/1.0")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status == 200
    except Exception:
        return False

def get_valid_image_url(url):
    """Return url if valid, otherwise return a verified fallback."""
    if validate_image_url(url):
        return url
    print(f"Image URL failed validation: {url}")
    for fallback in FALLBACK_IMAGES:
        if validate_image_url(fallback):
            print(f"Using fallback: {fallback}")
            return fallback
    return FALLBACK_IMAGES[0]

def strip_markdown_fences(text):
    """Remove markdown code fences (```json ... ``` etc.) from Gemini responses."""
    stripped = re.sub(r'^```[\w]*\n?', '', text.strip())
    stripped = re.sub(r'\n?```$', '', stripped.strip())
    return stripped.strip()

def generate_blog_image(keyword, title):
    """Generate a blog hero image using Gemini image model."""
    print(f"Generating image for: {title} (Gemini {IMAGE_MODEL})")
    try:
        img_prompt = (
            f"Create a stylish, high-quality fashion blog hero image for '{keyword}'. "
            f"Title: '{title}'. Modern, clean aesthetic. No text overlay. "
            f"Photorealistic fashion photography style, soft lighting, 16:9 aspect ratio."
        )
        response = gemini_client.models.generate_content(
            model=IMAGE_MODEL,
            contents=img_prompt,
        )
        # Save image if binary data returned
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    img_dir = os.path.join(WEB_ROOT, "public", "images", "generated")
                    os.makedirs(img_dir, exist_ok=True)
                    slug = re.sub(r'[^a-z0-9]+', '-', keyword.lower()).strip('-')
                    img_filename = f"{datetime.now().strftime('%Y%m%d')}_{slug}.png"
                    img_path = os.path.join(img_dir, img_filename)
                    with open(img_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"Image saved: {img_path}")
                    return f"/images/generated/{img_filename}"
        print("No image data in response, using fallback")
    except Exception as e:
        print(f"Image generation failed: {e}")
    return get_valid_image_url(FALLBACK_IMAGES[0])


def generate_targeted_blog(keyword):
    """Generates blog post and Pinterest content via Gemini (Vertex AI)."""
    print(f"\nGenerating blog content for: {keyword} (Gemini)")

    blog_prompt = f"""
    You are a trend-obsessed fashion journalist who runs TrendLoop USA. You cover emerging trends before they go mainstream, with a sharp analytical eye. You attend fashion weeks and track social media virality. You are NOT an AI. Write like a cultural journalist who actually cares about fashion movements.

    Topic: {keyword}
    Site: TrendLoop USA
    Target: US trend-aware women ages 18-35 (TikTok, Instagram, Pinterest power users)

    === BANNED PHRASES (absolutely never use) ===
    - "In today's world", "In this article", "Let's dive in", "Let's dive into"
    - "It's important to note", "Whether you're a beginner or expert"
    - "In conclusion", "To sum up", "All in all"
    - "game-changer", "revolutionary", "cutting-edge"
    - "seamless", "leverage", "robust", "streamline"
    - "Look no further", "Without further ado"
    - "Are you looking for", "Have you ever wondered"
    - "Elevate your", "Take it to the next level"
    - "In the ever-evolving", "It's worth noting"
    - Starting any paragraph with "So," or "Well,"
    - NO emojis anywhere in the text
    - Maximum 2 exclamation marks (!) in the entire article

    === NATURAL WRITING STYLE ===
    - Mix sentence lengths randomly: short (5 words) and long (25 words)
    - Use journalistic tone with personality: "here's what's actually happening", "the data tells a different story", "I tracked this trend for 3 months"
    - Write like a cultural commentator: analyze WHY trends emerge, connect fashion to culture, reference real events
    - Use incomplete sentences occasionally: "The next big thing? Maybe." or "Oversaturated? Getting there."
    - Include contrarian takes: challenge mainstream opinions, point out when trends are overhyped
    - Every article intro MUST be unique - never repeat the same opening pattern
    - Keep paragraphs to 2-4 sentences max
    - Reference specific TikTok/IG moments, runway shows, celebrity style choices

    === HTML STRUCTURE (all required) ===
    1. <nav class="breadcrumb"> - Home > Category > Post Title
    2. <span class="reading-time"> - estimated read time (e.g. "6 min read")
    3. <div class="author-box"> - author "TrendLoop USA Editorial", bio mentioning trend analysis and fashion journalism, "Last Updated: {datetime.now().strftime('%B %Y')}", "Why Trust Us: We track trends from runway to street before they peak"
    4. <nav class="toc"> - Table of Contents with anchor links to each h2
    5. All <img> tags: descriptive alt text + <figcaption>
    6. 2-3 internal links (href="#related-trend" with descriptive anchor text)
    7. 1-2 external links to real sources (Vogue, Business of Fashion, WWD, Harper's Bazaar)
    8. Clean semantic HTML: article, section, h2, h3, figure, figcaption
    9. Inline CSS: editorial, magazine-style, mobile-friendly, system fonts, bold typography

    === SEO + E-E-A-T ===
    1. FAQ section at end: 3-4 real questions people actually Google about this topic
    2. <script type="application/ld+json"> with FAQPage schema
    3. Meta description: exactly 150-160 chars, compelling, contains "{keyword}"
    4. Use "{keyword}" naturally 3-5 times (never stuffed)
    5. H2 headings should contain related search terms
    6. Cite 1+ real fashion/culture source with link
    7. Include specific trend data: Google Trends numbers, social media metrics, runway appearances
    8. Show expertise: mention designers, collections, cultural movements driving the trend

    === CONTENT ===
    - Intro: Start with a cultural observation, a viral moment, or a bold trend prediction. NEVER generic.
    - Body: 3-4 sections analyzing the trend from different angles (origin, how to wear it, who's driving it, where it's going)
    - Products: "Get the Look" with 4-5 product recommendations (names + styling context, no links)
    - Closing: Strong prediction on this trend's trajectory - is it peaking, growing, or fading?

    Return ONLY a valid JSON object (no markdown fences):
    {{
        "blog_html": "full HTML content as described above",
        "blog_title": "catchy, SEO-friendly title",
        "meta": {{
            "category": "one of: street-style, runway, viral, seasonal, subculture, emerging",
            "description": "150-160 char meta description with keyword",
            "emoji": "single relevant emoji",
            "tag": "short tag like Trending or Viral",
            "canonical_slug": "url-friendly-slug"
        }}
    }}
    """

    blog_response = gemini_client.models.generate_content(
        model=GEMINI_MODEL,
        contents=blog_prompt
    )

    try:
        raw_text = strip_markdown_fences(blog_response.text)
        json_match = re.search(r'(\{.*\})', raw_text, re.DOTALL)
        data = json.loads(json_match.group(1)) if json_match else json.loads(raw_text)
    except Exception as e:
        print(f"Gemini JSON Parsing failed: {e}")
        raise e

    print(f"Generating Pinterest content for: {keyword} (Gemini)")
    pin_prompt = f"Create a viral Pinterest Pin content for the '{keyword}' aesthetic. Target: US Gen Z/Millennial women. Format: Title: (Catchy title), Description: (Under 450 chars, hashtags, end with 'Shop the look ->'). Return ONLY the text."
    pin_response = gemini_client.models.generate_content(
        model=GEMINI_MODEL,
        contents=pin_prompt
    )
    data['pin_content'] = strip_markdown_fences(pin_response.text)

    return data

def update_site_registry(slug, data):
    """Updates guides-data.ts with the new blog post entry."""
    print(f"Updating site registry: {GUIDES_DATA_PATH}")
    if not os.path.exists(GUIDES_DATA_PATH): return

    with open(GUIDES_DATA_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    new_entry = f"""  {{
    slug: '{slug}',
    title: '{data['blog_title']}',
    category: '{data['meta'].get('category', 'casual')}',
    description: '{data['meta'].get('description', '')}',
    readTime: '10 min',
    date: '{datetime.now().strftime('%Y-%m-%d')}',
    tag: '{data['meta'].get('tag', 'New')}',
    emoji: '{data['meta'].get('emoji', '✨')}',
    image: '{get_valid_image_url(data.get("image_url", FALLBACK_IMAGES[0]))}',
    affiliateProducts: [],
  }},
"""
    if "export const guides: StyleGuide[] = [" in content:
        updated_content = content.replace(
            "export const guides: StyleGuide[] = [",
            "export const guides: StyleGuide[] = [\n" + new_entry
        )
        with open(GUIDES_DATA_PATH, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print("Site registry updated.")

def save_and_push(data):
    """Saves content locally and pushes to GitHub."""
    slug = "".join([c for c in data['blog_title'] if c.isalnum() or c==' ']).rstrip().replace(' ', '-').lower()
    filename = f"{datetime.now().strftime('%Y%m%d')}_{slug.replace('-', '_')}.html"
    
    if not os.path.exists(GUIDES_DIR):
        os.makedirs(GUIDES_DIR, exist_ok=True)
    filepath = os.path.join(GUIDES_DIR, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(data['blog_html'])
    print(f"Blog saved to: {filepath}")

    update_site_registry(slug, data)

    with open(PINS_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n--- {datetime.now()} | {data.get('blog_title', 'No Title')} ---\n")
        f.write(data.get('pin_content', '') + "\n")

    os.chdir(WEB_ROOT)
    subprocess.run(["git", "pull", "--rebase", "origin", "main"], capture_output=True)
    subprocess.run(["git", "add", "."], check=True)
    
    status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout
    if status:
        subprocess.run(["git", "commit", "-m", f"Style Guide: {data['blog_title']}"], check=True)
        subprocess.run(["git", "push", "origin", "main"], capture_output=True)
        print(f"Successfully synced: {data['blog_title']}")

def run_workflow():
    """Main task execution."""
    perform_backup()
    keyword = get_unused_keyword()
    data = generate_targeted_blog(keyword)
    slug = "".join([c for c in data['blog_title'] if c.isalnum() or c==' ']).rstrip().replace(' ', '-').lower()
    # Generate hero image
    data['image_url'] = generate_blog_image(keyword, data['blog_title'])
    save_and_push(data)
    mark_topic_as_used(keyword)
    post_to_twitter(data['blog_title'], slug)

def main():
    attempts = 0
    while attempts < 3:
        try:
            run_workflow()
            print("\n=== All Tasks Completed Successfully ===")
            break
        except Exception:
            attempts += 1
            err = traceback.format_exc()
            print(f"\n[Error] Attempt {attempts}/3 failed.")
            print(err)
            time.sleep(5)

if __name__ == "__main__":
    main()
