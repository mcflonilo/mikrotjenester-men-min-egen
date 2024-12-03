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
