// File: UserService/src/main/java/com/example/userservice/service/RabbitMQProducer.java

package com.example.userservice.service;

import com.example.userservice.model.Favorite;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(Favorite favorite) {
        rabbitTemplate.convertAndSend("favoriteQueue", favorite);
    }
}