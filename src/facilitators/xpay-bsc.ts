import { Network, AccessType } from '../types';
import { USDC_BSC_TOKEN } from '../constants';

import type { Facilitator, FacilitatorConfig } from '../types';

/** X Pay BSC facilitator (Permit2) — mount path /bsc on the X Pay host. */
export const xpayBsc: FacilitatorConfig = {
  url: 'https://facilitator-xpay.llc/bsc',
};

export const xpayBscFacilitator = {
  id: 'xpay-bsc',
  metadata: {
    name: 'X Pay BSC',
    image: 'https://x402scan.com/xpay.png',
    docsUrl: 'https://xpay.llc/docs',
    color: '#F0B90B',
  },
  config: xpayBsc,
  facilitatorUrl: xpayBsc.url,
  accessType: AccessType.PUBLIC,
  fee: 0,
  addresses: {
    [Network.BSC]: [
      {
        // Same settler EOA as Base until a dedicated BSC key is provisioned
        address: '0x589a2314a2e05f45e40c4823da3ba58d421db3d8',
        tokens: [USDC_BSC_TOKEN],
        dateOfFirstTransaction: new Date('2026-10-01'),
      },
    ],
  },
} as const satisfies Facilitator;
