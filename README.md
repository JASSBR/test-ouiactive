Présentation

Ce dépôt contient une application Next.js (app router) destinée à gérer et générer des fiches/exercices pédagogiques. Le projet inclut une fonctionnalité prototype permettant d'associer automatiquement ou manuellement une image à un exercice, ainsi qu'une page dédiée pour rechercher un exercice à partir d'une photo prise ou importée par l'utilisateur.

Fonctionnalités principales ajoutées

- Association d'image automatique (prototype) :
  - Un endpoint serveur `POST /api/exercise-image` qui reçoit un titre/description/tags d'un exercice et renvoie l'image candidate la plus pertinente (matching par mots-clés, basé sur `data/images.json`).

- Recherche d'exercice par photo (page) :
  - Page cliente : `app/trouver-exercice-par-photo/page.tsx` — permet à l'utilisateur d'uploader ou prendre une photo.
  - Upload → `POST /api/image-search` : l'API enregistre l'image envoyée (dans `public/uploads/` dans le prototype), calcule un SHA256 pour détection d'égalité exacte et renvoie :
    - `matched` : si l'image correspond exactement à une image existante,
    - `candidates` : liste d'images candidates (métadonnées depuis `data/images.json`).
  - La page a été simplifiée en mode « recherche-only » : elle n'offre plus d'actions d'« associer » depuis cette page ; elle affiche uniquement les exercices trouvés (images qui possèdent une `associatedExercise`) et propose un bouton **Ouvrir** qui navigue vers `/fiches/revision?exerciseId=...`.

- Sélecteur manuel & révision :
  - Le flux de création d'exercice (`app/fiches/creer-fiche/database/page.tsx`) appelle `POST /api/exercise-image` lors de la génération et stocke temporairement l'image sélectionnée dans `sessionStorage` (clé `generated_exercise_image`) pour l'afficher dans la page de révision (`app/fiches/revision/page.tsx`).

Fichiers/points d'entrée importants

- `data/images.json` — métadonnées d'images (id, url, alt, tags, optional `associatedExercise`).
- `app/api/exercise-image/route.ts` — matching keyword -> image (POST/GET).
- `app/api/image-search/route.ts` — upload image, calcul SHA256, retourne `matched`/`candidates`.
- `app/trouver-exercice-par-photo/page.tsx` — page client pour chercher un exercice par photo (search-only flow).
- `app/fiches/creer-fiche/database/page.tsx` — appelle l'API d'association lors de la génération.
- `app/fiches/revision/page.tsx` — affiche l'image associée stockée en session et propose des contrôles de modification (prototype client-side).

Comment tester localement (développement)

1. Installer les dépendances et lancer le mode dev (selon votre gestionnaire) :

```powershell
pnpm install
pnpm dev
# ou
npm install
npm run dev
```

2. Tester l'API d'image (upload) :

```powershell
curl -X POST http://localhost:3000/api/image-search -H "Content-Type: application/json" -d '{"imageBase64":"<BASE64_DATA>"}'
```

3. Ouvrir la page `http://localhost:3000/trouver-exercice-par-photo` pour tester le flux de recherche par photo.

Limites & notes (prototype)

- Le matching visuel est actuellement très basique :
  - Recherche par mots-clés (texte) pour l'association automatique.
  - Détection d'égalité par SHA256 pour les uploads (ne reconnaît pas les images modifiées / recompressées). Pour un vrai matching d'images prises via appareil photo, il faudrait : pHash/perceptual hashing, ou embeddings + vector DB.
- La persistance de l'association image→exercice n'est pas encore implémentée en base de données. Le prototype utilise `data/images.json` et `sessionStorage` pour les démonstrations.

Idées d'améliorations futures

- Remplacer la détection SHA256 par pHash pour tolérer variations d'image.
- Indexer des embeddings (CLIP / modèles d'image) et utiliser un moteur vectoriel (pgvector / Pinecone / Weaviate) pour chercher par similarité.
- Ajouter un endpoint `GET /api/exercises/:id` et stocker l'association image→exercice dans une vraie base (Prisma / Postgres) pour vérifier l'existence d'un exercice avant l'affichage.
- Ajouter tests et exemples d'images pour faciliter la recette.

Contact / notes de développement

Si vous voulez que j'intègre l'une des idées ci‑dessus (pHash, embeddings, endpoint de vérification d'exercice, ou persistance DB), dites-moi laquelle et je l'ajouterai au TODO et je commencerai l'implémentation.

---
Petit rappel : le code dans ce dépôt est en mode prototype pour la fonctionnalité d'association d'image — il est prêt à être durci et industrialisé si vous le souhaitez.
