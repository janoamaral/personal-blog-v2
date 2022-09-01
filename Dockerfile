# Our Node base image
FROM node:16-alpine as development

# Set the Node environment to development to ensure all packages are installed
ENV NODE_ENV development

# Change our current working directory
WORKDIR /usr/src/app

# Copy over `package.json` and lock files to optimize the build process
COPY ["package.json", "package-lock.json*", "./"]
# Install Node modules
RUN npm install

# Copy over rest of the project files
COPY . .

# Expose port 3000 for the SvelteKit app and 24678 for Vite's HMR
EXPOSE 3000
EXPOSE 24678

# Run `yarn dev` and set the host to 0.0.0.0 so we can access the web app from outside
CMD ["npm", "run", "dev", "--host", "0.0.0.0"]

# stage build
FROM node:16-alpine as build

WORKDIR /app

# copy everything to the container
COPY . .

# clean install all dependencies
RUN npm ci

# remove potential security issues
RUN npm audit fix
    
# build SvelteKit app
RUN npm run build

# stage run
FROM node:16-alpine

WORKDIR /app

# copy dependency list
COPY --from=0 /app/package*.json ./

# clean install dependencies, no devDependencies, no prepare script
RUN npm ci --production --ignore-scripts

# remove potential security issues
RUN npm audit fix

# copy built SvelteKit app to /app
COPY --from=0 /app/build ./

EXPOSE 3000
CMD ["node", "./index.js"]
