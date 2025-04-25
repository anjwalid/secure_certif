"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle, AlertCircle, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  prenom: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  intitule: z.string().min(5, {
    message: "L'intitulé doit contenir au moins 5 caractères.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type Status = "idle" | "loading" | "success" | "error"

export function CertificateForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      intitule: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setStatus("loading")
    setCertificateUrl(null)
    setErrorMessage(null)

    try {
      // Créer un objet FormData pour l'envoi en application/x-www-form-urlencoded
      const formData = new URLSearchParams()
      formData.append("nom", values.nom)
      formData.append("prenom", values.prenom)
      formData.append("intitule", values.intitule)

      const response = await fetch("/certification", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`)
      }

      const data = await response.json()
      setCertificateUrl(data.certificateUrl)
      setStatus("success")
    } catch (error) {
      console.error("Erreur lors de la génération du certificat:", error)
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue")
      setStatus("error")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Générer un certificat</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remplissez le formulaire pour générer un certificat numérique authentifié.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intitule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intitulé de certification</FormLabel>
                <FormControl>
                  <Input placeholder="Développeur Web Full Stack" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:scale-[1.02]"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                "Générer le certificat"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {status === "loading" && (
        <div className="animate-pulse">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
            <AlertTitle className="ml-2 text-blue-800 dark:text-blue-300">Traitement en cours</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Génération et signature du certificat...
            </AlertDescription>
          </Alert>
        </div>
      )}

      {status === "success" && (
        <div className="animate-fade-in">
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="ml-2 text-green-800 dark:text-green-300">Succès</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Votre certificat a été généré avec succès.
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-700 dark:hover:text-green-300 hover:border-green-300 dark:hover:border-green-700"
              onClick={() => {
                if (certificateUrl) {
                  window.open(certificateUrl, "_blank")
                }
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger le certificat
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="animate-fade-in">
          <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="ml-2 text-red-800 dark:text-red-300">Erreur</AlertTitle>
            <AlertDescription className="text-red-700 dark:text-red-400">
              {errorMessage || "Une erreur est survenue lors de la génération du certificat."}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
