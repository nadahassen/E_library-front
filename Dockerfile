# Stage 1: Build the Angular app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the Angular project files
COPY . .

# Build the Angular project
RUN npm run build -- --project=material-dashboard-angular --configuration production


# Stage 2: Serve the Angular app with nginx
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]