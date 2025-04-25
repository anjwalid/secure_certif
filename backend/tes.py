import subprocess

def verifier_tsr(tsr_file, tsq_file, tsa_cert_file, ca_cert_file):
    try:
        result = subprocess.run([
            "openssl", "ts", "-verify",
            "-in", tsr_file,
            "-queryfile", tsq_file,
            "-CAfile", ca_cert_file,
            "-untrusted", tsa_cert_file
        ], capture_output=True, text=True, check=True)

        print("[✓] Vérification réussie !")
        print(result.stdout)
        return True

    except subprocess.CalledProcessError as e:
        print("[✗] Échec de la vérification.")
        print(e.stderr)
        return False

info_block = "Zakaria | Bennani | Sécurité des systèmes".ljust(64, ' ')
info_block_bytes = info_block.encode('utf-8')
with open('file_txt', "wb") as f:
    f.write(info_block_bytes)
subprocess.run([
"openssl", "ts", "-query",
"-data", "file_txt",
"-no_nonce", "-sha256",
"-cert", "-out", "file_tsq"
], check=True)
# Exemple d'utilisation :
verifier_tsr(
    tsr_file="file.tsr",
    tsq_file="file.tsq",
    tsa_cert_file="cert_freetsa\tsa.crt",
    ca_cert_file="cert_freetsa\cacert.pem"
)
