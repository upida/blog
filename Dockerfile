FROM oven/bun:1 AS build

WORKDIR /home/bun/app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun --bun run build

FROM oven/bun:1 AS production

WORKDIR /home/bun/app

COPY --from=build /home/bun/app/node_modules ./node_modules
COPY --from=build /home/bun/app/.output ./.output

COPY --from=build /home/bun/app/content ./content

ENV PORT=5000
ENV HOST=0.0.0.0

EXPOSE 5000
CMD [ "bun", "--bun", "run", "./.output/server/index.mjs" ]
