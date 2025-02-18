# FROM node:22-slim AS builder
#
# RUN npm i -g npm
#
# WORKDIR /app
#
# COPY package.json /app
# COPY package-lock.json /app
#
# RUN npm install
#
# COPY postcss.config.mjs next.config.mjs jsconfig.json tailwind.config.mjs sanity.config.js /app/
# COPY src /app/src
# COPY public /app/public
#
# RUN npm run build
#
# FROM node:22-slim AS runner
#
# WORKDIR /app
#
# COPY package.json package-lock.json /app
#
#
# COPY --from=builder /app/.next /app/.next
# COPY --from=builder /app/public /app/public
#
#
# COPY .env /app
#
# CMD ["npm" , "start"]
#
# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci 


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPT .env .

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
