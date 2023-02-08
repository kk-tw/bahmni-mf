FROM node as builder

WORKDIR /var/lib/app/
COPY . .

ARG PUBLIC_URL
ARG COMPONENTS_URL=http://localhost:3000/components
RUN yarn
RUN yarn build

FROM nginx:1.17.7

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/lib/app/dist/ /var/www/
