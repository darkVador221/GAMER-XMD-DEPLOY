document.getElementById('deployForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const session = document.getElementById('session').value.trim();
  const botname = document.getElementById('botname').value.trim();
  const number = document.getElementById('number').value.trim();
  const result = document.getElementById('result');

  if (!session || !botname || !number) {
    result.innerText = "❗ Merci de remplir tous les champs.";
    result.style.color = "orange";
    return;
  }

  result.innerText = "⏳ Déploiement en cours...";
  result.style.color = "#00ffff";

  try {
    const res = await fetch('/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session, botname, number }),
    });

    const data = await res.json();

    if (data.success) {
      result.innerText = "✅ Déploiement réussi ! Votre bot est actif.";
      result.style.color = "#00ff99";
    } else {
      result.innerText = "❌ Erreur : " + data.message;
      result.style.color = "red";
    }
  } catch (err) {
    result.innerText = "❌ Erreur serveur : " + err.message;
    result.style.color = "red";
  }
});