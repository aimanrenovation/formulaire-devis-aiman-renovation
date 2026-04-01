"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DevisFormData } from "@/lib/types";

interface StepContactProps {
  data: DevisFormData;
  onChange: (field: keyof DevisFormData, value: string) => void;
}

export function StepContact({ data, onChange }: StepContactProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-brand-red">Vos coordonnées</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 * 0.1 }}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Nom *</label>
              <Input
                placeholder="Votre nom"
                value={data.nom}
                onChange={(e) => onChange("nom", e.target.value)}
                required
                className="focus:ring-2 focus:ring-brand-red/30 transition-shadow"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Prénom *</label>
              <Input
                placeholder="Votre prénom"
                value={data.prenom}
                onChange={(e) => onChange("prenom", e.target.value)}
                required
                className="focus:ring-2 focus:ring-brand-red/30 transition-shadow"
              />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 * 0.1 }}>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Téléphone *</label>
            <Input
              type="tel"
              inputMode="tel"
              placeholder="06 33 49 69 25"
              value={data.tel}
              onChange={(e) => onChange("tel", e.target.value)}
              required
              className="focus:ring-2 focus:ring-brand-red/30 transition-shadow"
            />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 * 0.1 }}>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email *</label>
            <Input
              type="email"
              inputMode="email"
              placeholder="votre@email.fr"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              required
              className="focus:ring-2 focus:ring-brand-red/30 transition-shadow"
            />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 * 0.1 }}>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Adresse du chantier *</label>
            <Input
              placeholder="14 rue de la Paix, 68300 Saint-Louis"
              value={data.adresse}
              onChange={(e) => onChange("adresse", e.target.value)}
              required
              className="focus:ring-2 focus:ring-brand-red/30 transition-shadow"
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
