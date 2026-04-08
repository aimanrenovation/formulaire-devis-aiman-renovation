/**
 * Moteur de devis automatique AIMAN RENOVATION
 *
 * Prend les métrés MagicPlan + le type de prestation et génère un devis estimatif.
 *
 * ⚠️ Grille tarifaire à valider avec Aiman — valeurs initiales basées sur
 * les moyennes marché Île-de-France 2026 (à ajuster).
 */

import type { MagicPlanProject, MagicPlanRoom } from "./magicplan";

export type Prestation =
  | "peinture"
  | "sol_stratifie"
  | "sol_carrelage"
  | "sol_parquet"
  | "demolition_cloison"
  | "electricite_renovation"
  | "plomberie_renovation"
  | "salle_de_bain_complete"
  | "cuisine_complete";

/** Tarifs en € HT, par m² sauf mention "forfait". */
export const GRILLE_TARIFAIRE: Record<Prestation, { unit: "m2" | "forfait"; prix: number; label: string }> = {
  peinture: { unit: "m2", prix: 28, label: "Peinture murs (2 couches)" },
  sol_stratifie: { unit: "m2", prix: 45, label: "Pose sol stratifié" },
  sol_carrelage: { unit: "m2", prix: 75, label: "Pose carrelage" },
  sol_parquet: { unit: "m2", prix: 90, label: "Pose parquet massif" },
  demolition_cloison: { unit: "m2", prix: 55, label: "Démolition cloison" },
  electricite_renovation: { unit: "m2", prix: 95, label: "Rénovation électrique aux normes" },
  plomberie_renovation: { unit: "forfait", prix: 1800, label: "Rénovation plomberie" },
  salle_de_bain_complete: { unit: "forfait", prix: 8500, label: "Salle de bain clé en main" },
  cuisine_complete: { unit: "forfait", prix: 12000, label: "Cuisine équipée clé en main" },
};

export interface LigneDevis {
  designation: string;
  piece?: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
  total: number;
}

export interface Devis {
  client?: { nom: string; email: string };
  lignes: LigneDevis[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  surfaceTotaleM2: number;
  genereLe: string;
}

const TVA_RENOVATION = 0.10; // 10% pour rénovation logement >2 ans

function ligneFromRoom(room: MagicPlanRoom, prestation: Prestation): LigneDevis {
  const tarif = GRILLE_TARIFAIRE[prestation];
  if (tarif.unit === "forfait") {
    return {
      designation: tarif.label,
      piece: room.name,
      quantite: 1,
      unite: "forfait",
      prixUnitaire: tarif.prix,
      total: tarif.prix,
    };
  }
  // Surface murs pour peinture, sol pour revêtements
  const surface = prestation === "peinture" ? room.wall_area_m2 : room.area_m2;
  return {
    designation: tarif.label,
    piece: room.name,
    quantite: surface,
    unite: "m²",
    prixUnitaire: tarif.prix,
    total: Math.round(surface * tarif.prix * 100) / 100,
  };
}

export function genererDevis(
  project: MagicPlanProject,
  prestationsParPiece: Record<string, Prestation[]>,
  client?: { nom: string; email: string },
): Devis {
  const lignes: LigneDevis[] = [];
  for (const room of project.rooms) {
    const prestations = prestationsParPiece[room.id] ?? [];
    for (const p of prestations) {
      lignes.push(ligneFromRoom(room, p));
    }
  }
  const totalHT = Math.round(lignes.reduce((s, l) => s + l.total, 0) * 100) / 100;
  const tva = Math.round(totalHT * TVA_RENOVATION * 100) / 100;
  const totalTTC = Math.round((totalHT + tva) * 100) / 100;
  return {
    client,
    lignes,
    totalHT,
    tva,
    totalTTC,
    surfaceTotaleM2: project.total_area_m2,
    genereLe: new Date().toISOString(),
  };
}
