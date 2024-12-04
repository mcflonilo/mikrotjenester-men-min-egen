# PG3402 - 2024 Version

## Microservices Project

### Project Overview
This project focuses on creating a website that simplifies meal planning and preparation for users. Unlike many existing platforms, this site prioritizes accessibility by avoiding paywalls for essential features, such as viewing detailed macronutrient information or saving recipes to user profiles. Additionally, it caters specifically to students and individuals with limited funds or cooking equipment, providing affordable meal options that can be prepared with minimal resources (e.g., a single stovetop burner or a microwave).

Key features of the project include:

1. **Shopping List Generator:** Automatically generates shopping lists based on selected recipes, ensuring users have all the ingredients they need without the stress of last-minute grocery runs.

2. **Community Engagement:** A forum for users to share recipes and tips on making affordable, nutritious, and easy meals, fostering a sense of collaboration and support.

3. **Nutritional Insights:** Each recipe includes detailed nutritional information, helping users make informed decisions about their meals and align with specific dietary needs or goals.

By focusing on these elements, the website aims to not only make cooking easier but also inspire healthier eating habits and build a supportive community of food enthusiasts.

### Architecture Diagram
![Architecture Diagram](https://github.com/user-attachments/assets/99f9bf73-d143-4cde-9c2d-a1e96e16eb66)


### Running the Project

#### Prerequisites
Ensure you have the following installed:


   Java Development Kit (JDK)
        Ensure you have Java JDK installed on your system.

   Apache Maven
        Install Apache Maven for building and managing Java projects.

   Node.js and npm
        Install Node.js and npm for running the frontend application.

   Docker (optional)
        Install Docker if you prefer running the services using Docker.

   Consul
        Install and configure Consul for service discovery.

   RabbitMQ
        Install and configure RabbitMQ for message brokering.


#### Using Docker
To run the project using Docker, execute the following commands in the root directory:

```bash
# Start all services
docker-compose -f docker/docker-compose-services.yml up

# Start the Login Service manually
cd ./LoginService/
mvn spring-boot:run
```

> **Note:** Login functionality does not work when using Docker.

#### Without Docker
To manually run the services, follow these steps:

1. **Start Consul:**

   ```bash
   consul agent -dev
   ```

2. **Start RabbitMQ:**

   ```bash
   rabbitmq-server
   ```

3. **Start the Frontend:**

   ```bash
   cd ./frontend/
   npm run dev
   ```

4. **Start the Services:**

   Navigate to each service folder and run the following command:

   ```bash
   mvn spring-boot:run
   ```

   The relevant service folders are:
   - `EmailService`
   - `FoodFetcher`
   - `Gateway`
   - `LoginService`
   - `RecipeService`
   - `ShoppingListService`
   - `UserService`

---

## User Stories

### 1. Grocery List Organization
**As a** meal prep enthusiast,  
**I want to** generate a grocery list based on my selected recipes  
**So that I can** shop efficiently and ensure I have all the ingredients I need for the week ahead.

### 2. Easy Recipe Access
**As a** novice cook,  
**I want to** browse simple, step-by-step recipes with clear instructions and ingredient lists  
**So that I can** confidently prepare delicious meals without feeling overwhelmed.

### 3. Detailed Nutritional Breakdown
**As a** fitness enthusiast,  
**I want to** view comprehensive nutritional information for each recipe, including calorie counts, macronutrient ratios, and ingredient benefits  
**So that I can** make informed choices that align with my dietary regimen.

### 4. Favorite Recipe Management
**As a** culinary enthusiast,  
**I want to** mark recipes as favorites  
**So that I can** easily find and revisit the dishes I enjoy the most without having to search for them repeatedly.

### 5. Allergy-Friendly Recipe Sorting
**As an** individual with dietary restrictions,  
**I want to** sort recipes based on common allergens (e.g., nuts, gluten, dairy)  
**So that I can** quickly find meals that are safe and suitable for my needs.

### 6. Custom Recipe Creation
**As a** creative cook,  
**I want to** add and save my own recipes with ingredients and instructions  
**So that I can** build a personalized collection of meals to reference and share.

---

### Hashtags
#microservices2024

