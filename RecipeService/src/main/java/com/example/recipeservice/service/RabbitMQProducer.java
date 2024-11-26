// File: RecipeService/src/main/java/com/example/recipeservice/service/RabbitMQProducer.java

package com.example.recipeservice.service;

import com.example.recipeservice.model.Recipe;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(Recipe recipe) {
        rabbitTemplate.convertAndSend("recipeQueue", recipe);
    }
}