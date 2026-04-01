export interface DevisFormData {
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  adresse: string;
  pieces: string[];
  style: string;
  budget: string;
  delai: string;
  description: string;
  contraintes: string;
  photos: PhotoFile[];
  plan: PhotoFile | null;
}

export interface PhotoFile {
  name: string;
  base64: string;
  preview: string;
}

export const INITIAL_FORM_DATA: DevisFormData = {
  nom: "",
  prenom: "",
  tel: "",
  email: "",
  adresse: "",
  pieces: [],
  style: "",
  budget: "",
  delai: "",
  description: "",
  contraintes: "",
  photos: [],
  plan: null,
};

export const PIECES_OPTIONS = [
  "Salon",
  "Chambre",
  "Cuisine",
  "Salle de bain",
  "Couloir",
  "Autre",
];

export const STYLE_OPTIONS = ["Classique", "Scandinave", "Industriel"];

export const BUDGET_OPTIONS = [
  "Moins de 5 000 €",
  "5 000 - 10 000 €",
  "10 000 - 20 000 €",
  "20 000 - 40 000 €",
  "Plus de 40 000 €",
  "À définir",
];

export const DELAI_OPTIONS = [
  "Dès que possible",
  "Dans 1-2 mois",
  "Dans 3-6 mois",
];

export const STEP_LABELS = [
  "Coordonnées",
  "Projet",
  "Photos",
  "Plan",
  "Récap",
];
