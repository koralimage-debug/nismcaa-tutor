#!/usr/bin/env python3
"""Public agreement pages, footer links, and versioned I-agree checkboxes."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFT = "Draft v1.0, lawyer review pending"
PLACEHOLDERS = re.compile(r"\[X\]|\$\[minimum\]|\[minimum\]|\[Friday\]")
PAGES = [
    ROOT / "legal" / "tutor-agreement.html",
    ROOT / "legal" / "client-agreement.html",
    ROOT / "legal" / "standards.html",
]


class AgreementPageTests(unittest.TestCase):
    def test_pages_exist_and_show_draft_notice(self):
        for path in PAGES:
            self.assertTrue(path.is_file(), path)
            text = path.read_text()
            self.assertIn(DRAFT, text)
            self.assertIn("lawyer must review", text.lower())
            self.assertIsNone(PLACEHOLDERS.search(text), path.name)
            self.assertIn("tutor-agreement.html", text)
            self.assertIn("client-agreement.html", text)
            self.assertIn("standards.html", text)
            self.assertNotIn("ChatGPT", text)
            self.assertNotIn("GPT", text)

    def test_neutral_wording_used_for_fees_and_payouts(self):
        tutor = (ROOT / "legal" / "tutor-agreement.html").read_text()
        handbook = (ROOT / "legal" / "standards.html").read_text()
        self.assertIn("platform fee set out on the Teach page", tutor)
        self.assertIn("payout day set out on the Teach page", tutor)
        self.assertIn("minimum rate set out on the Teach page", handbook)
        self.assertIn("Effective date: to be confirmed at launch", tutor)

    def test_footers_and_sitemap_link_the_three_documents(self):
        for name in ("index.html", "teach.html"):
            text = (ROOT / name).read_text()
            for href in (
                "legal/tutor-agreement.html",
                "legal/client-agreement.html",
                "legal/standards.html",
            ):
                self.assertIn(href, text, name)
        sitemap = (ROOT / "sitemap.xml").read_text()
        for loc in (
            "https://tutor.nismcaa.com/legal/tutor-agreement.html",
            "https://tutor.nismcaa.com/legal/client-agreement.html",
            "https://tutor.nismcaa.com/legal/standards.html",
        ):
            self.assertIn(loc, sitemap)

    def test_live_js_requires_versioned_checkboxes(self):
        js = (ROOT / "live.js").read_text()
        self.assertIn("agreeTutor", js)
        self.assertIn("agreeClient", js)
        self.assertIn("agreeVersion", js)
        self.assertIn("legal/tutor-agreement.html", js)
        self.assertIn("legal/client-agreement.html", js)
        self.assertIn("legal/standards.html", js)
        self.assertIn(DRAFT, js)
        self.assertIn("I have read and agree to the", js)
        self.assertIn("Please agree to the NISMCAA Client Agreement before booking.", js)
        self.assertIn("agreements/accept", js)
        self.assertIn("needsTutor", js)
        self.assertIn("needsClient", js)
        self.assertNotIn("ChatGPT", js)
        self.assertNotIn("GPT", js)
        # Sample tutors stay unbookable
        self.assertIn("This is a sample listing so the site does not look empty. It cannot be booked.", js)


if __name__ == "__main__":
    unittest.main()
