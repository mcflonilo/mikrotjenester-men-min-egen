package com.example.shoppinglistservice.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class Recipe {
    private Long Id;
    private String name;
    private String description;
    private String instructions;

    private List<Integer> ingredientIds;

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