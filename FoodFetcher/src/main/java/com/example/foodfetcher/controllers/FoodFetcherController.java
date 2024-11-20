// FoodFetcher/src/main/java/com/example/foodfetcher/controllers/FoodFetcherController.java
package com.example.foodfetcher.controllers;

import com.example.foodfetcher.FoodService;
import com.example.foodfetcher.model.Food;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FoodFetcherController {

    private final FoodService foodService;

    public FoodFetcherController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/api/food")
    @Cacheable("foods")
    public List<Food> getFoods() {
        try {
            return foodService.fetchFoods();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/api/food/{ids}")
    public List<Food> getSpecificFoods(@PathVariable List<Integer> ids) {
        try {
            List<Food> foods = foodService.fetchFoods();
            List<Food> specificFoods = new ArrayList<>();
            for (int i = 0; i < ids.size(); i++) {
                specificFoods.add(foods.get(ids.get(i)));
            }
            System.out.println("Specific foods: " + specificFoods);
            return specificFoods;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}