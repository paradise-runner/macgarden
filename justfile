download:
    curl -o ./public/data.json https://browser.geekbench.com/mac-benchmarks.json
start:
    bun dev
preview:
    npm run preview --legacy-peer-deps
deploy:
    npm run deploy --legacy-peer-deps
build:
    bun run build
update:
    sed -i '' "s/const deviceData = .*/const deviceData = $(jq -c . ./public/data.json);/g" src/lib/devices.ts
    sed -i '' '/devices: \[/,$d' src/lib/devices.ts
fresh-start:
    just download && just update && just format && just start
fresh-deploy:
    just download && just update&& just format && just deploy
test:
    bun run test:e2e
lint:
    bun run lint
fmt:
    bun run format
format:
    just fmt
check:
     bun run check-formatting && just lint