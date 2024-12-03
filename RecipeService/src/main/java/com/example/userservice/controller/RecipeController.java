package com.example.userservice.controller;

import com.example.userservice.model.Recipe;
import com.example.userservice.repository.RecipeRepository;
import com.example.userservice.service.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @GetMapping("/api/recipe")
    public List<Recipe> getRecipes() {
        try {
            System.out.println("getRecipes");
            return recipeRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/api/recipe/{id}")
    public Recipe getRecipeById(@PathVariable Long id) {
        try {
            System.out.println("getRecipeById");
            Optional<Recipe> recipe = recipeRepository.findById(id);
            return recipe.orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



    @PostMapping("/api/recipe")
    public String addRecipe(@RequestBody Recipe recipe) {
        rabbitMQProducer.sendMessage(recipe);
        return "Recipe creation request sent to the queue.";
    }
}
