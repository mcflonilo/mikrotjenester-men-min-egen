// FoodFetcher/src/main/java/com/example/foodfetcher/FoodFetcherApplication.java
package com.example.foodfetcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import com.example.foodfetcher.FoodService.*;
@SpringBootApplication
@EnableCaching
public class FoodFetcherApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodFetcherApplication.class, args);
        FoodService foodService = new FoodService();
        System.out.println(foodService.fetchFoods().get(0).getFoodId());
    }
}