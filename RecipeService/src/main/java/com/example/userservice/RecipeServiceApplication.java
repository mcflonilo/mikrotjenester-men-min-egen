package com.example.userservice;

import com.example.userservice.model.Recipe;
import com.example.userservice.repository.RecipeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.InputStream;
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
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Recipe>> typeReference = new TypeReference<>() {};
        InputStream inputStream = getClass().getResourceAsStream("/recipes.json");
        List<Recipe> recipes = objectMapper.readValue(inputStream, typeReference);
        recipeRepository.saveAll(recipes);
        System.out.println("Recipes saved to the database.");
    }
}