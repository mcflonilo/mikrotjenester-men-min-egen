package com.example.shoppinglistservice.controller;

import com.example.shoppinglistservice.service.ShoppingListService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shoppinglist")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping
    public Map<String, Integer> createShoppingList(@RequestBody Map<String, Object> requestBody, @RequestParam(required = false) boolean sendToRabbitMQ) {
        List<Map<String, Object>> ingredientsList = (List<Map<String, Object>>) requestBody.get("text");
        String email = (String) requestBody.get("to");
        String subject = (String) requestBody.get("subject");
        System.out.println("episk test");

        Map<String, Integer> consolidatedIngredients = shoppingListService.consolidateIngredients(ingredientsList);
        String formattedIngredients = shoppingListService.formatIngredientsForEmail(consolidatedIngredients);
        System.out.println(formattedIngredients);

        if (sendToRabbitMQ) {
            Map<String, Object> rabbitMQMessage = Map.of(
                    "to", email,
                    "subject", subject,
                    "text", formattedIngredients
            );
            rabbitTemplate.convertAndSend("shoppingListQueue", rabbitMQMessage);
            System.out.println(rabbitMQMessage);
        }

        return consolidatedIngredients;
    }
}