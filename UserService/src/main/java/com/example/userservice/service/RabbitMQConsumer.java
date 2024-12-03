// File: UserService/src/main/java/com/example/userservice/service/RabbitMQConsumer.java

package com.example.userservice.service;

import com.example.userservice.model.Favorite;
import com.example.userservice.repository.FavoriteRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQConsumer {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @RabbitListener(queues = "favoriteQueue")
    public void receiveMessage(Favorite favorite) {
        System.out.println("Received favorite: :)" + favorite.getRecipeId());
        favoriteRepository.save(favorite);
    }
}