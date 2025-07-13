const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/deploy', (req, res) => {
  const { session, botname, number } = req.body;

  if (!session || !botname || !number) {
    return res.json({ success: false, message: "Champs manquants." });
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
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: "Erreur d'écriture : " + err.message });
  }
});

app.listen(5000, () => console.log("🟢 Serveur actif sur http://localhost:5000"));
