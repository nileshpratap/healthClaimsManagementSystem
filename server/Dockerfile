# Dockerfile for React client

# Build node client
FROM node:20.11.0-bullseye

# Set the working directory to D:\Docker
WORKDIR /Docker

# port export 5000
EXPOSE 5000

# Copy the package.json file into the container
COPY package*.json .

# Copy the rest of the application code into the container
COPY . .

# Install dependencies
RUN npm install
RUN npx prisma generate

# Command to run your application
CMD ["npm", "start"]