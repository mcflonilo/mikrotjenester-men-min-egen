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
    public Map<String, Integer> createShoppingList(@RequestBody List<Map<String, Object>> ingredients, @RequestParam(required = false) boolean sendToRabbitMQ) {
        Map<String, Integer> consolidatedIngredients = shoppingListService.consolidateIngredients(ingredients);
        System.out.println(consolidatedIngredients);

        if (sendToRabbitMQ) {
            Map<String, Object> rabbitMQMessage = Map.of(
                    "to", "lm.opheim39@gmail.com",
                    "subject", "Shopping List",
                    "text", consolidatedIngredients.toString()
            );
            rabbitTemplate.convertAndSend("shoppingListQueue", rabbitMQMessage);
            System.out.println(rabbitMQMessage);
        }

        return consolidatedIngredients;
    }
}