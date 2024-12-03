package com.example.userservice;

import com.example.userservice.model.Recipe;
import com.example.userservice.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class RecipeServiceApplication implements CommandLineRunner {

    @Autowired
    private RecipeRepository recipeRepository;

    public static void main(String[] args) {
        SpringApplication.run(RecipeServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        List<Integer> ingredientIds = List.of(1, 2);
        List<Integer> quantity = List.of(1, 2);

        Recipe recipe = new Recipe( "Pasta", "Pasta with tomato sauce", "Cook pasta, add sauce", ingredientIds, quantity, List.of("Gluten"));
        recipeRepository.save(recipe);
    }
}