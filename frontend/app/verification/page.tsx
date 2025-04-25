"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Search, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type VerificationStatus = "idle" | "loading" | "valid" | "invalid"

export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle")
  const [certificateId, setCertificateId] = useState<string>("")
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [certificateDetails, setCertificateDetails] = useState<any>(null)

  const handleIdVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificateId) return

    setVerificationStatus("loading")

    // Simuler une vérification d'API
    setTimeout(() => {
      if (certificateId.startsWith("CERT-") && certificateId.length > 10) {
        setVerificationStatus("valid")
        setCertificateDetails({
          id: certificateId,
          nom: "Dupont",
          prenom: "Jean",
          intitule: "Développeur Web Full Stack",
          date: "23 avril 2025",
          emetteur: "CertSecure",
        })
      } else {
        setVerificationStatus("invalid")
        setCertificateDetails(null)
      }
    }, 1500)
  }

  const handleFileVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificateFile) return

    setVerificationStatus("loading")

    // Simuler une vérification d'API
    setTimeout(() => {
      // Pour la démo, on considère que tous les fichiers sont valides
      setVerificationStatus("valid")
      setCertificateDetails({
        id: "CERT-2025-04-23-12345",
        nom: "Dupont",
        prenom: "Jean",
        intitule: "Développeur Web Full Stack",
        date: "23 avril 2025",
        emetteur: "CertSecure",
      })
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificateFile(e.target.files[0])
    }
  }

  const renderVerificationResult = () => {
    if (verificationStatus === "loading") {
      return (
        <div className="animate-pulse">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
            <AlertTitle className="ml-2 text-blue-800 dark:text-blue-300">Vérification en cours</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Analyse du certificat et vérification de sa signature...
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    if (verificationStatus === "valid") {
      return (
        <div className="animate-fade-in">
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 mb-4">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="ml-2 text-green-800 dark:text-green-300">Certificat authentique</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Ce certificat est valide et a été émis par une autorité reconnue.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Détails du certificat</CardTitle>
              <CardDescription>Informations contenues dans le certificat vérifié</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID du certificat</p>
                    <p className="text-gray-900 dark:text-gray-100">{certificateDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date d'émission</p>
                    <p className="text-gray-900 dark:text-gray-100">{certificateDetails.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bénéficiaire</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {certificateDetails.prenom} {certificateDetails.nom}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Intitulé de certification</p>
                  <p className="text-gray-900 dark:text-gray-100">{certificateDetails.intitule}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Émetteur</p>
                  <p className="text-gray-900 dark:text-gray-100">{certificateDetails.emetteur}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                La signature cryptographique et l'horodatage TSA de ce certificat ont été vérifiés avec succès.
              </p>
            </CardFooter>
          </Card>
        </div>
      )
    }

    if (verificationStatus === "invalid") {
      return (
        <div className="animate-fade-in">
          <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900">
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="ml-2 text-red-800 dark:text-red-300">Certificat non valide</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-400">
              Ce certificat n'a pas pu être vérifié ou a été altéré. Veuillez vérifier l'identifiant ou le fichier
              soumis.
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return null
  }

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
            <Link href="/verification" className="text-emerald-600 dark:text-emerald-500 font-medium">
              Vérifier
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-3 mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              Vérifier un certificat
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vérifiez l'authenticité d'un certificat en utilisant son identifiant unique ou en téléchargeant le fichier
              du certificat.
            </p>
          </div>

          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 animate-fade-in">
            <Tabs defaultValue="id" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="id">Par identifiant</TabsTrigger>
                <TabsTrigger value="file">Par fichier</TabsTrigger>
              </TabsList>

              <TabsContent value="id" className="space-y-6">
                <form onSubmit={handleIdVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate-id">Identifiant du certificat</Label>
                    <Input
                      id="certificate-id"
                      placeholder="Ex: CERT-2025-04-23-12345"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      L'identifiant se trouve généralement en bas du certificat ou dans le QR code.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!certificateId || verificationStatus === "loading"}
                  >
                    {verificationStatus === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Vérifier le certificat
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="file" className="space-y-6">
                <form onSubmit={handleFileVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificate-file">Fichier du certificat</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Input
                        id="certificate-file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="certificate-file" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {certificateFile ? certificateFile.name : "Cliquez pour sélectionner un fichier"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Formats acceptés: PDF, PNG, JPG</p>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!certificateFile || verificationStatus === "loading"}
                  >
                    {verificationStatus === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Vérifier le certificat
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8">{renderVerificationResult()}</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
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
