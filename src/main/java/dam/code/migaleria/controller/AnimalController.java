package dam.code.migaleria.controller;

import dam.code.migaleria.model.Animal;
import dam.code.migaleria.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> getAnimals(){
        return animalService.findAll();
    }

    @PostMapping
    public Animal addAnimal(@RequestBody Animal animal){
        return animalService.saveAnimal(animal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable String id, @RequestBody Animal animalDetails) {
        try {
            Animal updatedAnimal = animalService.updateAnimal(id, animalDetails);
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Animal> deleteAnimal(@PathVariable String id) {
        try {
            animalService.deleteAnimal(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
