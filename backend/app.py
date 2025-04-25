from flask import Flask, request, send_file
import subprocess
import hashlib
import requests
import os
from manip_certif import ajouter_texte_sur_certificat, ajouter_qrcode
from signing_data import sign_data
from stegano import cacher_message_dans_image ,extraire_message_depuis_image
from traitemnt_cache import extraire_info_et_timestamp
app = Flask(__name__)
# ----------------------- route certification finalise -------------------
#----------------------------------------------------
@app.route('/certification', methods=['GET', 'POST'])
def certification():
    if request.method == 'POST':
        try:

            name = request.form['name']
            surname = request.form['surname']
            nom_prenom = f"{name} {surname}"
            intitule_certification = request.form['intitule_certification']
            info_block_without_64 = f"{name} | {surname} | {intitule_certification}"
            # Préparer le bloc d'info et le hasher
            info_block = f"{name} | {surname} | {intitule_certification}".ljust(64, ' ')
            info_block_bytes = info_block.encode('utf-8')
            # hash 
            sha256_hash = hashlib.sha256(info_block_bytes).digest()

            # fonction qui prend key prv dyl o kat sign hash (signature )
            sign_info = sign_data(sha256_hash)

            # Préparation des fichiers
            base_name = f"{name}_{surname}"
            file_txt = f"{base_name}.txt"
            file_tsq = f"{base_name}.tsq"
            file_tsr = f"{base_name}.tsr"
            file_tsr_txt = f"{base_name}_tsr.txt"

            with open(file_txt, "wb") as f:
                f.write(info_block_bytes)

            #  requête Timestamp
            subprocess.run([
                "openssl", "ts", "-query",
                "-data", file_txt,
                "-no_nonce", "-sha256",
                "-cert", "-out", file_tsq
            ], check=True)

            #  fichier TSQ (dyl request)
            with open(file_tsq, "rb") as tsq_file:
                tsq_data = tsq_file.read()

            # Envoi de la requête à TSA
            response = requests.post(
                "https://freetsa.org/tsr",
                data=tsq_data,
                headers={"Content-Type": "application/timestamp-query"}
            )

            if response.status_code != 200:
                raise Exception(f"[!] Échec de la requête TSA. Code HTTP : {response.status_code}")

            # Enregistrer la réponse  (binaire .tsr)
            with open(file_tsr, "wb") as tsr_file:
                tsr_file.write(response.content)

           
            with open(file_tsr_txt, "w", encoding="utf-8") as readable_out:
                subprocess.run([
                    "openssl", "ts", "-reply",
                    "-in", file_tsr,
                    "-text"
                ], stdout=readable_out, check=True)

            
            with open(file_tsr_txt, "r", encoding="utf-8") as f:
                tsr_readable_text = f.read()

            # just bach nchecki content wash byn !!!
            print("----- Contenu lisible du timestamp (TSR) -----")
            print(tsr_readable_text)
            print("------------------------------------------------")
           
            ajouter_texte_sur_certificat("images\\fond_attestation.png", nom_prenom, intitule_certification, output_path="certification_elegante.png")
            ajouter_qrcode("certification_elegante.png", sign_info, "certificat_avec_qrcode.png")
            #ajouter timestsamp + info_block 
            data_to_hide = f"{info_block_without_64} \n {tsr_readable_text}"
            cacher_message_dans_image("certificat_avec_qrcode.png", data_to_hide, "certificat_final.png")

            # Nettoyer les fichiers tmp utilise bach ngenerer request o nakhod response pour chaque certif !!!
            for filename in [file_txt, file_tsq, file_tsr, file_tsr_txt]:
                if os.path.exists(filename):
                    os.remove(filename)

            
            return send_file("certificat_final.png", mimetype='image/png', as_attachment=True)

        except Exception as e:
            return f"Une erreur est survenue : {e}", 500

    return "Méthode GET non autorisée", 405
# ----------------------- route dyl verification non teste + juste des tests  -------------------
#----------------------------------------------------
#---
@app.route('/verification', methods=['POST'])
def verification():
    if request.method == 'POST':
        try:
            # Récupérer le fichier image envoyé
            file = request.files['file']
            file_path = "certificat_extrait.png"
            file.save(file_path)
            information_block, message_cache = extraire_info_et_timestamp(file_path)
            # 
            # Vérifier si le message contient "Extensions"
            #subprocess.run(["openssl" ,"ts" "-verify", "-in" ,message_cache,  -queryfile file.tsq -CAfile cacert.pem -untrusted tsa.crt]) 

            # Afficher le message extrait
            print("Message extrait de l'image :")
            print(message_cache)

            # Nettoyer le fichier temporaire
            if os.path.exists(file_path):
                os.remove(file_path)

            return "Message extrait avec succès", 200

        except Exception as e:
            return f"Une erreur est survenue : {e}", 500

    return "Méthode GET non autorisée", 405

if __name__ == '__main__':
    app.run(debug=True, port=5000)
