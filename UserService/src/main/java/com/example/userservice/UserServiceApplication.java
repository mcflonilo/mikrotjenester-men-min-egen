package com.example.userservice;

import com.example.userservice.model.Favorite;
import com.example.userservice.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class UserServiceApplication {

    @Autowired
    private FavoriteRepository recipeRepository;

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

}