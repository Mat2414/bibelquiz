export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Méthode non autorisée.' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const accessCode = request.headers.get('X-Quiz-Access-Code');

  // Le véritable code sera placé dans Netlify,
  // pas dans ce fichier public.
  const correctCode = process.env.QUIZ_ACCESS_CODE;

  if (!correctCode || accessCode !== correctCode) {
    return new Response(
      JSON.stringify({ error: 'Code d’accès incorrect.' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Données invalides.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const { topic, amount, level, audience } = data;

  if (!topic) {
    return new Response(
      JSON.stringify({ error: 'Veuillez indiquer un sujet.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Pour l'instant, la vérification du code est opérationnelle.
  // La génération IA sera ajoutée ensuite.
  return new Response(
    JSON.stringify({
      cards: [],
      message: 'Code accepté. La génération IA sera configurée à l’étape suivante.'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
