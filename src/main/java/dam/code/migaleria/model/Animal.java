package dam.code.migaleria.model;

import jakarta.persistence.*;

@Entity
@Table(name="animal")
public class Animal {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double deep;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String ocean;
    @Column(columnDefinition = "TEXT")
    private String urlImagen;

    public Animal(String name, Double deep, String description, String ocean, String urlImagen) {
        this.name = name;
        this.deep = deep;
        this.description = description;
        this.ocean = ocean;
        this.urlImagen = urlImagen;
    }

    public Animal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getDeep() {
        return deep;
    }

    public void setDeep(Double deep) {
        this.deep = deep;
    }

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
