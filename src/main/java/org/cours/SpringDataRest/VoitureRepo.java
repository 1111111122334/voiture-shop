package org.cours.SpringDataRest;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    // Sélectionner les voitures par marque
    List<Voiture> findByMarque(@Param("marque") String marque);

    // Sélectionner les voitures par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);

    // Sélectionner les voitures par année
    List<Voiture> findByAnnee(@Param("annee") int annee);

    // Sélectionner les voitures par marque et modèle
    List<Voiture> findByMarqueAndModele(@Param("marque") String marque, @Param("modele") String modele);

    // Sélectionner les voitures par marque ou couleur
    List<Voiture> findByMarqueOrCouleur(@Param("marque") String marque, @Param("couleur") String couleur);

    // Sélectionner les voitures par marque et trier par année (croissante)
    List<Voiture> findByMarqueOrderByAnneeAsc(@Param("marque") String marque);

    // Exemple avec requête JPQL
    @Query("select v from Voiture v where v.marque = ?1")
    List<Voiture> findByMarqueJPQL(String marque);

    // Exemple avec LIKE
    @Query("select v from Voiture v where v.marque like %?1")
    List<Voiture> findByMarqueEndsWith(String marque);
}
