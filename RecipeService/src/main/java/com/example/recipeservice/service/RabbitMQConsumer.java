// File: RecipeService/src/main/java/com/example/recipeservice/service/RabbitMQConsumer.java

package com.example.recipeservice.service;

import com.example.recipeservice.model.Recipe;
import com.example.recipeservice.repository.RecipeRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQConsumer {

    @Autowired
    private RecipeRepository recipeRepository;

    @RabbitListener(queues = "recipeQueue")
    public void receiveMessage(Recipe recipe) {
        System.out.println("Received recipe: " + recipe.getName());
        recipeRepository.save(recipe);
    }
}