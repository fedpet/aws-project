FROM node:14-alpine

# set working direction
WORKDIR /app

# Add everything in the current directory to our image, in the 'app' folder.
COPY . ./

# Install dependencies
RUN npm install --production

# Run our app.
CMD ["npm", "run", "prod"]