const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur notre Api !');
});

app.get('/utilisateurs', (req, res) => {
  const utilisateurs = [
    { id: 1, nom: 'Jean', age: 30 },
    { id: 2, nom: 'Marie', age: 25 },
    { id: 3, nom: 'Pierre', age: 40 },
  ];

  res.json(utilisateurs);
});

app.get('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  // code pour récupérer l'utilisateur avec l'ID spécifié dans la base de données
  const utilisateur = { id: id, nom: 'Jean', age: 30 };
  res.json(utilisateur);
});

app.post('/utilisateurs', (req, res) => {
  const utilisateur = req.body;
  // code pour ajouter l'utilisateur à la base de données
  res.send('Utilisateur ajouté avec succès');
});

app.put('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const utilisateur = req.body;
  // code pour mettre à jour l'utilisateur avec l'ID spécifié dans la base de données
  res.send(`Utilisateur avec l'ID ${id} mis à jour avec succès`);
});

app.delete('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  // code pour supprimer l'utilisateur avec l'ID spécifié de la base de données
  res.send(`Utilisateur avec l'ID ${id} supprimé avec succès`);
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
