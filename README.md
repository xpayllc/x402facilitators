# swader/x402facilitators

The `@swader/x402facilitators` package offers a unified, drop-in configuration
for all x402 facilitators

## 🌐 Live Website

View all facilitators in a mobile-friendly interface at
[facilitators.x402.watch](https://facilitators.x402.watch) (or build your own
locally!)

### Build & Serve the Website Locally

This project includes a static website generator built with Bun:

```bash
# Quick start - build and serve in one command
./serve.sh

# Or manually:
bun run build:website
cd dist && npx http-server -p 8080
# Open http://localhost:8080 in your browser
```

## Installation

```bash
bun add @swader/x402facilitators
# or
npm install @swader/x402facilitators
# or
yarn add @swader/x402facilitators
```

## Quick Start

### Minimal Example

```typescript
import { coinbase, thirdweb } from '@swader/x402facilitators';

paymentMiddleware(
  address,
  resources,
  coinbase // easily interchange any facilitator
);

paymentMiddleware(
  address,
  resources,
  thirdweb // easily interchange any facilitator
);
```

## Auto Facilitator

The `auto` facilitator is a proxy that load-balances between other facilitators
to guarantee uptime. Simply import and use it directly - no configuration
required:

```typescript
import { auto } from '@swader/x402facilitators';

paymentMiddleware(address, resources, auto);
```

## Resource Discovery

Some facilitators support **discovery** - the ability to list all x402-protected
resources they're facilitating.

This is useful for building agents that search for tools.

### Discovery API

```typescript
import { coinbaseDiscovery, kamiyoDiscovery, listAllFacilitatorResources } from '@swader/x402facilitators';

// List all resources from a facilitator
const resources = await listAllFacilitatorResources(coinbaseDiscovery);

// Or from KAMIYO (multi-chain)
const kamiyoResources = await listAllFacilitatorResources(kamiyoDiscovery);
```

### Facilitators Supporting Discovery

The following facilitators currently support resource discovery:

- **Coinbase** - Enterprise-grade facilitator with SDK
- **AurraCloud** - Infrastructure-focused facilitator
- **thirdweb** - Web3 development platform
- **PayAI** - AI-payment infrastructure
- **Ultravioleta DAO** - Community-driven multichain facilitator
- **KAMIYO** - Multi-chain AI facilitator
- **Questflow** - AI workflow automation platform

### Enumerate All Discoverable Facilitators

The package also exports a list of all facilitators that support discovery:

```typescript
import {
  discoverableFacilitators,
  listAllFacilitatorResources,
} from '@swader/x402facilitators';

await Promise.all(
  discoverableFacilitators.map(facilitator =>
    listAllFacilitatorResources(facilitator)
  )
);
```

## Available Facilitators

This package includes pre-configured integrations for the following X402 facilitators:

| Facilitator    | Networks      | Discovery | Setup Required                 |
| -------------- | ------------- | --------- | ------------------------------ |
| **Auto**       | BASE          | No        | No                             |
| **Coinbase**   | BASE, SOLANA  | ✅ Yes    | Yes - Requires CDP API Creds   |
| **AurraCloud** | BASE          | ✅ Yes    | Yes - API key                  |
| **thirdweb**   | BASE, POLYGON | ✅ Yes    | Yes - Secret key               |
| **PayAI**      | BASE, SOLANA  | ✅ Yes    | No                             |
| **Daydreams**  | BASE, SOLANA  | No        | No                             |
| **X402rs**     | BASE, POLYGON | No        | No                             |
| **Polygon**    | POLYGON       | No        | No                             |
| **Corbits**    | SOLANA        | No        | No                             |
| **Dexter**     | SOLANA        | No        | No                             |
| **Mogami**     | BASE          | No        | No                             |
| **OpenX402**   | BASE, SOLANA  | No        | No                             |
| **Questflow**  | BASE          | ✅ Yes    | Yes - API key                  |
| **xEcho**      | BASE          | No        | No                             |
| **CodeNut**    | BASE          | No        | No                             |
| **Ultravioleta DAO** | BASE, SOLANA | ✅ Yes    | No                             |
| **Virtuals**   | BASE          | No        | No                             |
| **402104**     | BASE          | No        | No                             |
| **KAMIYO**     | BASE, POLYGON, SOLANA | ✅ Yes    | No                             |
| **Heurist**    | BASE          | No        | No                             |
| **X Pay**      | BASE          | No        | Yes                            |

### Import Individual Facilitators

