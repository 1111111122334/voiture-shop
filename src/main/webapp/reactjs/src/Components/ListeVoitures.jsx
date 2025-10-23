import React, { useEffect, useState } from "react";
import { Card, Table, Button, Form } from "react-bootstrap";

function ListeVoitures() {
  const [localVoitures, setLocalVoitures] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editVoiture, setEditVoiture] = useState({
    marque: "",
    modele: "",
    couleur: "",
    immatricule: "",
    annee: "",
    prix: "",
  });

  // Charger les voitures
  useEffect(() => {
    fetch("http://localhost:8080/api/voitures")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLocalVoitures(data);
        } else if (data._embedded && data._embedded.voitures) {
          setLocalVoitures(data._embedded.voitures);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Supprimer une voiture
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
      fetch(`http://localhost:8080/api/voitures/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setLocalVoitures(localVoitures.filter((v) => v.id !== id));
        })
        .catch((error) => console.error("Erreur suppression :", error));
    }
  };

  // Démarrer la modification
  const startEdit = (voiture) => {
    setEditId(voiture.id);
    setEditVoiture({ ...voiture });
  };

  // Enregistrer la modification
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/voitures/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editVoiture),
    })
      .then((res) => {
        if (res.ok) {
          alert("Voiture mise à jour !");
          setEditId(null);
          // Mettre à jour la liste localement :
          setLocalVoitures((prev) =>
            prev.map((v) => (v.id === editId ? editVoiture : v))
          );
        } else {
          alert("Erreur lors de la mise à jour");
        }
      })
      .catch((err) => console.error(err));
  };

  // Gestion du changement de champ
  const handleChange = (e) => {
    setEditVoiture({
      ...editVoiture,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="border border-dark bg-dark text-white mt-4">
      <Card.Header>Liste des Voitures</Card.Header>
      <Card.Body>
        <Table bordered hover striped variant="dark">
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Couleur</th>
              <th>Immatricule</th>
              <th>Année</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {localVoitures.length === 0 ? (
              <tr align="center">
                <td colSpan="7">Aucune Voiture disponible</td>
              </tr>
            ) : (
              localVoitures.map((v) =>
                editId === v.id ? (
                  <tr key={v.id}>
                    <td colSpan="7">
                      <Form onSubmit={handleUpdate}>
                        <div className="d-flex gap-2">
                          <Form.Control
                            name="marque"
                            value={editVoiture.marque}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Form.Control
                            name="modele"
                            value={editVoiture.modele}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Form.Control
                            name="couleur"
                            value={editVoiture.couleur}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Form.Control
                            name="immatricule"
                            value={editVoiture.immatricule}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Form.Control
                            name="annee"
                            type="number"
                            value={editVoiture.annee}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Form.Control
                            name="prix"
                            type="number"
                            value={editVoiture.prix}
                            onChange={handleChange}
                            className="bg-dark text-white"
                          />
                          <Button type="submit" variant="success" size="sm">
                            💾
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditId(null)}
                          >
                            ❌
                          </Button>
                        </div>
                      </Form>
                    </td>
                  </tr>
                ) : (
                  <tr key={v.id}>
                    <td>{v.marque}</td>
                    <td>{v.modele}</td>
                    <td>{v.couleur}</td>
                    <td>{v.immatricule}</td>
                    <td>{v.annee}</td>
                    <td>{v.prix}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => startEdit(v)}
                        className="me-2"
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(v.id)}
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ListeVoitures;
