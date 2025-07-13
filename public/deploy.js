document.getElementById('deployForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const session = document.getElementById('session').value.trim();
  const botname = document.getElementById('botname').value.trim();
  const number = document.getElementById('number').value.trim();
  const result = document.getElementById('result') || document.createElement('p');
  
  if (!session || !botname || !number) {
    result.innerText = "❗ Merci de remplir tous les champs.";
    return;
  }

  result.innerText = "⏳ Déploiement en cours...";

  try {
    const res = await fetch('/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session, botname, number }),
    });

    const data = await res.json();

    if (data.success) {
      result.innerText = "✅ Déploiement réussi ! Votre bot est actif.";
    } else {
      result.innerText = "❌ Erreur : " + data.message;
    }
  } catch (err) {
    result.innerText = "❌ Erreur serveur : " + err.message;
  }

  if (!document.getElementById('result')) {
    document.getElementById('deployForm').appendChild(result);
    result.id = "result";
  }
});