```typescript
// Simple facilitators (no setup)
import {
  auto,
  coinbase,
  payai,
  daydreams,
  x402rs,
  polygon,
  corbits,
  dexter,
  mogami,
  openx402,
  xecho,
  codenut,
  ultravioletadao,
  virtuals,
  f402104,
  kamiyo,
  heurist,
  xpay
} from '@swader/x402facilitators';

// Facilitators requiring setup
import { aurracloud, thirdweb, questflow } from '@swader/x402facilitators';

aurracloud({
  apiKey: process.env.AURRACLOUD_API_KEY,
});

questflow({
  apiKey: process.env.QUESTFLOW_API_KEY,
});

thirdweb({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});
```

### Access Facilitator Metadata

```typescript
import { coinbaseFacilitator, payaiFacilitator } from '@swader/x402facilitators';

console.log(coinbaseFacilitator);
// {
//   id: 'coinbase',
//   metadata: {
//     name: 'Coinbase',
//     image: 'https://x402scan.com/coinbase.png',
//     docsUrl: 'https://docs.cdp.coinbase.com/x402/welcome',
//     color: '#2563EB'
//   },
//   config: { ... },
//   addresses: { base: [...], solana: [...] },
//   discoveryConfig: { ... }
// }
```

## Types

### `Facilitator<Props>`

Represents a complete facilitator with configuration and metadata:

```typescript
interface Facilitator<Props = void> {
  id: string; // Unique identifier
  metadata: FacilitatorMetadata; // Display info (name, image, docs)
  config: FacilitatorConfig | FacilitatorConfigConstructor<Props>;
  addresses: Partial<Record<Network, FacilitatorAddress[]>>;
  discoveryConfig?: FacilitatorConfig; // For resource discovery
}
```

### `FacilitatorConfig`

Configuration passed to X402 middleware for payment verification:

```typescript
// From 'x402/types'
type FacilitatorConfig = {
  url: string; // Facilitator API endpoint
};
```

### `FacilitatorConfigConstructor<Props>`

For facilitators requiring initialization parameters:

```typescript
type FacilitatorConfigConstructor<Props = void> = (
  requirements: Props
) => FacilitatorConfig;
```

**Example - Simple facilitator (no setup required):**

```typescript
import { payai } from '@swader/x402facilitators';

// Use directly - just a URL configuration
paymentMiddleware(address, resources, payai);
```

**Example - Facilitator with required props:**

```typescript
import { aurracloud } from '@swader/x402facilitators';

// Must call with required props first
paymentMiddleware(
  address,
  resources,
  aurracloud({ apiKey: process.env.AURRACLOUD_API_KEY })
);
```

### `FacilitatorMetadata`

Display information for UIs:

```typescript
interface FacilitatorMetadata {
  name: string; // Display name
  image: string; // Logo URL
  docsUrl: string; // Documentation link
  color: string; // Brand color
}
```

### `Network`

Supported blockchain networks:

```typescript
enum Network {
  BASE = 'base',
  POLYGON = 'polygon',
  SOLANA = 'solana',
}
```

## Development

This project is built with [Bun](https://bun.sh) for optimal performance and
developer experience.

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Setup

```bash
# Install dependencies
bun install

# Type check
bun run check:types

# Lint code
bun run lint

# Build library
bun run build:lib

# Build website
bun run build:website

# Build everything (library + website)
bun run build
```

### Adding a New Facilitator

1. Create a new file in `src/facilitators/your-facilitator.ts`
2. Export the config and facilitator object following the pattern:

    ```typescript
    import type { Facilitator, FacilitatorConfig } from '../types';

    export const yourfacilitator: FacilitatorConfig = {
      url: 'https://your-facilitator-url.com',
    };

    export const yourfacilitatorFacilitator = {
      id: 'yourfacilitator',
      metadata: {
        name: 'Your Facilitator',
        image: 'https://x402scan.com/your-logo.png',
        docsUrl: 'https://docs.yourfacilitator.com',
        color: '#000000',
      },
      config: yourfacilitator,
      addresses: {
        // Network addresses
      },
    } as const satisfies Facilitator;
    ```

3. Add exports to `src/facilitators/index.ts`
4. Add to the list in `src/lists/all.ts`
5. Rebuild: `bun run build`

After the PR is merged and a new release is tagged, your facilitator will appear
on both the website and in the lib.

### X Pay merchant authentication

X Pay verification and settlement require a merchant API key. Keep the key on your server.

```typescript
const facilitator = xpay({ apiKey: process.env.XPAY_API_KEY! });
```

Capabilities are public at https://facilitator-xpay.llc/supported. Integration guide and onboarding: https://facilitator-xpay.llc/docs.
