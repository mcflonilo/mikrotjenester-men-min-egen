package com.example.recipeservice.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table
@Entity
@Setter
@Getter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String description;
    private String instructions;

    @ElementCollection
    private List<Integer> ingredientIds;

    @ElementCollection
    private List<Integer> quantity;

    public Recipe() {}

    public Recipe(String name, String description, String instructions, List<Integer> ingredientIds, List<Integer> quantity) {
        this.name = name;
        this.description = description;
        this.instructions = instructions;
        this.ingredientIds = ingredientIds;
        this.quantity = quantity;
    }
}