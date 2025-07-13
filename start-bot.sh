#!/bin/bash

echo "🧹 Nettoyage de l’ancien dossier du bot..."
rm -rf inco_bot

echo "🔁 Clonage du dépôt du bot..."
git clone https://github.com/darkVador221/Inco_dark.git inco_bot

echo "📦 Copie du fichier .env..."
cp .env inco_bot/.env

echo "📂 Entrée dans le dossier du bot..."
cd inco_bot

echo "📥 Installation des dépendances..."
npm install

echo "🚀 Lancement du bot..."
node index.js > ../bot.log 2>&1 &
echo "✅ Bot lancé avec succès en arrière-plan."
