const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware pour servir les fichiers HTML, JS, CSS, etc.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route POST /deploy
app.post('/deploy', (req, res) => {
  const { session, botname, number } = req.body;

  if (!session || !botname || !number) {
    return res.status(400).json({ success: false, message: "❗ Champs manquants." });
  }

  // Génération du contenu .env
  const envContent = `
SESSION_ID="${session}"
OWNER_NAME="${botname}"
OWNER_NUMBER="${number}"
AUTO_READ_STATUS=true
STATUS_READ_MSG="*Status vu par ${botname}*"
MODE="public"
AUTO_BLOCK=true
`.trim();

  try {
    fs.writeFileSync(path.join(__dirname, '.env'), envContent);
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur écriture .env:", err);
    res.status(500).json({ success: false, message: "Erreur d'écriture : " + err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur actif sur http://localhost:${PORT}`);
});