const express = require("express");
const router = express.Router();
const Enseignant = require("../models/enseignant");

// Récupérer tous les enseignants
router.get("/all", async (req, res) => {
  try {
    const enseignants = await Enseignant.find().populate("projetsCrees");
    res.status(200).json(enseignants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Récupérer un enseignant par son id
router.get("/get/:id", async (req, res) => {
  try {
    const enseignant = await Enseignant.findById(req.params.id).populate(
      "projetsCrees"
    );
    if (!enseignant) {
      return res.status(404).json({ error: "Enseignant non trouvé" });
    }
    res.status(200).json(enseignant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Ajouter un nouvel enseignant
router.post("/add", async (req, res) => {
  const { nom, prenom, email, motdepasse } = req.body;
  const enseignant = new Enseignant({
    nom,
    prenom,
    email,
    motdepasse,
    userType: 'enseignant'
  });

  try {
    const newEnseignant = await enseignant.save();
    res.status(201).json(newEnseignant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Mettre à jour un enseignant
router.put("/update/:id", async (req, res) => {
  const { nom, prenom, email, motdepasse } = req.body;

  try {
    const enseignant = await Enseignant.findByIdAndUpdate(
      req.params.id,
      { nom, prenom, email, motdepasse },
      { new: true }
    );

    if (!enseignant) {
      return res.status(404).json({ error: "Enseignant non trouvé" });
    }
    res.status(200).json(enseignant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Supprimer un enseignant
router.delete("/delete/:id", async (req, res) => {
  try {
    const enseignant = await Enseignant.findByIdAndDelete(req.params.id);

    if (!enseignant) {
      return res.status(404).json({ error: "Enseignant non trouvé" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post('/login', (req, res) => {
  const { email, motdepasse } = req.body;

  Enseignant.findOne({ email: email, motdepasse: motdepasse })
    .then((enseignant) => {
      if (!enseignant) {
        return res.status(401).json({ message: "Identifiants invalides pour l'enseignant" });
      }

      res.json({ message: "Connexion réussie en tant qu'enseignant" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la recherche de l'enseignant" });
    });
});

module.exports = router;


module.exports = router;
