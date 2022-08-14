This is a front end implementation to show the pools and transaction on uniswap protocol.
([DEMO HERE](https://pool-web.vercel.app/))

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pool Dashboard
- Shows a list of first 100 pools.
- Shows a list if Saved/Favorite pool. That is persisted in the local storage.
- Mobile scree will hide few columns to fit the content.

## Pool Detail Page
- Shows a detailed view of the pool and the transactions.
- The transactions include mints/swaps/burns. (defaults all)
- Add to Favorite icon to save pool id to local storage.
- Mobile scree will hide few columns to fit the content.
