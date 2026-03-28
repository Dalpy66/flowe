FROM node:24.14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@21.2.3

COPY . .

RUN ng build 

FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/my-garden/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]