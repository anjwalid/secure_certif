import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Shield, FileCheck, Lock, Award, ArrowRight, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo className="h-10 w-auto" />
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/generer"
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium"
            >
              Générer
            </Link>
            <Link
              href="/verification"
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 font-medium"
            >
              Vérifier
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/generer">
              <Button className="hidden sm:inline-flex">Générer un certificat</Button>
            </Link>
            <Link href="/verification">
              <Button variant="outline" className="hidden sm:inline-flex">
                Vérifier un certificat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                  Plateforme sécurisée de certification
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Certificats numériques <span className="text-emerald-600 dark:text-emerald-500">authentifiés</span> et
                  sécurisés
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Générez, signez et délivrez des certificats numériques avec une sécurité cryptographique avancée,
                  horodatage TSA et vérification par QR code.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link href="/generer">
                    <Button size="lg" className="w-full sm:w-auto">
                      Générer un certificat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/verification">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Vérifier un certificat
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl transform rotate-3 opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-500 mr-2" />
                      <span className="font-semibold text-gray-900 dark:text-white">Certificat d'Excellence</span>
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 p-1 rounded">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
                      <p className="font-medium text-gray-900 dark:text-white">Anejjar walid</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Certification</p>
                      <p className="font-medium text-gray-900 dark:text-white">Cybersecurity engineer | Full Stack developer </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date d'émission</p>
                      <p className="font-medium text-gray-900 dark:text-white">23 avril 2025</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">ID: CERT-2025-04-23-12345</div>
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">QR Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Fonctionnalités clés</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Notre plateforme offre des solutions complètes pour la gestion sécurisée de vos certificats numériques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg inline-block mb-4">
                  <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sécurité avancée</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Signature cryptographique robuste garantissant l'authenticité et l'intégrité de chaque certificat
                  émis.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg inline-block mb-4">
                  <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Vérification facile</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vérifiez instantanément l'authenticité d'un certificat via notre interface ou en scannant son QR code.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg inline-block mb-4">
                  <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Horodatage TSA</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chaque certificat est horodaté par une autorité de certification pour garantir sa validité temporelle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comment ça fonctionne</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Un processus simple en trois étapes pour générer et vérifier des certificats numériques sécurisés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Saisie des informations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Remplissez le formulaire avec les informations du bénéficiaire et l'intitulé de la certification.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Génération sécurisée</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre système génère un certificat signé cryptographiquement avec un QR code unique.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200 dark:border-gray-700">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Téléchargement et partage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Téléchargez le certificat et partagez-le. Sa validité peut être vérifiée à tout moment.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/generer">
                <Button size="lg" className="animate-pulse">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-600 dark:bg-emerald-800">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Award className="h-16 w-16 text-white mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold text-white mb-4">Prêt à sécuriser vos certifications ?</h2>
              <p className="text-xl text-emerald-100 mb-8">
                Rejoignez les organisations qui font confiance à notre plateforme pour leurs certificats numériques.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/generer">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Générer un certificat
                  </Button>
                </Link>
                <Link href="/verification">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-emerald-700"
                  >
                    Vérifier un certificat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo className="h-8 w-auto" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 dark:text-gray-400">© 2025 CertSecure. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
