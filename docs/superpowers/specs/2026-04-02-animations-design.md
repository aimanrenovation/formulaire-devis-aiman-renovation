# Animations & Modernisation — AIMAN Renovation Form

## Contexte

Amélioration visuelle du formulaire de devis existant (Next.js 16 + Tailwind v4 + shadcn/ui). Ajout d'animations full motion et style gradient bold.

## Stack supplémentaire

- **Framer Motion** : transitions étapes, orchestration d'animations complexes, parallax
- **CSS/Tailwind** : micro-interactions simples (hover, focus, shake, pulse)

## Décisions validées

| Question | Choix |
|----------|-------|
| Niveau d'animation | Full motion (C) |
| Librairie | Mix Framer Motion + CSS/Tailwind (C) |
| Style visuel | Gradient bold — dégradés rouge/noir, formes géométriques flottantes (C) |

## Modifications par composant

### 1. Hero (`components/hero.tsx`)
- Background : dégradé radial animé `#C0392B` → `#1A1A1A` avec formes géométriques flottantes (cercles, losanges) en `opacity-10`, animation CSS lente
- Logo : `motion.div` — scale 0→1 + fade, delay 0.2s
- Titre : effet typing lettre par lettre via `motion.span` stagger
- Badge "GRATUIT" : pulse lumineux continu via CSS `animate-pulse` + `shadow-brand-red`

### 2. Transitions entre étapes (`app/page.tsx`)
- Wrapper `AnimatePresence mode="wait"` autour du step actif
- Chaque step : `motion.div` avec `initial={{ x: direction * 100, opacity: 0 }}`, `animate={{ x: 0, opacity: 1 }}`, `exit={{ x: direction * -100, opacity: 0 }}`
- Direction variable : +1 pour "suivant", -1 pour "précédent"
- Transition : `type: "spring", stiffness: 300, damping: 30`

### 3. Barre de progression (`components/form/step-indicator.tsx`)
- Ligne de connexion : `motion.div` avec `layoutId` pour animer le remplissage
- Pastille active : `motion.div` avec `scale: [1, 1.2, 1]` en boucle (pulse)
- Pastille complétée : `motion.div` scale pop à la complétion

### 4. Step Contact (`components/form/step-contact.tsx`)
- Inputs : `focus-within:ring-2 focus-within:ring-brand-red/30` (glow CSS)
- Inputs invalides : animation shake CSS `@keyframes shake { 0%,100% { transform: translateX(0) } 25% { translateX(-4px) } 75% { translateX(4px) } }`
- Labels : `motion.label` fade-in stagger au montage

### 5. Step Project (`components/form/step-project.tsx`)
- Badges : `motion.button` avec `whileTap={{ scale: 0.95 }}` et `animate` scale bounce à la sélection
- Badges sélectionnés : transition spring `type: "spring", stiffness: 500`
- Sections : stagger fade-in au montage

### 6. Step Photos (`components/form/step-photos.tsx`)
- Grille photos : `motion.div` stagger — chaque photo apparaît avec `scale: 0→1` + `opacity: 0→1`, delay `i * 0.05s`
- Suppression : `motion.div` `exit={{ scale: 0, opacity: 0, rotate: 10 }}`
- Zoom au hover : `whileHover={{ scale: 1.05 }}` sur chaque photo
- Compteur `(N)` : animation count-up CSS

### 7. Step Plan (`components/form/step-plan.tsx`)
- Plan preview : `motion.div` apparition `scale: 0.8→1` + `opacity: 0→1`
- Suppression : même animation que photos

### 8. Step Recap (`components/form/step-recap.tsx`)
- Lignes récap : stagger fade-in de haut en bas, delay `i * 0.03s`
- Bouton "Envoyer" : dégradé animé au hover (background-position shift)
- Écran succès : confettis (particles CSS + animation), mascotte scale bounce

### 9. Mascotte (`components/mascot-tip.tsx`)
- Image : `motion.div` floating — `animate={{ y: [0, -6, 0] }}` en boucle, `duration: 3s`
- Hover : léger tilt `whileHover={{ rotate: 3 }}`
- Bulle : apparition slide-in depuis la gauche

### 10. Boutons navigation (sticky bar dans `page.tsx`)
- Bouton "Suivant" : `motion.button` `whileHover={{ scale: 1.02 }}` `whileTap={{ scale: 0.98 }}`
- Dégradé animé CSS sur hover : `background-size: 200%` + `hover:background-position: right`
- Effet ripple au clic : pseudo-élément CSS avec `@keyframes ripple`

### 11. Background animé (nouveau composant `components/animated-bg.tsx`)
- Formes géométriques (3-4 shapes) en position absolute, `opacity-5`
- Animation CSS : rotation lente + translation, `animation-duration: 20-40s`
- Z-index derrière tout le contenu

## Fichiers à créer/modifier

| Fichier | Action |
|---------|--------|
| `components/hero.tsx` | Modifier — dégradé, formes, animations Framer |
| `components/footer.tsx` | Inchangé |
| `components/mascot-tip.tsx` | Modifier — floating + tilt |
| `components/form/step-indicator.tsx` | Modifier — pulse, scale pop |
| `components/form/step-contact.tsx` | Modifier — glow, shake |
| `components/form/step-project.tsx` | Modifier — badge pop, stagger |
| `components/form/step-photos.tsx` | Modifier — stagger, zoom, exit |
| `components/form/step-plan.tsx` | Modifier — apparition animée |
| `components/form/step-recap.tsx` | Modifier — stagger, confettis, dégradé bouton |
| `components/animated-bg.tsx` | Créer — formes géométriques flottantes |
| `app/page.tsx` | Modifier — AnimatePresence, direction, boutons animés |
| `app/globals.css` | Modifier — keyframes shake, ripple, floating, gradient-shift |

## Contraintes

- Toutes les animations doivent respecter `prefers-reduced-motion` (désactivées si l'utilisateur le demande)
- Performance mobile : pas de blur excessif, pas plus de 5 éléments animés simultanément
- Framer Motion ~40KB gzipped — acceptable pour le gain UX
