import fitz
doc = fitz.open('HATE-IT.pdf')
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    pix.save(f'public/images/HateIt_{i+1}.png')
print(f"Extracted {len(doc)} pages")
