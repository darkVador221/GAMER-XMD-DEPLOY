const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const app = express();
const os = require('os');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/deploy', async (req, res) => {
  const { session, botname, number } = req.body;

  if (!session || !botname || !number) {
    return res.status(400).json({ success: false, message: "❗ Champs manquants." });
  }

  try {
    // 📦 Étape 1 : Cloner le repo du bot
    const tempDir = path.join(os.tmpdir(), `XMD-${Date.now()}`);
    execSync(`git clone https://github.com/darkVador221/Inco_dark "${tempDir}"`);

    // 📝 Étape 2 : Créer le .env avec les données du formulaire
    const envContent = `
SESSION_ID="${session}"
OWNER_NAME="${botname}"
OWNER_NUMBER="${number}"
AUTO_READ_STATUS=true
STATUS_READ_MSG="*Status vu par ${botname}*"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
MODE="public"
WELCOME=false
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=true
AUTO_REACT=false
PREFIX="."
    `.trim();

    fs.writeFileSync(path.join(tempDir, '.env'), envContent);

    // 📦 Étape 3 : Installer les dépendances
    execSync(`cd "${tempDir}" && npm install`, { stdio: 'inherit' });

    // 🚀 Étape 4 : Lancer le bot avec PM2
    execSync(`cd "${tempDir}" && pm2 start index.js --name "GAMER-XMD-${Date.now()}"`, {
      stdio: 'inherit'
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur de déploiement :", err);
    res.status(500).json({ success: false, message: "Erreur : " + err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur GAMER-XMD-DEPLOY actif sur http://localhost:${PORT}`);
});