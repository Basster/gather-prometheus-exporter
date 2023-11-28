FROM node:lts-alpine AS builder

WORKDIR /build

COPY . /build/

RUN set -eux; \
    yarn install --prod; \
    yarn build; 

FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /build/node_modules /node_modules
COPY --from=builder /build/dist /app

ENTRYPOINT ["/usr/local/bin/node", "/app/main.js"]
