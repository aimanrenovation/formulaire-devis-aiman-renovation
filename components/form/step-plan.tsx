"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MascotTip } from "@/components/mascot-tip";
import { compressImage } from "@/lib/compress-image";
import type { DevisFormData, PhotoFile } from "@/lib/types";
import { FileUp, BookOpen, MapPin, X } from "lucide-react";

interface StepPlanProps {
  data: DevisFormData;
  onChange: (field: keyof DevisFormData, value: PhotoFile | null) => void;
}

export function StepPlan({ data, onChange }: StepPlanProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    const base64 = await compressImage(file, 1200, 0.8);
    onChange("plan", { name: file.name, base64, preview: base64 });
  }

  return (
    <div className="card-premium p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-brand-red to-brand-red-light bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-brand-red" />
        Plan du logement
      </h2>
      <div className="space-y-4">
        <MascotTip
          image="/images/image_2.png"
          text="Un plan clair = un devis précis. Utilisez MagicPlan ou importez une photo de votre plan."
        />

        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="w-full gap-2" />}>
            <BookOpen className="w-4 h-4" />
            Guide MagicPlan
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créez votre plan avec MagicPlan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Image src="/images/image_3.png" alt="Scan de la pièce" width={500} height={280} className="rounded-lg w-full" />
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Positionnez-vous dans un coin de la pièce</li>
                <li>Suivez les murs lentement</li>
                <li>Vérifiez portes et fenêtres</li>
                <li>Validez le contour fermé</li>
              </ol>
              <div className="flex gap-2">
                <a href="https://apps.apple.com/app/magicplan/id427424432" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full text-xs">App Store</Button>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sensopia.magicplan" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full text-xs">Play Store</Button>
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {data.plan && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-gray-100"
          >
            <img src={data.plan.preview} alt="Plan importé" className="w-full h-full object-contain" />
            <button
              onClick={() => onChange("plan", null)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />
        <Button
          onClick={() => inputRef.current?.click()}
          className="btn-premium w-full bg-gradient-to-r from-brand-red to-brand-red-light text-white shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 gap-2"
          type="button"
        >
          <FileUp className="w-4 h-4" />
          {data.plan ? "Remplacer le plan" : "Importer un plan"}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Pas de plan ? Continuez sans, on s'adapte.
        </p>
      </div>
    </div>
  );
}
