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
    just download && just update && just start
fresh-deploy:
    just download && just update && just deploy