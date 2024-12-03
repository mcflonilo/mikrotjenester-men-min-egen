// File: UserService/src/main/java/com/example/userservice/controller/UserController.java

package com.example.userservice.controller;

import com.example.userservice.model.Favorite;
import com.example.userservice.repository.FavoriteRepository;
import com.example.userservice.service.RabbitMQProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
public class UserController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private RabbitMQProducer rabbitMQProducer;

    @GetMapping
    public List<Favorite> getFavorites(@RequestParam String userId) {
        try {
            return favoriteRepository.findByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping
    public String addFavorite(@RequestBody Favorite favorite) {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndRecipeId(favorite.getUserId(), favorite.getRecipeId());
        if (existingFavorite.isPresent()) {
            return "Favorite already exists.";
        }
        rabbitMQProducer.sendMessage(favorite);
        return "Favorite addition request sent to the queue.";
    }

    @DeleteMapping
    public String removeFavorite(@RequestParam String userId, @RequestParam Long recipeId) {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndRecipeId(userId, recipeId);
        if (existingFavorite.isPresent()) {
            favoriteRepository.delete(existingFavorite.get());
            return "Favorite removed.";
        } else {
            return "Favorite not found.";
        }
    }
}