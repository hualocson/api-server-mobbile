FROM node:18.12-alpine
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run generate
EXPOSE 5001
CMD ["npm", "run", "production"]