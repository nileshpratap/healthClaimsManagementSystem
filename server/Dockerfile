# Dockerfile for React client

# Build react client
FROM node:debian-openssl-3.0.x

# Set the working directory to D:\Docker
WORKDIR /Docker

# port export 5000
EXPOSE 5000

# Copy the package.json file into the container
COPY package*.json .

# Copy the rest of the application code into the container
COPY . .

RUN apt-get update -y && apt-get install -y openssl

# Install dependencies
RUN npm install

# Command to run your application
CMD ["npm", "start"]