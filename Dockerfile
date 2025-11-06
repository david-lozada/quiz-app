# Stage 1: Builder
FROM node:lts-krypton AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build
RUN npm run build



# Stage 2: The Runtime Stage
# Purpose: Serves the compiled static assets using a minimal Nginx server.
FROM nginx:stable-alpine

# Remove the default Nginx index.html and configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the custom Nginx configuration for Single Page Application (SPA) routing
# This config ensures /route/path always serves index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage (/app/dist) to the Nginx serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the standard HTTP port
EXPOSE 80

# The default CMD of the Nginx image runs the server in the foreground
# CMD ["nginx", "-g", "daemon off;"]