// 部署NFT合约脚本（使用ethers.js）
// 注意：此脚本需要配合Hardhat或类似工具使用

import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("🚀 开始部署MintNFT合约...\n");

  // 从Irys获取的metadata URI
  // 新上传的metadata地址（名字：HELLO IRYS NFT）
  const metadataURI = "https://gateway.irys.xyz/B63ywEKnaGGv1puTVShBDQJDhmQVTx72Sym8FraGq1Gv";
  
  // 获取部署者账户
  const [deployer] = await ethers.getSigners();
  console.log("📝 部署账户:", deployer.address);
  console.log("💰 账户余额:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // 部署合约
  const MintNFT = await ethers.getContractFactory("MintNFT");
  console.log("⏳ 正在部署合约...");
  
  const mintNFT = await MintNFT.deploy(metadataURI);
  await mintNFT.waitForDeployment();

  const contractAddress = await mintNFT.getAddress();
  console.log("✅ 合约部署成功！\n");
  console.log("─".repeat(80));
  console.log("📋 合约信息:");
  console.log(`   地址          : ${contractAddress}`);
  console.log(`   名称          : ${await mintNFT.name()}`);
  console.log(`   符号          : ${await mintNFT.symbol()}`);
  console.log(`   最大供应量    : ${await mintNFT.MAX_SUPPLY()}`);
  console.log(`   每人最多mint  : ${await mintNFT.MAX_PER_ADDRESS()}`);
  console.log(`   Metadata URI  : ${metadataURI}`);
  console.log("─".repeat(80));
  
  console.log("\n🎉 部署完成！你现在可以：");
  console.log("   1. 调用 mint() 函数mint NFT");
  console.log("   2. 调用 batchMint(amount) 批量mint");
  console.log("   3. 在区块浏览器上验证合约");
  
  // 验证合约（可选）
  console.log("\n📝 验证合约命令（在区块浏览器上）：");
  console.log(`   npx hardhat verify --network <network-name> ${contractAddress} "${metadataURI}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

