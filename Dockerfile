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

# build SvelteKit app
RUN yarn
RUN yarn build

# stage run
FROM nginx:1.18-alpine AS deploy-static

ENV PORT 80
EXPOSE 80
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
