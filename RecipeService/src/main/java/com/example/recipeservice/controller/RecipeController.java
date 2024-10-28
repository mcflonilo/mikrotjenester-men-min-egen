package com.example.recipeservice.controller;

import com.example.recipeservice.model.Recipe;
import com.example.recipeservice.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/api/recipe")
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }

    @PostMapping("/api/recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }
}