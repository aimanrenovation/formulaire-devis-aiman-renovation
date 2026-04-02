"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import { X, Camera, BookOpen } from "lucide-react";

interface StepPhotosProps {
  data: DevisFormData;
  onChange: (field: keyof DevisFormData, value: PhotoFile[]) => void;
}

export function StepPhotos({ data, onChange }: StepPhotosProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const newPhotos: PhotoFile[] = [];
    for (const file of Array.from(files)) {
      const base64 = await compressImage(file);
      newPhotos.push({
        name: file.name,
        base64,
        preview: base64,
      });
    }
    onChange("photos", [...data.photos, ...newPhotos]);
  }

  function removePhoto(index: number) {
    onChange(
      "photos",
      data.photos.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="card-premium p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-brand-red to-brand-red-light bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <Camera className="w-5 h-5 text-brand-red" />
        Photos du chantier
      </h2>
      <div className="space-y-4">
        <MascotTip
          image="/images/image_1.png"
          text="Prenez au moins 6 photos : depuis l'entrée, chaque mur, le sol et le plafond. Bonne lumière = bon devis !"
        />

        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="w-full gap-2" />}>
            <BookOpen className="w-4 h-4" />
            Voir le guide photos
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Guide Photos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Image src="/images/image_6.png" alt="Bonnes vs mauvaises photos" width={500} height={280} className="rounded-lg w-full" />
              <Image src="/images/image_3.png" alt="Angles de prise de vue" width={500} height={280} className="rounded-lg w-full" />
              <Image src="/images/image_4.png" alt="Mesures" width={500} height={280} className="rounded-lg w-full" />
              <Image src="/images/image_5.png" alt="Vue d'ensemble" width={500} height={280} className="rounded-lg w-full" />
              <Image src="/images/image_7.png" alt="Erreurs à éviter" width={500} height={280} className="rounded-lg w-full" />
            </div>
          </DialogContent>
        </Dialog>

        {data.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {data.photos.map((photo, i) => (
                <motion.div
                  key={photo.name + i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0, rotate: 10 }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 bg-gray-100"
                >
                  <img
                    src={photo.preview}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          onClick={() => inputRef.current?.click()}
          className="btn-premium w-full bg-gradient-to-r from-brand-red to-brand-red-light text-white shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 gap-2"
          type="button"
        >
          <Camera className="w-4 h-4" />
          Ajouter des photos ({data.photos.length})
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Minimum 6 photos recommandées. Les images sont compressées automatiquement.
        </p>
      </div>
    </div>
  );
}
