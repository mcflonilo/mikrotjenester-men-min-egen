// File: UserService/src/main/java/com/example/userservice/repository/FavoriteRepository.java

package com.example.userservice.repository;

import com.example.userservice.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(String userId);

    Optional<Favorite> findByUserIdAndRecipeId(String userId, Long recipeId);
}