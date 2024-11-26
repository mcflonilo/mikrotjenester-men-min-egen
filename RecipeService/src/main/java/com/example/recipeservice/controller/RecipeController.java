package com.example.recipeservice.controller;

import com.example.recipeservice.model.Recipe;
import com.example.recipeservice.repository.RecipeRepository;
import com.example.recipeservice.service.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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



    @PostMapping("/api/recipe")
    public String addRecipe(@RequestBody Recipe recipe) {
        rabbitMQProducer.sendMessage(recipe);
        return "Recipe creation request sent to the queue.";
    }
}
