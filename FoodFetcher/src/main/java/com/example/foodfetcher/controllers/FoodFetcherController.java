package com.example.foodfetcher.controllers;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class FoodFetcherController {

    @Cacheable("foodData")
    @GetMapping("/api/food")
    public String getFood() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.matvaretabellen.no/api/nb/foods.json";
        return restTemplate.getForObject(url, String.class);
    }
}