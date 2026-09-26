"""Cassette favicon set, drawn from the header CassetteLogo."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

DARK = (53, 53, 53, 255)
CHARCOAL = (75, 75, 86, 255)
CREAM = (245, 240, 235, 255)
CORAL = (255, 185, 63, 255)
TEAL = (143, 226, 236, 255)
SILVER = (173, 173, 173, 255)
TEAL_BG = (143, 226, 236, 255)


def draw_cassette(size: int, angle: float, background: tuple[int, int, int, int]) -> Image.Image:
    scale = 4
    canvas = size * scale
    image = Image.new("RGBA", (canvas, canvas), background)
    draw = ImageDraw.Draw(image)
    s = canvas

    margin = int(s * 0.06)
    border = max(4, s // 18)
    draw.rounded_rectangle(
        [margin, margin, s - 1 - margin, s - 1 - margin],
        radius=int(s * 0.14),
        fill=CHARCOAL,
        outline=DARK,
        width=border,
    )
    draw.line(
        [int(s * 0.24), int(s * 0.22), int(s * 0.76), int(s * 0.22)],
        fill=(245, 240, 235, 90),
        width=max(2, s // 40),
    )

    window = max(3, s // 28)
    draw.rounded_rectangle(
        [int(s * 0.16), int(s * 0.30), int(s * 0.84), int(s * 0.76)],
        radius=int(s * 0.05),
        fill=CREAM,
        outline=DARK,
        width=window,
    )
    draw.rectangle(
        [int(s * 0.40), int(s * 0.48), int(s * 0.60), int(s * 0.58)],
        fill=CORAL,
    )

    def hub(cx: float, cy: float) -> None:
        radius = s * 0.13
        ring = max(3, s // 36)
        draw.ellipse(
            [cx - radius, cy - radius, cx + radius, cy + radius],
            fill=SILVER,
            outline=DARK,
            width=ring,
        )
        inner = radius * 0.62
        draw.ellipse(
            [cx - inner, cy - inner, cx + inner, cy + inner],
            fill=TEAL,
        )
        spoke_size = int(inner * 2.1)
        spoke = Image.new("RGBA", (spoke_size, spoke_size), (0, 0, 0, 0))
        spoke_draw = ImageDraw.Draw(spoke)
        thickness = max(3, spoke_size // 7)
        inset = int(spoke_size * 0.16)
        spoke_draw.line(
            [spoke_size / 2, inset, spoke_size / 2, spoke_size - inset],
            fill=DARK,
            width=thickness,
        )
        spoke = spoke.rotate(-angle, resample=Image.Resampling.BICUBIC)
        image.alpha_composite(
            spoke,
            (int(cx - spoke_size / 2), int(cy - spoke_size / 2)),
        )

    hub(s * 0.34, s * 0.53)
    hub(s * 0.66, s * 0.53)
    return image.resize((size, size), Image.Resampling.LANCZOS)


def to_gif_frame(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    color = Image.new("RGB", image.size, (0, 0, 0))
    color.paste(image, mask=alpha)
    palette = color.quantize(colors=255, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    transparent = Image.eval(alpha, lambda value: 255 if value <= 128 else 0)
    palette.paste(255, transparent)
    palette.info["transparency"] = 255
    return palette


def main() -> None:
    frames = [draw_cassette(64, index * 30, (0, 0, 0, 0)) for index in range(12)]
    gif_frames = [to_gif_frame(frame) for frame in frames]
    gif_frames[0].save(
        PUBLIC / "favicon.gif",
        save_all=True,
        append_images=gif_frames[1:],
        duration=90,
        loop=0,
        disposal=2,
        transparency=255,
        optimize=False,
    )

    icon = draw_cassette(48, 0, (0, 0, 0, 0))
    icon.save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    apple = draw_cassette(180, 0, TEAL_BG)
    apple.convert("RGB").save(PUBLIC / "apple-touch-icon.png", format="PNG")
    frames[0].save(ROOT / "favicon-preview.png", format="PNG")
    print("wrote favicon.gif, favicon.ico, apple-touch-icon.png")


if __name__ == "__main__":
    main()
