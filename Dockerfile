FROM oven/bun:latest

WORKDIR /app

COPY package.json bunfig.toml ./
RUN bun install

COPY . .

CMD ["bun", "run", "index.tsx"]
