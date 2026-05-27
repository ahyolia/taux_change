cat > README.md << 'EOF'
# Taux de Change — Bureau de Change XPF

Application Vue.js affichant les taux de change en temps réel basés sur le franc pacifique (XPF).

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run serve
```

## Build pour la production

```bash
npm run build
```

## Utilisation

- Saisir un montant en XPF dans le champ en haut
- Les taux de change se mettent à jour automatiquement toutes les heures
- Deux versions disponibles : Option API (`/`) et Composition API (`/composition`)

## Technologies

- Vue.js 3
- Vue Router
- ExchangeRate API
EOF

git add README.md
git commit -m "ajout README"
git push origin main
