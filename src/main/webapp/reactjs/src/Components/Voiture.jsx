import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: "",
      modele: "",
      couleur: "",
      annee: "",
      prix: "",
      message: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      annee: this.state.annee,
      prix: this.state.prix
    };

    fetch("http://localhost:8080/api/voitures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voiture)
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            message: "Voiture ajoutée avec succès !",
            marque: "",
            modele: "",
            couleur: "",
            annee: "",
            prix: ""
          });
        } else {
          this.setState({ message: "Erreur lors de l'ajout." });
        }
      })
      .catch(err => this.setState({ message: "Erreur lors de l'ajout." }));
  };

  render() {
    return (
      <Card className="border border-dark bg-dark text-white mt-4">
        <Card.Header>Ajouter Voiture</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                name="marque"
                value={this.state.marque}
                onChange={this.handleChange}
                className="bg-dark text-white"
                placeholder="Entrez la marque"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Modèle</Form.Label>
              <Form.Control
                type="text"
                name="modele"
                value={this.state.modele}
                onChange={this.handleChange}
                className="bg-dark text-white"
                placeholder="Entrez le modèle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type="text"
                name="couleur"
                value={this.state.couleur}
                onChange={this.handleChange}
                className="bg-dark text-white"
                placeholder="Entrez la couleur"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                name="annee"
                value={this.state.annee}
                onChange={this.handleChange}
                className="bg-dark text-white"
                placeholder="Entrez l'année"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={this.state.prix}
                onChange={this.handleChange}
                className="bg-dark text-white"
                placeholder="Entrez le prix"
              />
            </Form.Group>
            <Button variant="success" type="submit">Ajouter</Button>
          </Form>
          {this.state.message && <p className="mt-3">{this.state.message}</p>}
        </Card.Body>
      </Card>
    );
  }
}
