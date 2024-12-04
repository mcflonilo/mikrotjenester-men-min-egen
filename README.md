# microservices2024
PG3402 - 2024 version. 
to run the project using docker run this command in the root directory. (login does not work)
docker-compose -f docker/docker-compose-services.yml up

to run the services not using docker. run the following command in the folders containing services : mvn spring-boot:run
first start consul: consul agent -dev
then start rabbit: rabbitmq-server
then start the frontend: 
cd .\frontend\
npm run dev

then start the services:
run the following command in the folders containing services : mvn spring-boot:run
the relevant folders are EmailService, FoodFetcher, Gateway, LoginService, RecipeService, ShoppingListService and UserService

![arbeidskrav mikrotjenester](https://github.com/user-attachments/assets/99f9bf73-d143-4cde-9c2d-a1e96e16eb66)

user stories.
User Story 1: Grocery List Organization
As a meal prep enthusiast, I want to generate a grocery list based on my selected
recipes so that I can shop efficiently and ensure I have all the ingredients I need for the
week ahead.

User Story 2: Easy Recipe Access
As a novice cook, I want to browse simple, step-by-step recipes with clear instructions
and ingredient lists so that I can confidently prepare delicious meals without feeling
overwhelmed.

User Story 3: Detailed Nutritional Breakdown
As a fitness enthusiast, I want to view comprehensive nutritional information for each
recipe, including calorie counts, macronutrient ratios, and ingredient benefits, so that I
can make informed choices that align with my dietary regimen.

User Story 4: Favorite Recipe Management
As a culinary enthusiast, I want to mark recipes as favorites so that I can easily find and revisit the dishes I enjoy the most without having to search for them repeatedly.

User Story 5: Allergy-Friendly Recipe Sorting
As an individual with dietary restrictions, I want to sort recipes based on common allergens (e.g., nuts, gluten, dairy) so that I can quickly find meals that are safe and suitable for my needs.

User Story 6: Custom Recipe Creation
As a creative cook, I want to add and save my own recipes with ingredients and instructions so that I can build a personalized collection of meals to reference and share.
