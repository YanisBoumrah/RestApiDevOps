const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

// Créer un fichier JSON vide pour stocker les données
const dbFilePath = 'db.json';
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify({ utilisateurs: [] }));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API REST !');
});

app.get('/utilisateurs', (req, res) => {
  const data = fs.readFileSync(dbFilePath);
  const utilisateurs = JSON.parse(data).utilisateurs;
  const utilisateursSimples = utilisateurs.map((u) => {
    return { id: u.id, nom: u.nom, age: u.age };
  });
  res.json(utilisateursSimples);
});

app.get('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync(dbFilePath);
  const utilisateurs = JSON.parse(data).utilisateurs;
  const utilisateur = utilisateurs.find((u) => u.id === parseInt(id));
  res.json(utilisateur);
});

app.post('/utilisateurs', (req, res) => {
  const utilisateur = req.body;
  const data = fs.readFileSync(dbFilePath);
  const utilisateurs = JSON.parse(data).utilisateurs;
  utilisateur.id = utilisateurs.length + 1;
  utilisateurs.push(utilisateur);
  fs.writeFileSync(dbFilePath, JSON.stringify({ utilisateurs: utilisateurs }));
  res.send('Utilisateur ajouté avec succès');
});

app.put('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const utilisateur = req.body;
  const data = fs.readFileSync(dbFilePath);
  const utilisateurs = JSON.parse(data).utilisateurs;
  const index = utilisateurs.findIndex((u) => u.id === parseInt(id));
  if (index >= 0) {
    utilisateurs[index] = { ...utilisateur, id: parseInt(id) };
    fs.writeFileSync(dbFilePath, JSON.stringify({ utilisateurs: utilisateurs }));
    res.send(`Utilisateur avec l'ID ${id} mis à jour avec succès`);
  } else {
    res.status(404).send(`Utilisateur avec l'ID ${id} non trouvé`);
  }
});

app.delete('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync(dbFilePath);
  const utilisateurs = JSON.parse(data).utilisateurs;
  const index = utilisateurs.findIndex((u) => u.id === parseInt(id));
  if (index >= 0) {
    utilisateurs.splice(index, 1);
    fs.writeFileSync(dbFilePath, JSON.stringify({ utilisateurs: utilisateurs }));
    res.send(`Utilisateur avec l'ID ${id} supprimé avec succès`);
  } else {
    res.status(404).send(`Utilisateur avec l'ID ${id} non trouvé`);
  }
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
