#!/usr/bin/env python3
"""Build public legal pages from the agreement markdown, with placeholders neutralized."""
from __future__ import annotations

import re
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

DRAFT = "Draft v1.0, lawyer review pending"

PAGES = [
    {
        "src": "tutor-agreement.md",
        "out": "tutor-agreement.html",
        "title": "NISMCAA Tutor Agreement",
        "nav": "tutor",
    },
    {
        "src": "client-agreement.md",
        "out": "client-agreement.html",
        "title": "NISMCAA Client Agreement",
        "nav": "client",
    },
    {
        "src": "standards.md",
        "out": "standards.html",
        "title": "NISMCAA Tutor Standards and Procedures",
        "nav": "standards",
    },
]


def neutralize(text: str) -> str:
    """Replace [bracket] fee / rate / payout placeholders with neutral public wording."""
    replacements = [
        (
            "a platform fee of **[X]%** of each lesson price",
            "the platform fee set out on the Teach page",
        ),
        (
            "the lesson price minus [X]%",
            "the lesson price minus the platform fee set out on the Teach page",
        ),
        (
            "NISMCAA's share of each lesson price: **[X]%**.",
            "NISMCAA's share of each lesson price is the platform fee set out on the Teach page.",
        ),
        (
            "NISMCAA keeps **[X]%** of each lesson price",
            "NISMCAA keeps the platform fee set out on the Teach page",
        ),
        (
            "minus the **[X]%** platform fee",
            "minus the platform fee set out on the Teach page",
        ),
        (
            "NISMCAA keeps **[X]%**.",
            "NISMCAA keeps the platform fee set out on the Teach page.",
        ),
        (
            "paid **weekly, every [Friday]**",
            "paid weekly, on the payout day set out on the Teach page",
        ),
        (
            "Payouts are sent **weekly, every [Friday]**",
            "Payouts are sent weekly, on the payout day set out on the Teach page",
        ),
        (
            "weekly payout every **[Friday]**",
            "weekly payout on the payout day set out on the Teach page",
        ),
        (
            "go out every **[Friday]**",
            "go out on the weekly payout day set out on the Teach page",
        ),
        (
            "$[minimum] per 30 minutes (to be set by NISMCAA)",
            "the minimum rate set out on the Teach page, per 30 minutes",
        ),
        (
            "Effective date: January 1, 2027 (placeholder, to be confirmed at launch)",
            "Effective date: to be confirmed at launch",
        ),
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    leftover = re.findall(r"\[X\]|\$\[minimum\]|\[minimum\]|\[Friday\]", text)
    if leftover:
        raise SystemExit("Unreplaced placeholders: " + ", ".join(sorted(set(leftover))))
    return text


def strip_impl_notes(text: str) -> str:
    """Drop the machine-facing checkbox / recording notes from the public page."""
    text = re.sub(
        r"\n---\n\n### (Sign-up|Booking) checkbox[\s\S]*$",
        "\n",
        text,
    )
    return text


def md_to_html(text: str) -> str:
    return markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "sane_lists", "nl2br"],
    )


