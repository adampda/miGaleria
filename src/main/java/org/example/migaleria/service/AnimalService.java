package org.example.migaleria.service;

import org.example.migaleria.model.Animal;
import org.example.migaleria.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> findAll() {
        return animalRepository.findAll();
    }

    public Animal saveAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public void deleteAnimal(Long id) {
        animalRepository.deleteById(id);
    }

    public Animal updateAnimal(Long id, Animal animalUpdated) {

        Optional<Animal> animal = animalRepository.findById(id);

        if (animal.isPresent()) {
            Animal existingAnimal = animal.get();

            if (animalUpdated.getName() != null && !animalUpdated.getName().isEmpty()) {
                existingAnimal.setName(animalUpdated.getName());
            }

            if (animalUpdated.getDeep() != null) {
                existingAnimal.setDeep(animalUpdated.getDeep());
            }

            if (animalUpdated.getOcean() != null && !animalUpdated.getOcean().isEmpty()) {
                existingAnimal.setOcean(animalUpdated.getOcean());
            }

            if (animalUpdated.getDescription() != null && !animalUpdated.getDescription().isEmpty()) {
                existingAnimal.setDescription(animalUpdated.getDescription());
            }

            if (animalUpdated.getUrlImagen() != null && !animalUpdated.getUrlImagen().isEmpty()) {
                existingAnimal.setUrlImagen(animalUpdated.getUrlImagen());
            }

            return animalRepository.save(existingAnimal);
        } else {
            throw new RuntimeException("No se encontró el animal con ID: " + id);
        }
    }
}
