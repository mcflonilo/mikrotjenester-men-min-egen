// FoodFetcher/src/main/java/com/example/foodfetcher/FoodService.java
package com.example.foodfetcher;

import com.example.foodfetcher.model.Food;
import com.example.foodfetcher.model.FoodResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FoodService {

    @Cacheable("foods")
    public List<Food> fetchFoods() {
        System.out.println("Fetching foods from the API...");
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.matvaretabellen.no/api/nb/foods.json";
        FoodResponse response = restTemplate.getForObject(url, FoodResponse.class);
        return response.getFoods();
    }
}