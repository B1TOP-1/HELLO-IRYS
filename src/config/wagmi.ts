import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'

// 定义 Irys 测试网
export const irysTestnet = defineChain({
  id: 1270,
  name: 'Irys Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IRYS',
    symbol: 'IRYS',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'] },
    public: { http: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.irys.xyz' },
  },
  testnet: true,
})

// 使用 RainbowKit 的默认配置
export const config = getDefaultConfig({
  appName: 'Hello Irys',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 从 https://cloud.walletconnect.com 获取
  chains: [irysTestnet],
})

export const chains = [irysTestnet]

