"""Generate the app-owned launcher art, not another app's icon."""
from pathlib import Path
from PIL import Image,ImageDraw
im=Image.new('RGB',(256,256),(14,10,28));d=ImageDraw.Draw(im)
d.rounded_rectangle((57,37,188,208),radius=14,outline=(225,218,244),width=5)
d.line((82,81,160,81),fill=(179,155,231),width=6)
d.line((82,106,160,106),fill=(179,155,231),width=6)
d.line((82,131,142,131),fill=(179,155,231),width=6)
d.line((82,156,153,156),fill=(179,155,231),width=6)
d.ellipse((139,171,151,183),fill=(179,155,231))
d.line((146,179,166,190,187,172),fill=(179,155,231),width=4)
im.save(Path(__file__).resolve().parents[1]/'runtipi/metadata/logo.jpg',quality=94)