CSS = """
:root{--go:#ff6b4a;--navy:#16264a;--sun:#ffd34d;--teal:#00897f;--plum:#7a4bd1;--cream:#fff4ec;--muted:#5a6478;--line:#ece2da}
*{box-sizing:border-box}html,body{margin:0;background:var(--cream);color:var(--navy);font-family:'DM Sans',Arial,sans-serif;line-height:1.6}
h1,h2,h3,h4{font-family:Manrope,Arial,sans-serif;margin:1.2em 0 .4em;line-height:1.25}h1{font-size:1.7rem;margin-top:0}h2{font-size:1.2rem}h3{font-size:1.05rem}
a{color:var(--teal)}:focus-visible{outline:3px solid var(--sun);outline-offset:2px}
.prev{background:var(--sun);text-align:center;font-weight:700;font-size:.78rem;padding:5px;color:var(--navy)}
.nh{background:#182947;color:#fff}.nh .in{max-width:800px;margin:auto;padding:12px 18px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.nh .brand{display:flex;align-items:center;flex:0 0 auto;background:#fff;border-radius:16px;padding:4px 12px 4px 6px;line-height:0;text-decoration:none;box-shadow:0 0 0 2px #e0b84a}
.nh .brand img{height:48px;width:auto;display:block}
.nh nav{margin-left:auto;display:flex;gap:4px;flex-wrap:wrap}
.nh nav a{color:#fff;text-decoration:none;padding:10px;min-height:44px;display:inline-flex;align-items:center;border-radius:10px;font-weight:700;font-size:.9rem}
.nh nav a.on{background:#ffdb67;color:#182947}
.back{display:inline-flex;align-items:center;min-height:44px;color:#ffdb67!important}
.w{max-width:800px;margin:auto;padding:20px 18px 40px}
.draft{background:#fff6d6;border:2px dashed #e0b400;border-radius:14px;padding:12px 16px;margin:0 0 18px;font-weight:700}
.draft .sub{display:block;font-weight:500;color:var(--muted);margin-top:4px}
.legal{background:#fff;border:1px solid var(--line);border-radius:20px;padding:22px 22px 32px}
.legal p{margin:.7em 0}.legal ul,.legal ol{margin:.5em 0 .8em;padding-left:1.3em}
.legal li{margin:.25em 0}.legal blockquote{margin:1em 0;padding:10px 14px;background:#efe6ff;border-left:6px solid var(--plum);border-radius:12px}
.legal table{width:100%;border-collapse:collapse;font-size:.92rem;margin:1em 0;overflow-x:auto;display:block}
.legal th,.legal td{text-align:left;padding:8px;border-bottom:1px solid var(--line);vertical-align:top}
.legal th{background:var(--cream)}
.legal hr{border:0;border-top:1px solid var(--line);margin:1.6em 0}
.links{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.links a{display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border-radius:14px;background:#fff;border:1px solid var(--line);color:var(--navy);text-decoration:none;font-weight:700;font-size:.9rem}
.links a.on{background:var(--navy);color:var(--sun);border-color:var(--navy)}
.nf{background:#182947;color:#b8c7df;text-align:center;padding:24px 16px;font-size:.88rem}
.nf a{color:#ffdb67;display:inline-flex;min-height:44px;align-items:center;padding:0 4px}
@media(max-width:760px){.nh nav{margin-left:0}.nh .brand img{height:40px}.legal{padding:16px}}
@media print{.prev,.nh nav,.nf{display:none}.legal{border:0}}
"""


def page(title: str, nav: str, body: str) -> str:
    def link(key: str, href: str, label: str) -> str:
        cls = ' class="on"' if key == nav else ""
        return f'<a href="{href}"{cls}>{label}</a>'

    links = (
        link("tutor", "tutor-agreement.html", "Tutor Agreement")
        + link("client", "client-agreement.html", "Client Agreement")
        + link("standards", "standards.html", "Standards and Procedures")
        + '<a href="../teach.html">Teach / pricing</a>'
    )
    nav_on = {
        "tutor": "",
        "client": "",
        "standards": "",
    }
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} · NISMCAA Tutor</title>
<meta name="description" content="{title} for NISMCAA Tutor. {DRAFT}.">
<meta name="theme-color" content="#ff6b4a">
<link rel="icon" href="../favicon.ico?v=3" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32.png?v=3">
<link rel="apple-touch-icon" href="../apple-touch-icon.png?v=3">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="prev">Payments are in TEST MODE only: no real money moves.</div>
<header class="nh"><div class="in"><a class="brand" href="../"><img src="../brand/nismtutor-logo.png?v=3" alt="Nismtutor" width="2151" height="640"></a>
<nav aria-label="NISMCAA"><a class="back" href="https://nismcaa.com/">← Back to NISMCAA</a><a href="../">NISMCAA Tutor</a><a href="../teach.html">Teach</a></nav></div></header>
<main class="w">
<p class="draft">{DRAFT}.<span class="sub">This is a plain-language draft and is not legal advice. A qualified lawyer must review it before it is used.</span></p>
<nav class="links" aria-label="Agreements">{links}</nav>
<article class="legal">
{body}
</article>
<nav class="links" aria-label="Agreements">{links}</nav>
</main>
<footer class="nf">© NISMCAA · NISMCAA Tutor · <a href="https://tutor.nismcaa.com/">tutor.nismcaa.com</a><br>
<a href="tutor-agreement.html">Tutor Agreement</a> · <a href="client-agreement.html">Client Agreement</a> · <a href="standards.html">Standards and Procedures</a><br>
Tutoring: <a href="mailto:tutor@nismcaa.com">tutor@nismcaa.com</a> · <a href="https://nismcaa.com/">← Back to NISMCAA</a></footer>
</body></html>
"""


def main() -> None:
    for item in PAGES:
        raw = (SRC / item["src"]).read_text()
        raw = neutralize(raw)
        raw = strip_impl_notes(raw)
        html = page(item["title"], item["nav"], md_to_html(raw))
        dest = ROOT / item["out"]
        dest.write_text(html)
        print("wrote", dest, "bytes", dest.stat().st_size)


if __name__ == "__main__":
    main()
