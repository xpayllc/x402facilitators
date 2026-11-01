import type { Token } from './types';

const USDC_DECIMALS = 6;
const USDC_BSC_DECIMALS = 18;
const USDC_SOLANA = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // USDC on Base
const USDC_POLYGON = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'; // USDC on Polygon
const USDC_BSC = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'; // Binance-Peg USDC on BSC

export const USDC_BASE_TOKEN: Token = {
  address: USDC_BASE,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_SOLANA_TOKEN: Token = {
  address: USDC_SOLANA,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_POLYGON_TOKEN: Token = {
  address: USDC_POLYGON,
  decimals: USDC_DECIMALS,
  symbol: 'USDC',
};

export const USDC_BSC_TOKEN: Token = {
  address: USDC_BSC,
  decimals: USDC_BSC_DECIMALS,
  symbol: 'USDC',
};
