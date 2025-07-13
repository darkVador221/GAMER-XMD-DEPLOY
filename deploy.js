document.getElementById('deploy-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const session = form.get('session');
  const botname = form.get('botname');
  const number = form.get('number');

  const result = document.getElementById('result');
  result.innerText = "⏳ Déploiement en cours...";

  try {
    const res = await fetch('/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session, botname, number }),
    });
    const data = await res.json();

    if (data.success) {
      result.innerText = "✅ Déploiement réussi ! Votre bot est prêt à l’emploi.";
    } else {
      result.innerText = "❌ Erreur pendant le déploiement : " + data.message;
    }
  } catch (err) {
    result.innerText = "❌ Erreur serveur : " + err.message;
  }
});