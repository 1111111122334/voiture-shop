import React, { useEffect, useState } from "react";
import { Card, Table } from 'react-bootstrap';

function ListeVoitures() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/api/voitures")
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setVoitures(data);
      } else if (data._embedded && data._embedded.voitures) {
        setVoitures(data._embedded.voitures);
      }
    })
    .catch(error => console.error(error));
}, []);

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
            </tr>
          </thead>
          <tbody>
            {voitures.length === 0 ? (
              <tr align="center">
                <td colSpan="6">Aucune Voiture disponible</td>
              </tr>
            ) : (
              voitures.map((v, i) => (
                <tr key={i}>
                  <td>{v.marque}</td>
                  <td>{v.modele}</td>
                  <td>{v.couleur}</td>
                  <td>{v.immatricule}</td>
                  <td>{v.annee}</td>
                  <td>{v.prix}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ListeVoitures;
