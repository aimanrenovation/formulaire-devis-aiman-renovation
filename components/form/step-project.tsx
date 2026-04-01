"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DevisFormData } from "@/lib/types";
import { PIECES_OPTIONS, STYLE_OPTIONS, BUDGET_OPTIONS, DELAI_OPTIONS } from "@/lib/types";

interface StepProjectProps {
  data: DevisFormData;
  onChange: (field: keyof DevisFormData, value: string | string[]) => void;
}

function OptionGrid({
  label,
  options,
  selected,
  onSelect,
  multi = false,
}: {
  label: string;
  options: string[];
  selected: string | string[];
  onSelect: (value: string | string[]) => void;
  multi?: boolean;
}) {
  const selectedArr = Array.isArray(selected) ? selected : [selected];

  function handleClick(option: string) {
    if (multi) {
      const arr = selectedArr.includes(option)
        ? selectedArr.filter((s) => s !== option)
        : [...selectedArr, option];
      onSelect(arr);
    } else {
      onSelect(option);
    }
  }

  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedArr.includes(option);
          return (
            <motion.div
              key={option}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
              transition={isSelected ? { duration: 0.3 } : {}}
            >
              <Badge
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer text-sm px-3 py-1.5 transition-colors ${
                  isSelected
                    ? "bg-brand-red hover:bg-brand-red/90 text-white border-brand-red"
                    : "hover:border-brand-red hover:text-brand-red"
                }`}
                onClick={() => handleClick(option)}
              >
                {option}
              </Badge>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function StepProject({ data, onChange }: StepProjectProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-brand-red">Votre projet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 * 0.08 }}>
          <OptionGrid
            label="Pièce(s) concernée(s) *"
            options={PIECES_OPTIONS}
            selected={data.pieces}
            onSelect={(v) => onChange("pieces", v)}
            multi
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 * 0.08 }}>
          <OptionGrid
            label="Style souhaité"
            options={STYLE_OPTIONS}
            selected={data.style}
            onSelect={(v) => onChange("style", v as string)}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 * 0.08 }}>
          <OptionGrid
            label="Budget estimé *"
            options={BUDGET_OPTIONS}
            selected={data.budget}
            onSelect={(v) => onChange("budget", v as string)}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 * 0.08 }}>
          <OptionGrid
            label="Délai souhaité *"
            options={DELAI_OPTIONS}
            selected={data.delai}
            onSelect={(v) => onChange("delai", v as string)}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4 * 0.08 }}>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Description du projet *</label>
            <Textarea
              placeholder="Douche italienne, cloison neuve, carrelage sol..."
              value={data.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={3}
            />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5 * 0.08 }}>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Contraintes d'accès (optionnel)</label>
            <Textarea
              placeholder="Étage, stationnement, horaires..."
              value={data.contraintes}
              onChange={(e) => onChange("contraintes", e.target.value)}
              rows={2}
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
