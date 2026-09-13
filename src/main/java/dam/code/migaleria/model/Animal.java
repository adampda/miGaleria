package dam.code.migaleria.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "animals")
public class Animal {
    @Id
    private String id; 

    private String name;
    private String deep;
    private String description;
    private String ocean;
    private String urlImagen;

    public Animal(String name, String deep, String description, String ocean, String urlImagen) {
        this.name = name;
        this.deep = deep;
        this.description = description;
        this.ocean = ocean;
        this.urlImagen = urlImagen;
    }

    public Animal() {}

    public String getId() { 
        return id; 
    }
    
    public void setId(String id) { 
        this.id = id; 
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeep() { return deep; }

    public void setDeep(String deep) { this.deep = deep;}

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOcean() {
        return ocean;
    }

    public void setOcean(String ocean) {
        this.ocean = ocean;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }
}
