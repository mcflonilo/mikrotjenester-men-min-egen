// File: UserService/src/main/java/com/example/userservice/model/Favorite.java

package com.example.userservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private Long recipeId;

    // Constructor
    public Favorite(String userId, Long recipeId) {
        this.userId = userId;
        this.recipeId = recipeId;
    }

    // Default constructor
    public Favorite() {}

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for userId
    public String getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(String userId) {
        this.userId = userId;
    }

    // Getter for recipeId
    public Long getRecipeId() {
        return recipeId;
    }

    // Setter for recipeId
    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }
}