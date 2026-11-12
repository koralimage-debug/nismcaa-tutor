#!/usr/bin/env python3
"""Branding checks: exact logo crop, unclipped icons, no music-note mark, preserved wiring."""
import json
import re
import unittest
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "brand" / "nismtutor-final-no-music.png"


def ink_box(im, alpha=8):
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < alpha:
                continue
            if r > 248 and g > 248 and b > 248:
                continue
            if x < minx:
                minx = x
            if y < miny:
                miny = y
            if x > maxx:
                maxx = x
            if y > maxy:
                maxy = y
    return minx, miny, maxx, maxy


class BrandingTests(unittest.TestCase):
    def test_logo_is_pixel_exact_crop(self):
        src = Image.open(SRC).convert("RGBA")
        logo = Image.open(ROOT / "brand" / "nismtutor-logo.png").convert("RGBA")
        # Visible bounds used by scripts/build_brand_icons.py, plus the 10px pad.
        box = (8, 44, 2159, 684)  # right/bottom exclusive
        cropped = src.crop(box)
        self.assertEqual(logo.size, cropped.size)
        self.assertEqual(logo.tobytes(), cropped.tobytes())
        # Uniform scale only: crop aspect matches the source artwork, not a stretch.
        self.assertAlmostEqual(logo.size[0] / logo.size[1], cropped.size[0] / cropped.size[1], places=5)

    def test_emblem_does_not_include_wordmark(self):
        mark = Image.open(ROOT / "brand" / "nismtutor-mark.png").convert("RGBA")
        self.assertLess(mark.size[0], 800)
        self.assertAlmostEqual(mark.size[0] / mark.size[1], 624 / 632, places=3)

    def test_icons_keep_aspect_and_padding(self):
        mark = Image.open(ROOT / "brand" / "nismtutor-mark.png").convert("RGBA")
        mx0, my0, mx1, my1 = ink_box(mark, alpha=2)
        ratio = (mx1 - mx0 + 1) / (my1 - my0 + 1)
        any_icons = {
            "favicon-16.png": 1,
            "favicon-32.png": 2,
            "apple-touch-icon.png": 8,
            "icon-192.png": 12,
            "icon-512.png": 32,
        }
        for name, min_margin in any_icons.items():
            im = Image.open(ROOT / name).convert("RGBA")
            self.assertEqual(im.size[0], im.size[1], name)
            x0, y0, x1, y1 = ink_box(im)
            self.assertGreaterEqual(x0, min_margin, name)
            self.assertGreaterEqual(y0, min_margin, name)
            self.assertGreaterEqual(im.size[0] - 1 - x1, min_margin, name)
            self.assertGreaterEqual(im.size[1] - 1 - y1, min_margin, name)
            got = (x1 - x0 + 1) / (y1 - y0 + 1)
            self.assertAlmostEqual(got, ratio, delta=0.04, msg=name)
        for name in ("icon-maskable-192.png", "icon-maskable-512.png"):
            im = Image.open(ROOT / name).convert("RGBA")
            x0, y0, x1, y1 = ink_box(im)
            # Android maskable safe zone is the center 80%.
            safe = int(im.size[0] * 0.10)
            self.assertGreaterEqual(x0, safe, name)
            self.assertGreaterEqual(y0, safe, name)
            self.assertGreaterEqual(im.size[0] - 1 - x1, safe, name)
            self.assertGreaterEqual(im.size[1] - 1 - y1, safe, name)

    def test_old_music_note_logo_is_gone(self):
        svg = (ROOT / "icon.svg").read_text()
        self.assertNotIn("M170 210h172", svg)
        self.assertIn("data:image/png;base64,", svg)
        for rel in ("index.html", "teach.html", "conference/index.html"):
            html = (ROOT / rel).read_text()
            header = re.search(r"<header class=\"nh\">.*?</header>", html, re.S).group(0)
            self.assertNotIn("♪", header, rel)
            self.assertNotIn("icon.svg", header, rel)
            self.assertIn("nismtutor-logo.png?v=3", header, rel)
            self.assertNotIn("MUSIC ACADEMY", header, rel)
        self.assertNotIn('src="icon.svg"', (ROOT / "index.html").read_text())

    def test_manifest_and_service_worker(self):
        manifest = json.loads((ROOT / "manifest.webmanifest").read_text())
        self.assertEqual(manifest["name"], "Nismtutor")
        self.assertEqual(manifest["short_name"], "Nismtutor")
        self.assertEqual(manifest["theme_color"], "#ff6b4a")
        srcs = {i["src"] for i in manifest["icons"]}
        self.assertIn("icon-192.png", srcs)
        self.assertIn("icon-512.png", srcs)
        self.assertIn("icon-maskable-512.png", srcs)
        purposes = {i.get("purpose") for i in manifest["icons"]}
        self.assertIn("maskable", purposes)
        self.assertIn("any", purposes)
        sw = (ROOT / "sw.js").read_text()
        self.assertIn("nismcaa-tutor-v4", sw)
        self.assertNotIn("nismcaa-tutor-v1", sw)
        self.assertIn("caches.delete", sw)
        self.assertIn("brand/nismtutor-logo.png", sw)
        self.assertIn("cache: 'reload'", sw)

    def test_preserved_product_wiring(self):
        index = (ROOT / "index.html").read_text()
        live = (ROOT / "live.js").read_text()
        cert = (ROOT / "cert" / "index.html").read_text()
        conf = (ROOT / "conference" / "index.html").read_text()
        self.assertEqual((ROOT / "CNAME").read_text().strip(), "tutor.nismcaa.com")
        self.assertIn("Payments are in TEST MODE only: no real money moves.", index)
        self.assertNotIn("noindex", index.split("<body")[0])
        self.assertNotIn("Preview only", index)
        self.assertIn("geo.js?v=4", index)
        self.assertIn("mailto:tutor@nismcaa.com", index)
        self.assertIn("mailto:info@nismcaa.com", index)
        self.assertIn("https://academy.nismcaa.com/", index)
        self.assertIn("https://nismcaa.com/", index)
        self.assertIn("https://nismcaa-payments.onrender.com", live)
        self.assertIn("https://nismcaa-payments.onrender.com", cert)
        self.assertIn("https://nismcaa-payments.onrender.com", conf)
        self.assertIn("live.js?v=4", index)
        self.assertIn("Learn with certified tutors", index)


if __name__ == "__main__":
    unittest.main()
