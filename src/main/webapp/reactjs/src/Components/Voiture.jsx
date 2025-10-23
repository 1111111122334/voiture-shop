import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Voiture() {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [couleur, setCouleur] = useState("");
  const [annee, setAnnee] = useState("");
  const [prix, setPrix] = useState("");
  const [matricule, setMatricule] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const voiture = {
      marque,
      modele,
      couleur,
      annee: parseInt(annee),
      prix: parseFloat(prix),
      immatricule: matricule, // correspond au backend
    };

    fetch("http://localhost:8080/api/voitures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voiture),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Voiture ajoutée avec succès !");
          // Réinitialiser les champs
          setMarque("");
          setModele("");
          setCouleur("");
          setAnnee("");
          setPrix("");
          setMatricule("");
          navigate("/list", { replace: true });
        } else {
          setMessage("Erreur lors de l'ajout.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Erreur lors de l'ajout.");
      });
  };

  return (
    <Card className="border border-dark bg-dark text-white mt-4">
      <Card.Header>Ajouter Voiture</Card.Header>
      <Form onSubmit={handleSubmit}>
        <Card.Body>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridMatricule">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le matricule"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMarque">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la marque"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridModele">
              <Form.Label>Modèle</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le modèle"
                value={modele}
                onChange={(e) => setModele(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCouleur">
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la couleur"
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAnnee">
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez l'année"
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                required
                className="bg-dark text-white"
              />
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer style={{ textAlign: "right" }}>
          <Button size="sm" variant="success" type="submit">
            Ajouter
          </Button>
        </Card.Footer>
      </Form>

      {message && <p className="mt-3 text-center">{message}</p>}
    </Card>
  );
}
