
Architecture diagram:
![arbeidskrav mikrotjenester](https://github.com/user-attachments/assets/99f9bf73-d143-4cde-9c2d-a1e96e16eb66)


microservices2024

PG3402 - 2024 version
Running the Project
Using Docker

To run the project using Docker, execute the following command in the root directory (login does not work):

docker-compose -f docker/docker-compose-services.yml up

Without Docker

To run the services manually, follow these steps:

    Start Consul:

    consul agent -dev

Start RabbitMQ:

rabbitmq-server

Start the Frontend:

cd ./frontend/
npm run dev

Start the Services:
Navigate to each service folder and run:

mvn spring-boot:run

    The relevant folders are:
        EmailService
        FoodFetcher
        Gateway
        LoginService
        RecipeService
        ShoppingListService
        UserService

User Stories
User Story 1: Grocery List Organization

As a meal prep enthusiast, I want to generate a grocery list based on my selected recipes so that I can shop efficiently and ensure I have all the ingredients I need for the week ahead.
User Story 2: Easy Recipe Access

As a novice cook, I want to browse simple, step-by-step recipes with clear instructions and ingredient lists so that I can confidently prepare delicious meals without feeling overwhelmed.
User Story 3: Detailed Nutritional Breakdown

As a fitness enthusiast, I want to view comprehensive nutritional information for each recipe, including calorie counts, macronutrient ratios, and ingredient benefits, so that I can make informed choices that align with my dietary regimen.
User Story 4: Favorite Recipe Management

As a culinary enthusiast, I want to mark recipes as favorites so that I can easily find and revisit the dishes I enjoy the most without having to search for them repeatedly.
User Story 5: Allergy-Friendly Recipe Sorting

As an individual with dietary restrictions, I want to sort recipes based on common allergens (e.g., nuts, gluten, dairy) so that I can quickly find meals that are safe and suitable for my needs.
User Story 6: Custom Recipe Creation

As a creative cook, I want to add and save my own recipes with ingredients and instructions so that I can build a personalized collection of meals to reference and share.
