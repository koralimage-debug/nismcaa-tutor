#!/usr/bin/env python3
"""Derive Nismtutor web logo and icons from the authoritative PNG.

The source artwork is copied pixel-for-pixel. Icons are uniform-scaled
(no stretch) and padded so the gold ring is not clipped by square,
rounded, or maskable safe-zone crops.
"""
from pathlib import Path
import base64

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "brand" / "nismtutor-final-no-music.png"
BRAND = ROOT / "brand"


def bbox(im, amin=2, x_max=None):
    """Bounds of visible pixels. amin=2 keeps the gold glow and drops 1-bit noise."""
    px = im.load()
    w, h = im.size
    limit = w if x_max is None else min(w, x_max)
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(limit):
            r, g, b, a = px[x, y]
            if a >= amin and (r + g + b) > 30:
                if x < minx:
                    minx = x
                if y < miny:
                    miny = y
                if x > maxx:
                    maxx = x
                if y > maxy:
                    maxy = y
    if maxx < 0:
        raise SystemExit("no opaque artwork")
    return minx, miny, maxx, maxy


def crop(im, box, pad=8):
    w, h = im.size
    x0, y0, x1, y1 = box
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(w - 1, x1 + pad)
    y1 = min(h - 1, y1 + pad)
    return im.crop((x0, y0, x1 + 1, y1 + 1))


def fit_square(emblem, size, fill_ratio, bg):
    ew, eh = emblem.size
    target = max(1, int(round(size * fill_ratio)))
    scale = target / max(ew, eh)
    nw = max(1, int(round(ew * scale)))
    nh = max(1, int(round(eh * scale)))
    if max(nw, nh) > target:
        scale = (target - 1) / max(ew, eh)
        nw = max(1, int(round(ew * scale)))
        nh = max(1, int(round(eh * scale)))
    resized = emblem.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), bg)
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    return canvas, (nw / ew)


def main():
    im = Image.open(SRC).convert("RGBA")
    # Wordmark begins near x=654. Keep the emblem crop left of that gap.
    full_box = bbox(im, 2)
    logo = crop(im, full_box, pad=10)
    logo.save(BRAND / "nismtutor-logo.png", "PNG", optimize=True)

    emblem_box = bbox(im, 2, x_max=648)
    if emblem_box[2] >= 648:
        raise SystemExit("emblem crop reached the wordmark")
    emblem = crop(im, emblem_box, pad=6)
    emblem.save(BRAND / "nismtutor-mark.png", "PNG", optimize=True)

    white = (255, 255, 255, 255)
    # Fill leaves a margin so rounded favicons and home-screen masks do not cut the ring.
    any_icons = {
        16: (BRAND.parent / "favicon-16.png", 0.90),
        32: (BRAND.parent / "favicon-32.png", 0.82),
        180: (BRAND.parent / "apple-touch-icon.png", 0.82),
        192: (BRAND.parent / "icon-192.png", 0.82),
        512: (BRAND.parent / "icon-512.png", 0.82),
    }
    for size, (path, fill) in any_icons.items():
        icon, _ = fit_square(emblem, size, fill, white)
        icon.save(path, "PNG", optimize=True)

    # Maskable safe zone is the center 80%. Stay near 66% so the glow is inside it.
    for size, name in ((192, "icon-maskable-192.png"), (512, "icon-maskable-512.png")):
        icon, _ = fit_square(emblem, size, 0.66, white)
        icon.save(BRAND.parent / name, "PNG", optimize=True)

    ico_src, _ = fit_square(emblem, 256, 0.82, white)
    ico_src.save(
        BRAND.parent / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    # Opaque plate so a stale icon.svg request no longer shows the music-note mark.
    plate, _ = fit_square(emblem, 192, 0.82, white)
    import io

    buf = io.BytesIO()
    plate.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">'
        f'<image width="192" height="192" href="data:image/png;base64,{b64}"/>'
        "</svg>\n"
    )
    (BRAND.parent / "icon.svg").write_text(svg)
    print("logo", logo.size)
    print("emblem", emblem.size, "emblem_box", emblem_box)
    print("full_box", full_box)


if __name__ == "__main__":
    main()
