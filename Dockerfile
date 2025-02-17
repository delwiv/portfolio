FROM node:22-slim AS builder

RUN npm i -g npm

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY postcss.config.mjs next.config.mjs jsconfig.json tailwind.config.mjs sanity.config.js /app/
COPY src /app/src
COPY public /app/public

RUN npm run build

FROM node:22-slim AS runner

WORKDIR /app

COPY package.json package-lock.json /app

RUN npm i --omit=dev

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

COPY .env /app

CMD ["npm" , "start"]

