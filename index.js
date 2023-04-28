const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API REST !');
});

app.get('/utilisateurs', (req, res) => {
  const utilisateurs = [
    { id: 1, nom: 'Jean', age: 30 },
    { id: 2, nom: 'Marie', age: 25 },
    { id: 3, nom: 'Pierre', age: 40 },
  ];

  res.json(utilisateurs);
});

app.post('/utilisateurs', (req, res) => {
  const utilisateur = req.body;
  // code pour ajouter l'utilisateur à la base de données
  res.send('Utilisateur ajouté avec succès');
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
