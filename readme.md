# 🎓 Secure Certifications Generated

> Plateforme web sécurisée pour la génération et la vérification d’attestations électroniques, incluant signature numérique, QR Code, stéganographie et horodatage.

---

## 📌 Contexte

Projet réalisé dans le cadre de module sec et dev , basé sur un scénario proposé par CertifPlus, autorité de certification fictive.  
L’objectif est de garantir l’authenticité des attestations électroniques grâce à :
- des informations visibles : nom, certification, QR Code signé ;
- des informations dissimulées : nom, certification, timestamp via stéganographie ;
- la vérification sécurisée de l’attestation par les employeurs.

---

## ⚙️ Stack technique

### 🔹 Backend
- `Flask` (au lieu de Bottle, pour plus de flexibilité)
- Signature numérique via certificats EC (Elliptic Curve)
- Intégration d'un tiers de confiance : `FreeTSA` pour l'horodatage
- Bibliothèques : `qrcode`, `Pillow`, `opencv`, `zbarlight`......

### 🔹 Frontend
- `React.js` + `Next.js` + `TypeScript`
- Formulaires sécurisés pour soumettre les données de certification
- Affichage responsive des résultats
- Appels à l’API Flask pour la création et la vérification

---

## 🔐 Fonctionnalités

- ✅ Génération d’attestations signées (image PNG)
- ✅ Insertion d’informations via stéganographie
- ✅ Intégration d’un QR Code contenant la signature
- ✅ Vérification de l’authenticité avec extraction + validation
- ✅ Communication sécurisée via TLS (avec `socat` en reverse proxy)

---

## 🔜 Tâches restantes

- 🔄 **Vérification complète des routes de verification**
- 🔗 **Fusionner le backend Flask(api) avec les composants du frontend React**
-  **Connexion TLS via socat (reverse proxy sécurisé)**

---

## 🚀 Lancer le projet

### Backend (Flask)

```bash
cd backend/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```

### Frontend (Next.js)

```bash
cd frontend/
npm install
npm run dev
```

### Connexion TLS via socat (reverse proxy sécurisé) (# A venir !!!)

```bash
socat \
openssl-listen:9000,fork,cert=bundle_serveur.pem,cafile=ecc.ca.cert.pem,verify=0 \
tcp:127.0.0.1:8080
```

---

## 🖼 Exemple de résultat

Une attestation est délivrée sous forme d’image `.png`, contenant :
- Le **nom** et l’**intitulé de certification**
- Un **QR Code** (signature ASCII)
- Des **données dissimulées** (nom, certification, timestamp signé)

---

## 📂 Structure du projet

```text
secure_certifications_generated/
├── backend/
│   ├── app.py
│   ├── stegano.py
│   ├── .........
│   └── cert.../
├── frontend/
│   ├── pages/
│   ├── components/
│   └── ...
└── README.md
```

---

## 👥 Auteurs

- Walid anejjar — [GitHub](https://github.com/anjwalid)
- Nizar Bahajoub - [GitHub](https://github.com/Nizar-Bahajoub)

---


