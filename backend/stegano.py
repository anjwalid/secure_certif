from PIL import Image

def vers_8bit(c):
    return format(ord(c), '08b')

def modifier_pixel(pixel, bit):
    r = pixel[0]
    r = (r & ~1) | int(bit)  # remplace le bit de poids faible
    return (r,) + pixel[1:]

def cacher_message_dans_image(image_path, message, output_path):


    image = Image.open(image_path).convert("RGB")
    largeur, hauteur = image.size
    total_pixels = largeur * hauteur

    if total_pixels < 512:
        raise ValueError(f"L'image ne contient que {total_pixels} pixels, il en faut au moins 512.")

    pixels = image.load()
    message_binaire = ''.join(vers_8bit(c) for c in message)

    x = y = 0
    for bit in message_binaire:
        pixels[x, y] = modifier_pixel(pixels[x, y], bit)
        x += 1
        if x == largeur:
            x = 0
            y += 1

    image.save(output_path)
    print(f"✅ Message caché dans {output_path}")

def recuperer_bit_pfaible(pixel):
    return str(pixel[0] & 1)

def extraire_message_depuis_image(image_path):
    image = Image.open(image_path).convert("RGB")
    largeur, hauteur = image.size
    pixels = image.load()

    bits = ""
    x = y = 0
    while True:
        bits += recuperer_bit_pfaible(pixels[x, y])
        x += 1
        if x == largeur:
            x = 0
            y += 1
        if len(bits) % 8 == 0 and len(bits) >= 8:
            byte = bits[-8:]
            if chr(int(byte, 2)) == '\0':  # Fin du message détectée
                break

    message = ""
    for i in range(0, len(bits) - 8, 8):  # Exclure le caractère de fin
        byte = bits[i:i+8]
        message += chr(int(byte, 2))
    return message
def verifier_taille_image(nom_image):
    image = Image.open(nom_image)
    largeur, hauteur = image.size
    total_pixels = largeur * hauteur
    return total_pixels 
if __name__ == "__main__":
    # Exemple d'utilisation
    image_path = "certificationss.png"
    #identifier la taille de l'image et extraire le message 
    taille_image = verifier_taille_image(image_path)
    print(f"Taille de l'image : {taille_image} pixels")
    donnes_extrait = extraire_message_depuis_image(image_path)

    #recuperer la premiere ligne 
    donnes_extrait = donnes_extrait.split("\n")
    donnes_extrait = donnes_extrait[0]
    print(donnes_extrait)
    surname,name,certif = donnes_extrait.split("|")
    print("Nom:", name)
    print("Prenom:", surname)   
    print("Certificat:", certif)