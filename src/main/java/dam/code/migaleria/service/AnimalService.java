package dam.code.migaleria.service;

import dam.code.migaleria.model.AnimalDocument;
import dam.code.migaleria.repository.AnimalMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalMongoService {

    @Autowired
    private AnimalMongoRepository animalMongoRepository;

    public List<AnimalDocument> findAll() {
        return animalMongoRepository.findAll();
    }

    public AnimalDocument saveAnimal(AnimalDocument animal) {
        return animalMongoRepository.save(animal);
    }

    public void deleteAnimal(String id) {
        animalMongoRepository.deleteById(id);
    }

    public AnimalDocument updateAnimal(String id, AnimalDocument animalUpdated) {

        Optional<AnimalDocument> animal = animalMongoRepository.findById(id);

        if (animal.isPresent()) {
            AnimalDocument existingAnimal = animal.get();

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

            return animalMongoRepository.save(existingAnimal);
        } else {
            throw new RuntimeException("No se encontró el animal con ID: " + id);
        }
    }
}
