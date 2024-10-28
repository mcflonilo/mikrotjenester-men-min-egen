// FoodFetcher/src/main/java/com/example/foodfetcher/controllers/FoodFetcherController.java
package com.example.foodfetcher.controllers;

import com.example.foodfetcher.FoodService;
import com.example.foodfetcher.model.Food;
import com.example.foodfetcher.model.FoodResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@RestController
public class FoodFetcherController {


    @GetMapping("/api/food/{ids}")
    public List<Food> getSpecificFoods(@PathVariable List<Integer> ids) {
        try {
            FoodService foodService = new FoodService();
            List<Food> foods = foodService.fetchFoods();
            List<Food> specificFoods = new ArrayList<>();
            for (int i = 0; i < ids.size(); i++) {
                specificFoods.add(foods.get(ids.get(i)));
            }
            return specificFoods;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}