FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

# Aggressive memory optimization untuk VPS
ENV NODE_OPTIONS="--max-old-space-size=3072 --max-http-header-size=16384"

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "preview"]
