import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import ListeVoitures from './Components/ListeVoitures';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <NavigationBar />

      <Container className="mt-4">
        <Row>
          <Col>
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Bienvenue />} />
              <Route path="/add" element={<Voiture />} />
              <Route path="/list" element={<ListeVoitures />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
