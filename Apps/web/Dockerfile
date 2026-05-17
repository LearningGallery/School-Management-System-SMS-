FROM node:20-alpine AS base
# Silence the NPM update nag screen globally
# ENV NPM_CONFIG_UPDATE_NOTIFIER=false
# Install the latest n-1 major version of npm (v10.x)
RUN npm install -g npm@10

FROM base AS deps
WORKDIR /app
COPY package.json ./
# THIS is the critical line that creates node_modules!
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Bake the API URL into the build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs
RUN adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]