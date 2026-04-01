# Redesign Formulaire Devis — AIMAN Renovation

## Contexte

Refonte complète du formulaire de demande de devis pour AIMAN Renovation (SASU, Saint-Louis 68300). L'app actuelle est un build React minifié (PWA) avec 8 étapes, style neo-brutal sombre, mascotte manga. Le code source n'est pas disponible — on repart de zéro.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **Tailwind CSS** + **shadcn/ui** (composants UI)
- **Resend** (envoi email)
- **Geist** (typographie)
- Déploiement sur **Vercel**

## Décisions de design validées

| Question | Choix |
|----------|-------|
| Nombre d'étapes | 5 (condensé depuis 8) |
| Envoi | Email automatique (Resend) + WhatsApp en option |
| Style visuel | Hybride : header/footer sombre, formulaire sur fond clair |
| Mascotte | Conservée telle quelle, sur toutes les étapes pertinentes |
| Stockage photos | Base64 dans l'email (compression côté client, pas de stockage externe) |
| Architecture backend | Server Actions + Resend (Approche A) |

## Structure des fichiers

```
app/
  layout.tsx              — Geist font, metadata, theme provider
  page.tsx                — Page unique, formulaire multi-étapes (client component)
  actions/
    send-devis.ts         — Server Action : reçoit FormData, envoie email via Resend
  components/
    form/
      step-indicator.tsx  — Barre de progression 5 étapes
      step-contact.tsx    — Étape 1 : Coordonnées
      step-project.tsx    — Étape 2 : Projet
      step-photos.tsx     — Étape 3 : Photos
      step-plan.tsx       — Étape 4 : Plan
      step-recap.tsx      — Étape 5 : Récap + envoi
    ui/                   — Composants shadcn/ui
    hero.tsx              — Header sombre avec logo + accroche
    footer.tsx            — Footer sombre avec coordonnées
    mascot-tip.tsx        — Mascotte + bulle conseil
  public/
    images/               — Logos + illustrations mascotte (copiés depuis l'app actuelle)
```

## Les 5 étapes

### Étape 1 — Coordonnées
- Champs : Nom, Prénom, Téléphone, Email, Adresse du chantier
- Validation : tous requis, email valide, téléphone français
- Composants shadcn : `Input`, `Card`

### Étape 2 — Votre Projet
- Type de pièce(s) : multi-sélection parmi Salon, Chambre, Cuisine, Salle de bain, Couloir, Autre
- Style : Classique, Scandinave, Industriel
- Budget : 5 tranches (< 5k, 5-10k, 10-20k, 20-40k, 40k+), plus "À définir"
- Délai : Dès que possible, 1-2 mois, 3-6 mois
- Description libre (textarea)
- Contraintes d'accès (textarea, optionnel)
- Composants shadcn : `Select`, `Textarea`, `Badge` (sélection pièces), `Card`

### Étape 3 — Photos
- Guide illustré avec la mascotte (images 1, 3, 4, 5, 6, 7)
- Bouton "Voir le guide" ouvre un `Dialog` avec les conseils
- Upload multi-photos avec preview miniatures
- Compression côté client (max 800px, qualité 0.7 JPEG)
- Indication des angles recommandés : entrée, mur gauche, mur droit, face, sol, plafond, ensemble
- Bouton supprimer par photo
- Composants shadcn : `Button`, `Dialog`, `Card`

### Étape 4 — Plan
- Guide MagicPlan avec la mascotte (images 2, 3)
- Liens vers App Store / Play Store pour MagicPlan
- Option 1 : import fichier plan (image ou PDF)
- Option 2 : "Pas de plan ? Continuez sans"
- Composants shadcn : `Button`, `Card`, `Dialog`

### Étape 5 — Récapitulatif + Envoi
- Résumé complet de toutes les infos saisies
- Preview des photos uploadées (miniatures)
- Bouton "ENVOYER LE DOSSIER" (rouge) → Server Action → email via Resend
- Bouton "OUVRIR WHATSAPP" (vert) → lien wa.me pré-rempli avec résumé texte
- Écran de succès avec mascotte (image 9) + confettis
- Composants shadcn : `Button`, `Card`, `Badge`

## Design visuel

### Layout
- **Header** : fond #1A1A1A, logo blanc (logo_bar.png), accroche "Votre projet de rénovation en 5 minutes", badge "GRATUIT"
- **Corps** : fond #F5F5F5, cartes blanches `rounded-xl shadow-sm border-gray-200`
- **Footer** : fond #1A1A1A, "SASU — Saint-Louis et environs — 06 33 49 69 25"
- **Navigation** : boutons sticky en bas sur mobile. "PRÉCÉDENT" (outline) à gauche, "SUIVANT" (rouge plein) à droite

### Palette
| Token | Couleur | Usage |
|-------|---------|-------|
| brand-red | #C0392B | CTA, accents, logo |
| brand-dark | #1A1A1A | Header, footer |
| bg-body | #F5F5F5 | Fond formulaire |
| bg-card | #FFFFFF | Cartes |
| text-primary | #111827 | Texte principal |
| text-muted | #6B7280 | Labels, placeholders |
| whatsapp | #25D366 | Bouton WhatsApp |

### Typographie
- Geist Sans : texte interface
- Geist Mono : badges, numéros d'étapes

### Barre de progression
5 pastilles numérotées reliées par une ligne horizontale. Active = rouge, complétée = check vert, future = grise.

### Mascotte
Composant `<MascotTip image={src} text={conseil} />` : image de la mascotte (60x60) + bulle de texte. Utilisé sur les étapes photos, plan, et dans les guides.

## Envoi email (Server Action)

```
Server Action send-devis.ts :
1. Reçoit : données formulaire + photos en base64 + plan en base64 (optionnel)
2. Construit un email HTML avec récapitulatif structuré
3. Attache les photos en pièces jointes (base64 → Buffer)
4. Envoie via Resend vers contact@aiman-renovation.fr
5. Retourne { success: true } ou { error: message }
```

## Lien WhatsApp

Format : `https://wa.me/33633496925?text={message encodé}`

Message pré-rempli avec résumé : nom, pièces, budget, délai. Les photos ne transitent pas par WhatsApp automatiquement — un message indique au client d'envoyer ses photos dans la conversation.

## PWA

- manifest.json conservé (nom, icônes, theme_color #C0392B)
- Service Worker basique pour cache offline des assets statiques
- Meta tags apple-mobile-web-app

## Contraintes

- Taille max email Resend : 40MB. Avec compression JPEG 0.7 à 800px max, ~15-20 photos tiennent largement
- Pas de base de données, pas de stockage externe
- Mobile-first : tous les composants doivent fonctionner parfaitement sur un écran 375px
- Les images de la mascotte sont des PNG existants, pas de génération
