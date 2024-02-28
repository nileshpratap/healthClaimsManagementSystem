# Dockerfile for React client

# Build react client
FROM node:18-alpine

# Set the working directory to D:\Docker
WORKDIR /Docker

# port export 3000
EXPOSE 3000

# Copy the package.json file into the container
COPY package*.json .

# Copy the rest of the application code into the container
COPY . .

# Install dependencies
RUN npm install

# Command to run your application
CMD ["npm", "start"]