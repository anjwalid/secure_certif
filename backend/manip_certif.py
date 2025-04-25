from PIL import Image, ImageDraw, ImageFont
import qrcode
import os
from time import sleep
def charger_police(path="fonts/PlayfairDisplay-Bold.ttf", taille=60):
    """Tente de charger une police élégante, sinon utilise Arial ou la police par défaut."""
    try:
        return ImageFont.truetype(path, taille)
    except:
        try:
            return ImageFont.truetype("arial.ttf", taille)
        except:
            return ImageFont.load_default()

def ajouter_texte_sur_certificat(fond_path, nom_prenom, certification, output_path="certificat_final.png"):
    """
    Ajoute un texte élégant (nom et certification) centré sur une image de certificat.
    """
    
    fond = Image.open(fond_path).convert("RGBA")
    largeur, hauteur = fond.size

    
    calque_texte = Image.new("RGBA", fond.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(calque_texte)

    
    texte = f"{nom_prenom}\n{certification}"
    font = charger_police(taille=60)

    # Taille du texte pour le centrer
    bbox = draw.textbbox((0, 0), texte, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    position = ((largeur - text_w) // 2, (hauteur - text_h) // 2)

    
    draw.multiline_text((position[0] + 2, position[1] + 2), texte, font=font, fill=(0, 0, 0, 80), align="center")

    
    draw.multiline_text(position, texte, font=font, fill=(0, 0, 0, 255), align="center")

    # Fusionner le texte avec le fond
    certificat_final = Image.alpha_composite(fond, calque_texte).convert("RGB")
    certificat_final.save(output_path, format="PNG")
    #certificat_final.save(output_path.pdf, format="PDF", resolution=100.0)
    #print(f"✅ Certificat généré : {output_path}")
def ajouter_qrcode(image_path, data, output_path="certificat_avec_qrcode.png"):
        """
        Ajoute un QR code contenant les données spécifiées sur une image.
        """
        # Générer le QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")

        # Charger l'image de fond
        image = Image.open(image_path).convert("RGBA")
        largeur, hauteur = image.size

        # Redimensionner le QR code
        qr_size = min(largeur, hauteur) // 6  # Taille du QR code (1/4 de l'image)
        qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)

        # Positionner le QR code (en bas à droite)
        position = (largeur - qr_size - 130, hauteur - qr_size - 100)  # 20px de marge
        image.paste(qr_img, position, qr_img)

        # Sauvegarder l'image finale
        image.save(output_path, format="PNG")

from PIL import Image

def extraire_qrcode(image_path, output_path="qrcode_extrait.png"):
    """
    Extrait le QR code d'une image (basé sur la même position et taille que celle utilisée lors de l'ajout).
    """
    # Charger l'image
    image = Image.open(image_path).convert("RGBA")
    largeur, hauteur = image.size

    # Recalculer la taille et la position du QR code (doit correspondre à l'ajout)
    qr_size = min(largeur, hauteur) // 6
    position = (largeur - qr_size - 130, hauteur - qr_size - 100)

    # Découper la zone du QR code
    box = (position[0], position[1], position[0] + qr_size, position[1] + qr_size)
    qr_crop = image.crop(box)

    # Sauvegarder ou retourner le QR extrait
    qr_crop.save(output_path, format="PNG")
    print(f"[✔] QR code extrait et sauvegardé sous : {output_path}")
    return qr_crop


if __name__ == "__main__":
    image_path = 'certificat_finalss.png'
    # extraire le QR code de l'image
    qr_image = extraire_qrcode(image_path, "qrcode_extrait.png")