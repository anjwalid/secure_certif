from stegano import extraire_message_depuis_image

def extraire_info_et_timestamp(image_path):
    """
    Extrait les informations personnelles et le timestamp à partir d'une image.
    
    :param image_path: Chemin de l'image contenant les données cachées.
    :return: Tuple (info_perso, resultat) où :
             - info_perso : str (la première ligne)
             - resultat : str (le reste du message, jusqu'à 20 lignes ou jusqu'à 'Extensions')
    """
    donnees_extraites = extraire_message_depuis_image(image_path)

    if not donnees_extraites:
        raise ValueError("Aucun message n'a été trouvé dans l'image.")

    lignes = donnees_extraites.splitlines()

    if not lignes:
        raise ValueError("Le message extrait est vide.")

    info_perso = lignes[0]
    resultat = []

    for ligne in lignes[1:]:
        resultat.append(ligne)
        if "Extensions" in ligne or len(resultat) >= 20:
            break

    return info_perso, "\n".join(resultat)

