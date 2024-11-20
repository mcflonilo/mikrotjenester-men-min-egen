// FoodFetcher/src/main/java/com/example/foodfetcher/FoodFetcherApplication.java
package com.example.foodfetcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
@SpringBootApplication
@EnableCaching
public class FoodFetcherApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodFetcherApplication.class, args);
    }
}