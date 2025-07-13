const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // 👈 Ajout important

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/deploy', (req, res) => {
  const { session, botname, number } = req.body;

  if (!session || !botname || !number) {
    return res.status(400).json({ success: false, message: "❗ Champs manquants." });
  }

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

    // 👇 Exécute le script de déploiement automatique
    exec('sh ./start-bot.sh', (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Erreur lors du lancement du bot :", error);
        return res.json({ success: false, message: "Erreur lors du lancement du bot." });
      }
      console.log("✅ Script de démarrage exécuté.");
      return res.json({ success: true });
    });

  } catch (err) {
    console.error("❌ Erreur écriture .env:", err);
    return res.status(500).json({ success: false, message: "Erreur d'écriture : " + err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur actif sur http://localhost:${PORT}`);
});