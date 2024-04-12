const express = require("express");
const app = express();
// Ajoute le support de CORS
const cors = require("cors");
// autorise les requêtes CORS
app.use(cors());
app.use(express.json());
let etudiants = []; // le tableau d'étudiants
let compteur = 0; // servira comme compteur d'étudiants

// Les différents endpoints acceptés par le serveur

// récupérer tous les étudiants
app.get("/etudiants", (req, res) => {
  console.log("### récupérer tous les étudiants");
  console.log(etudiants);  // affichage dans la console serveur pour comparaison
  res.send(etudiants);
});

// récupérer un étudiant spécifique
app.get("/etudiants/:id", (req, res) => {
  console.log(`### récupérer l'étudiant d'id ${req.params.id}`);
  // vérifie si un étudiant avec un id correspondant est trouvé
  const etudiantMatch = etudiants.find(
    (etudiant) => etudiant.id == req.params.id
);
// on renvoie l'étudiant trouvé ou bien un code 400
if (etudiantMatch) {
  console.log("étudiant trouvé :");
  console.log(etudiantMatch);
  res.send(etudiantMatch);
} else {
  console.log("étudiant non trouvé...");
  res.sendStatus(400);
}   
});

// ajouter un étudiant
app.post("/etudiants", (req, res) => {
  console.log("### ajouter un étudiant");
  // la syntaxe "..." permet de copier toutes les propriétés de req.body dans newEtudiant
  const newEtudiant = { id: compteur, ...req.body };
  compteur = compteur + 1;
  etudiants.push(newEtudiant);
  console.log("étudiant créé :");
  console.log(newEtudiant);
  res.send(newEtudiant);
});

// modifier un étudiant
app.put("/etudiants/:id", (req, res) => {
  console.log(`### modifier l'étudiant d'id ${req.params.id}`);
  const etudiantIndex = etudiants.findIndex(
    (etudiant) => etudiant.id == req.params.id
  );
  // si aucun id trouvé, findIndex renvoie -1
  if (etudiantIndex != -1) {
    console.log("étudiant modifié");
    console.log(req.body);
    // mise à jour de l'étudiant dans le tableau
    etudiants[etudiantIndex] = req.body;
    // la réponse contient l'étudiant modifié
    res.send(etudiants[etudiantIndex]);
  } else {
    console.log("étudiant non trouvé...");
    res.sendStatus(204);
  }
});

// supprimer un étudiant
app.delete("/etudiants/:id", (req, res) => {
  console.log(`### supprimer l'étudiant d'id ${req.params.id}`);
  var etudiantIndex = etudiants.findIndex((et) => et.id == req.params.id);
  // si aucun id trouvé, findIndex renvoie -1
  if (etudiantIndex != -1) {
    console.log("étudiant supprimé");
    // filter va renvoyer un nouveau tableau sans l'élément à supprimer
    etudiants = etudiants.filter((etudiant) => etudiant.id != req.params.id);
    res.sendStatus(204);
  } else {
    console.log("étudiant non trouvé...");
    res.sendStatus(404);
  }
});

app.all("/", (req, res) => {
    console.log("### route inconnue");
    res.sendStatus("404");
  });

app.listen(3001, () => {
  console.log("Serveur écoute sur port 3001");
});