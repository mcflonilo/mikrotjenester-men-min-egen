

Starting consul
- a consul agent is started, in development mode, with a name "cards" (name may vary)
- template:
- consul agent -dev -node <nodeName>

- example:
- consul agent -dev -node cards

Starting rabbitMQ
- the rabbitmq server is started ("sudo" for admin priviledges)
sudo rabbitmq-server

Starting individual services
- start services with default properties
mvn spring-boot:run 
- start service with command-line specified port
- template:
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=<portNumber>
- example:
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8083


starting the frontend:
- navigate to the frontend directory
- run the following command:
- npm start
- the frontend will be available at http://localhost:3000

consul is at http://localhost:8500

rabbitmq is at http://localhost:15672

h2-console is at http://localhost:8082/h2-console