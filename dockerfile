FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY . .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]