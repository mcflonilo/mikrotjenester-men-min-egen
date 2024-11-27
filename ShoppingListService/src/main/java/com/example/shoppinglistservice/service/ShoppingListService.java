package com.example.shoppinglistservice.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ShoppingListService {

    public Map<String, Integer> consolidateIngredients(List<Map<String, Object>> ingredientsList) {
        Map<String, Integer> consolidatedIngredients = new HashMap<>();

        for (Map<String, Object> ingredient : ingredientsList) {
            String foodName = (String) ingredient.get("foodName");
            Integer quantity = (Integer) ingredient.get("quantity");

            consolidatedIngredients.merge(foodName, quantity, Integer::sum);
            System.out.println(consolidatedIngredients.toString());
        }

        return consolidatedIngredients;
    }
    public String formatIngredientsForEmail(Map<String, Integer> ingredients) {
        return ingredients.entrySet().stream()
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.joining("\n"));
    }
}