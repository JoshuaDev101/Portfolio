# Stage 1: Runner stage starts from the nginx:alpine image
FROM nginx:alpine AS runner

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

# Copy source files directly (no build step needed for plain HTML/CSS/JS)
COPY . .

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Inform Docker that the container is listening on port 80 at runtime
EXPOSE 80

# Define the command to run the app
ENTRYPOINT ["nginx", "-g", "daemon off;"]