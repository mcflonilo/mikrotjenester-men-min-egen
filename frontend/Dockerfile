# Step 1: Build the React-Vite application
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:1.25

# Copy the build output from the previous stage to Nginx's HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
