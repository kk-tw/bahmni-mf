FROM node as builder

WORKDIR /var/lib/app/
COPY . .

ARG PUBLIC_URL
RUN yarn
RUN yarn build

FROM nginx:1.17.7

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/lib/app/dist/ /var/www/
