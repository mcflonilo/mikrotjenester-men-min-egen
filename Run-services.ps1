# Start the Consul service
Write-Output "Starting Consul service..."
Start-Process -NoNewWindow -FilePath "consul" -ArgumentList "agent -dev -node=cards -client=0.0.0.0 -log-level=INFO"

# Start the RabbitMQ service
Write-Output "Starting RabbitMQ service..."
Start-Process -NoNewWindow -FilePath "rabbitmq-server"

# Function to start a service
function Start-Service {
    param (
        [string]$serviceName,
        [string]$servicePort
    )
    Write-Output "Starting $serviceName on port $servicePort..."
    Start-Process -NoNewWindow -FilePath "mvn" -ArgumentList "spring-boot:run" -WorkingDirectory $serviceName
}

# Start each service
Start-Service "EmailService" 8083
Start-Service "FoodFetcher" 8081
Start-Service "ShoppingListService" 8082
Start-Service "RecipeService" 8084
Start-Service "Gateway" 8000
Start-Service "LoginService" 8080
Start-Service "UserService" 8085