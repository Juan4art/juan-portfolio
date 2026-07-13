import fitz
doc = fitz.open('HATE-IT.pdf')
img_idx = 1
for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images(full=True)
    for img in image_list:
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        # Skip small images like logos/icons if there are any (e.g. less than 10KB)
        if len(image_bytes) < 10000:
            continue
        with open(f"public/images/HateIt_raw_{img_idx}.{image_ext}", "wb") as f:
            f.write(image_bytes)
        print(f"Extracted HateIt_raw_{img_idx}.{image_ext} from page {page_index+1}")
        img_idx += 1
