FROM denoland/deno:alpine-2.3.1

WORKDIR /app

ENV DENO_DIR=/app/.cache

COPY . .

RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-read", "--allow-net", "main.ts"]