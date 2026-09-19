# ServiceFlow

Industry services frontend with customer requests, manufacturer registration,
laboratory operations, report tracking and demonstration payment flows.

## Run locally

Use Node.js 22.18+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:8080.

## Verify and build

```sh
npm run lint
npx tsc --noEmit
node --test tests/workflow.test.mjs
npm run build
```

The app uses React, TypeScript, TanStack Start, Tailwind CSS and Nitro.
The build uses standard framework plugins directly. Nitro selects the deployment
target from the build environment, including Vercel.

For Vercel, import this repository with the repository root as the project root,
select TanStack Start, and use `npm run build`. Leave the output directory automatic.
See the [TanStack Start deployment guide](https://vercel.com/docs/frameworks/full-stack/tanstack-start).

## Demonstration

See [DEMO.md](./DEMO.md) for the complete status workflow walkthrough.
Application data is illustrative. Status changes persist in browser storage and
sync between tabs on the same origin. There is no backend, live payment processing
or cross-device data synchronization.
