import base64
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.backends import default_backend
import zlib

def sign_data(data: bytes, key_path: str = "certifications/signing.key") -> str:
    with open(key_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

    signature = private_key.sign(
        data,
        ec.ECDSA(hashes.SHA256())
    )
    compressed = zlib.compress(signature)

    return base64.b64encode(compressed).decode('utf-8')


import qrcode
if __name__ == "__main__":
    # Exemple d'utilisation
    data = b"Hello, this is a test message."
    signature = sign_data(data)
    print(f"Signature: {signature}")
    # Générer un QR code avec la signature
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(signature)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    qr_img.save("signature_qr.png")
    print("QR code saved as signature_qr.png")