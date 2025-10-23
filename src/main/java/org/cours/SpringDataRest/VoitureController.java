package org.cours.SpringDataRest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174") // ton port front
@RestController
@RequestMapping("/api")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    // GET toutes les voitures
    @GetMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    // POST pour ajouter une voiture
    @PostMapping("/voitures")
    public ResponseEntity<Voiture> addVoiture(@RequestBody Voiture voiture) {
        Voiture savedVoiture = voitureRepo.save(voiture);
        return ResponseEntity.ok(savedVoiture);
    }

    @PutMapping("/voitures/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    @DeleteMapping("/voitures/{id}")
    public void deleteVoiture(@PathVariable Long id) {
        voitureRepo.deleteById(id);
    }
}
