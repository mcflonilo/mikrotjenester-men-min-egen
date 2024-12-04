#!/bin/bash

# Start the Consul service
echo "Starting Consul service..."
consul agent -dev -node=cards -client=0.0.0.0 -log-level=INFO &
CONSUL_PID=$!

# Start the RabbitMQ service
echo "Starting RabbitMQ service..."
rabbitmq-server &
RABBITMQ_PID=$!

# Function to start a service
start_service() {
  local service_name=$1
  local service_port=$2
  echo "Starting $service_name on port $service_port..."
  (cd $service_name && mvn spring-boot:run) &
}

# Start each service
start_service "EmailService" 8083
start_service "FoodFetcher" 8081
start_service "ShoppingListService" 8082
start_service "RecipeService" 8084
start_service "Gateway" 8000
start_service "LoginService" 8080
start_service "UserService" 8085

# Wait for all services to finish
wait $CONSUL_PID $RABBITMQ_PID