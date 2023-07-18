# Install dependencies only when needed
FROM node:18.12.1-bullseye AS deps

WORKDIR /app
COPY .yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:18.12.1-bullseye AS builder

ARG APP_NEXT_PUBLIC_URL
ARG APP_NEXT_PUBLIC_API_URL
ARG APP_NEXT_PUBLIC_TITILER_API_URL
ARG APP_NEXT_PUBLIC_MAPBOX_API_TOKEN
ARG APP_NEXT_PUBLIC_GA_TRACKING_ID

ENV NEXT_PUBLIC_URL $APP_NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_API_URL $APP_NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_TITILER_API_URL $APP_NEXT_PUBLIC_TITILER_API_URL
ENV NEXT_PUBLIC_MAPBOX_API_TOKEN $APP_NEXT_PUBLIC_MAPBOX_API_TOKEN
ENV NEXT_PUBLIC_GA_TRACKING_ID $APP_NEXT_PUBLIC_GA_TRACKING_ID

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM node:18.12.1-bullseye AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.mjs if you are NOT using the default configuration
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
