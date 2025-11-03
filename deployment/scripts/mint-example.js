// NFT mint示例脚本
const { ethers } = require("hardhat");

async function main() {
  // 替换为你部署的合约地址
  const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
  
  console.log("🎨 开始mint NFT...\n");
  
  // 获取签名者
  const [signer] = await ethers.getSigners();
  console.log("👤 mint地址:", signer.address);
  
  // 连接到合约
  const MintNFT = await ethers.getContractFactory("MintNFT");
  const mintNFT = MintNFT.attach(CONTRACT_ADDRESS);
  
  // 检查mint状态
  console.log("\n📊 当前状态:");
  const totalSupply = await mintNFT.totalSupply();
  const remainingSupply = await mintNFT.remainingSupply();
  const myMintCount = await mintNFT.mintedCount(signer.address);
  const myRemaining = await mintNFT.remainingMintsForAddress(signer.address);
  
  console.log(`   总供应量      : ${totalSupply} / ${await mintNFT.MAX_SUPPLY()}`);
  console.log(`   剩余可mint    : ${remainingSupply}`);
  console.log(`   我已mint      : ${myMintCount}`);
  console.log(`   我还能mint    : ${myRemaining}`);
  
  if (myRemaining > 0 && remainingSupply > 0) {
    console.log("\n⏳ 正在mint NFT...");
    
    // 单个mint
    const tx = await mintNFT.mint();
    const receipt = await tx.wait();
    
    console.log("✅ Mint成功！");
    console.log(`   交易哈希: ${receipt.hash}`);
    console.log(`   Gas消耗: ${receipt.gasUsed.toString()}`);
    
    // 获取mint的tokenId
    const newTotalSupply = await mintNFT.totalSupply();
    const tokenId = newTotalSupply - 1n;
    
    console.log(`   Token ID: ${tokenId}`);
    console.log(`   Token URI: ${await mintNFT.tokenURI(tokenId)}`);
    
    // 批量mint示例（可选）
    const batchAmount = 2; // mint 2个
    if (myRemaining > 1) {
      console.log(`\n⏳ 批量mint ${batchAmount}个NFT...`);
      const batchTx = await mintNFT.batchMint(batchAmount);
      const batchReceipt = await batchTx.wait();
      
      console.log("✅ 批量mint成功！");
      console.log(`   交易哈希: ${batchReceipt.hash}`);
      console.log(`   Gas消耗: ${batchReceipt.gasUsed.toString()}`);
    }
  } else {
    console.log("\n⚠️  无法mint:");
    if (remainingSupply === 0n) {
      console.log("   NFT已售罄！");
    } else if (myRemaining === 0n) {
      console.log("   你已达到mint上限（3个）！");
    }
  }
  
  // 最终状态
  console.log("\n📊 最终状态:");
  console.log(`   总供应量      : ${await mintNFT.totalSupply()} / ${await mintNFT.MAX_SUPPLY()}`);
  console.log(`   我的余额      : ${await mintNFT.balanceOf(signer.address)}`);
  console.log(`   我已mint      : ${await mintNFT.mintedCount(signer.address)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

