package org.example.migaleria.model;

import jakarta.persistence.*;

@Entity
@Table(name="animal")
public class Animal {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private double deep;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String ocean;

    public Animal(String name, double deep, String description, String ocean) {
        this.name = name;
        this.deep = deep;
        this.description = description;
        this.ocean = ocean;
    }

    public Animal() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDeep() {
        return deep;
    }

    public void setDeep(double deep) {
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
}
