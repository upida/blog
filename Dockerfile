# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build

WORKDIR /home/bun/app

COPY package.json bun.lock* ./

# use ignore-scripts to avoid building node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

RUN bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production

WORKDIR /home/bun/app

# Copy node_modules and .output from build stage
COPY --from=build /home/bun/app/node_modules ./node_modules
COPY --from=build /home/bun/app/.output ./.output

# Copy content folder for server to read
COPY --from=build /home/bun/app/content ./content

# run the app
EXPOSE 3000/tcp
CMD [ "bun", "--bun", "run", "./.output/server/index.mjs" ]
