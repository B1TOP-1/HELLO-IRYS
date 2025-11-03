# NFT 合约部署信息

本文件夹包含了NFT合约的所有部署相关信息和文件。

## 📁 文件结构

```
deployment/
├── abi/                          # ABI文件夹
│   └── MintNFT.json             # 合约ABI (应用程序二进制接口)
├── scripts/                      # 部署和交互脚本
│   ├── deploy-nft.js            # 合约部署脚本
│   └── mint-example.js          # NFT铸造示例脚本
├── contract-info.json           # 合约详细信息
└── README.md                    # 本文件

```

## 📋 合约信息

### 基本信息
- **合约名称**: MintNFT
- **合约地址**: `0x8E842cA7AFa67d65C19B564D23fBB764F480227C`
- **部署账户**: `0xBcf44b94Cb014F336D91a6EB459e4004252921F8`
- **部署日期**: 2025-11-03

### 网络信息
- **网络**: Irys Testnet
- **Chain ID**: 1270
- **RPC URL**: https://testnet-rpc.irys.xyz/v1/execution-rpc

### NFT详情
- **NFT名称**: HELLO IRYS NFT
- **NFT符号**: HIRYSNFT
- **最大供应量**: 1000
- **每地址最大mint数**: 3
- **Metadata URI**: https://gateway.irys.xyz/B63ywEKnaGGv1puTVShBDQJDhmQVTx72Sym8FraGq1Gv

## 🚀 使用说明

### 1. 部署合约

```bash
npx hardhat run deployment/scripts/deploy-nft.js --network irys
```

### 2. Mint NFT

```bash
npx hardhat run deployment/scripts/mint-example.js --network irys
```

### 3. 验证合约

```bash
npx hardhat verify --network irys 0x8E842cA7AFa67d65C19B564D23fBB764F480227C "https://gateway.irys.xyz/B63ywEKnaGGv1puTVShBDQJDhmQVTx72Sym8FraGq1Gv"
```

## 📝 ABI 使用

合约ABI文件位于 `abi/MintNFT.json`，可用于：

### 在JavaScript/TypeScript中使用

```javascript
import MintNFTABI from './deployment/abi/MintNFT.json';
import { ethers } from 'ethers';

const contractAddress = '0x8E842cA7AFa67d65C19B564D23fBB764F480227C';
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.irys.xyz/v1/execution-rpc');
const contract = new ethers.Contract(contractAddress, MintNFTABI, provider);

// 调用合约方法
const totalSupply = await contract.totalSupply();
console.log('Total Supply:', totalSupply.toString());
```

### 在前端应用中使用

```javascript
// 使用Web3.js
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(
  MintNFTABI, 
  '0x8E842cA7AFa67d65C19B564D23fBB764F480227C'
);

// Mint NFT
await contract.methods.mint().send({ from: userAddress });
```

## 🔧 合约主要功能

### 查询函数（只读）
- `name()` - 获取NFT名称
- `symbol()` - 获取NFT符号
- `totalSupply()` - 获取当前已铸造数量
- `balanceOf(address)` - 查询地址的NFT余额
- `ownerOf(tokenId)` - 查询NFT所有者
- `tokenURI(tokenId)` - 获取NFT的metadata URI
- `remainingSupply()` - 获取剩余可铸造数量
- `remainingMintsForAddress(address)` - 查询地址还能铸造多少个
- `MAX_SUPPLY()` - 最大供应量 (1000)
- `MAX_PER_ADDRESS()` - 每地址最大铸造数 (3)

### 交易函数（需要gas）
- `mint()` - 铸造1个NFT
- `batchMint(uint256 amount)` - 批量铸造（1-3个）
- `ownerMint(address to, uint256 amount)` - 合约所有者专用铸造
- `setBaseURI(string newBaseURI)` - 更新metadata URI（仅所有者）
- `transferFrom(address from, address to, uint256 tokenId)` - 转移NFT
- `approve(address to, uint256 tokenId)` - 授权NFT
- `setApprovalForAll(address operator, bool approved)` - 批量授权

## 📊 合约事件

- `NFTMinted(address indexed minter, uint256 indexed tokenId)` - NFT铸造事件
- `Transfer(address indexed from, address indexed to, uint256 indexed tokenId)` - 转移事件
- `Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)` - 授权事件
- `BaseURIUpdated(string newBaseURI)` - URI更新事件

## 🔗 相关链接

- **Irys官网**: https://irys.xyz/
- **Irys文档**: https://docs.irys.xyz/
- **测试网水龙头**: (如果有的话)

## 📄 文件说明

### contract-info.json
包含合约的完整部署信息，格式化的JSON便于程序读取。

### abi/MintNFT.json
合约的ABI（Application Binary Interface），定义了合约的所有函数、事件和错误。这是与合约交互的必需文件。

### scripts/deploy-nft.js
部署脚本，用于将合约部署到区块链网络。

### scripts/mint-example.js
示例脚本，展示如何与已部署的合约交互并铸造NFT。

## ⚠️ 注意事项

1. 每个地址最多只能铸造3个NFT
2. 总供应量上限为1000个
3. 所有交易都需要支付gas费用
4. 确保钱包有足够的ETH支付gas费
5. 部署在测试网，仅用于测试目的

## 🛠️ 开发建议

如果需要修改合约参数或重新部署：

1. 修改 `contracts/MintNFT.sol`
2. 运行部署脚本
3. 更新 `deployment/contract-info.json` 中的合约地址
4. 更新 `deployment/abi/MintNFT.json`（如果合约接口有变化）

---

部署完成时间: 2025-11-03

