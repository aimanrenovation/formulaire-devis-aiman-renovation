"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DevisFormData } from "@/lib/types";
import { sendDevis } from "@/app/actions/send-devis";
import { Send, MessageCircle, Check, Loader2 } from "lucide-react";

interface StepRecapProps {
  data: DevisFormData;
}

function RecapRow({ label, value }: { label: string; value: string | string[] }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex justify-between items-start gap-2 py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm text-gray-900 text-right">
        {Array.isArray(value) ? value.join(", ") : value}
      </span>
    </div>
  );
}

const recapRows = (data: DevisFormData) => [
  { label: "Nom", value: `${data.prenom} ${data.nom}` },
  { label: "Téléphone", value: data.tel },
  { label: "Email", value: data.email },
  { label: "Adresse", value: data.adresse },
  { label: "Pièces", value: data.pieces },
  { label: "Style", value: data.style },
  { label: "Budget", value: data.budget },
  { label: "Délai", value: data.delai },
  { label: "Description", value: data.description },
  { label: "Contraintes", value: data.contraintes },
];

export function StepRecap({ data }: StepRecapProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSendEmail() {
    setStatus("sending");
    const result = await sendDevis(data);
    setStatus(result.success ? "sent" : "error");
  }

  function handleWhatsApp() {
    const text = [
      `Bonjour AIMAN Renovation,`,
      `Je souhaite un devis pour :`,
      `Nom : ${data.prenom} ${data.nom}`,
      `Tél : ${data.tel}`,
      `Adresse : ${data.adresse}`,
      `Pièces : ${data.pieces.join(", ")}`,
      `Budget : ${data.budget}`,
      `Délai : ${data.delai}`,
      `Description : ${data.description}`,
      data.contraintes ? `Contraintes : ${data.contraintes}` : "",
      `Photos : ${data.photos.length} photo(s) à envoyer`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/33633496925?text=${encodeURIComponent(text)}`, "_blank");
  }

  if (status === "sent") {
    return (
      <Card className="border-gray-200 shadow-sm text-center">
        <CardContent className="pt-8 pb-8 space-y-4 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#C0392B', '#25D366', '#3498db', '#f1c40f', '#e74c3c'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], y: [0, -100 - Math.random() * 100] }}
                transition={{ duration: 1.5, delay: i * 0.05, ease: "easeOut" }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src="/images/image_9.png"
              alt="Succès"
              width={200}
              height={200}
              className="mx-auto rounded-xl"
            />
          </motion.div>
          <h2 className="text-xl font-bold text-brand-red">Dossier envoyé !</h2>
          <p className="text-sm text-gray-600">
            Nous avons bien reçu votre demande. Nous vous recontactons sous 24h.
          </p>
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white gap-2"
            type="button"
          >
            <MessageCircle className="w-4 h-4" />
            Envoyer mes photos par WhatsApp
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-brand-red flex items-center gap-2">
          <Check className="w-5 h-5" />
          Récapitulatif
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-1">
          {recapRows(data).map((row, index) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RecapRow label={row.label} value={row.value} />
            </motion.div>
          ))}
        </div>

        {data.photos.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {data.photos.length} photo(s) jointe(s)
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {data.photos.map((photo, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img src={photo.preview} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {data.plan && (
          <Badge variant="outline" className="text-green-600 border-green-300">
            Plan importé
          </Badge>
        )}

        {status === "error" && (
          <p className="text-sm text-red-600 text-center">
            Erreur lors de l'envoi. Réessayez ou utilisez WhatsApp.
          </p>
        )}

        <Button
          onClick={handleSendEmail}
          disabled={status === "sending"}
          className="w-full bg-gradient-to-r from-brand-red via-red-600 to-brand-red bg-[length:200%_100%] hover:bg-right transition-[background-position] duration-500 text-white gap-2"
          type="button"
        >
          {status === "sending" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {status === "sending" ? "Envoi en cours..." : "Envoyer le dossier"}
        </Button>

        <Button
          onClick={handleWhatsApp}
          variant="outline"
          className="w-full border-whatsapp text-whatsapp hover:bg-whatsapp/10 gap-2"
          type="button"
        >
          <MessageCircle className="w-4 h-4" />
          Ouvrir WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
}
