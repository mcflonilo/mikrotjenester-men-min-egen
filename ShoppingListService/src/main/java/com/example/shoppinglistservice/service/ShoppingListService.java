package com.example.shoppinglistservice.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShoppingListService {

    public Map<String, Integer> consolidateIngredients(List<Map<String, Object>> ingredients) {
        Map<String, Integer> consolidatedIngredients = new HashMap<>();

        for (Map<String, Object> ingredient : ingredients) {
            String foodName = (String) ingredient.get("foodName");
            int quantity = (int) ingredient.get("quantity");
            consolidatedIngredients.merge(foodName, quantity, Integer::sum);
        }

        return consolidatedIngredients;
    }
}