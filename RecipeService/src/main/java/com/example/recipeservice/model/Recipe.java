package com.example.recipeservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Table
@Entity
@Setter
@Getter
public class Recipe implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String description;
    @Column(length = 2000)
    private String instructions;

    @ElementCollection
    private List<Integer> ingredientIds;

    @ElementCollection
    private List<Integer> quantity;
    @ElementCollection
    private List<String> allergyTags;

    public Recipe() {}

    public Recipe(String name, String description, String instructions, List<Integer> ingredientIds, List<Integer> quantity, List<String> allergyTags) {
        this.name = name;
        this.description = description;
        this.instructions = instructions;
        this.ingredientIds = ingredientIds;
        this.quantity = quantity;
        this.allergyTags = allergyTags;
    }
}