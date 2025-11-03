import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi'
import { useState, useEffect } from 'react'
import MintNFTAbi from '../contracts/MintNFT.json'

const CONTRACT_ADDRESS = '0x8E842cA7AFa67d65C19B564D23fBB764F480227C' as `0x${string}`

export function useMintNFT() {
  const { address } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 读取用户已铸造的 NFT 数量
  const { data: mintedCount, refetch: refetchMintedCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MintNFTAbi,
    functionName: 'mintedCount',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // 读取用户剩余可铸造数量
  const { data: remainingMints, refetch: refetchRemainingMints } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MintNFTAbi,
    functionName: 'remainingMintsForAddress',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // 读取总供应量
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MintNFTAbi,
    functionName: 'totalSupply',
  })

  // 读取剩余供应量
  const { data: remainingSupply, refetch: refetchRemainingSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MintNFTAbi,
    functionName: 'remainingSupply',
  })

  // 铸造 NFT
  const { data: hash, writeContract, isPending, isError, error: writeError } = useWriteContract()

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // 处理铸造成功
  useEffect(() => {
    if (isConfirmed) {
      setMintSuccess(true)
      setIsMinting(false)
      setError(null)
      // 重新获取数据
      refetchMintedCount()
      refetchRemainingMints()
      refetchTotalSupply()
      refetchRemainingSupply()
    }
  }, [isConfirmed, refetchMintedCount, refetchRemainingMints, refetchTotalSupply, refetchRemainingSupply])

  // 处理错误
  useEffect(() => {
    if (isError && writeError) {
      console.error('Mint error:', writeError)
      setError(writeError.message || 'Failed to mint NFT')
      setIsMinting(false)
    }
  }, [isError, writeError])

  const handleMint = async () => {
    if (!address) {
      setError('Please connect your wallet first')
      return
    }

    const remainingMintsNum = remainingMints ? Number(remainingMints) : 0
    const remainingSupplyNum = remainingSupply ? Number(remainingSupply) : 0

    if (remainingMintsNum === 0) {
      setError('You have reached the maximum mint limit (3 NFTs per address)')
      return
    }

    if (remainingSupplyNum === 0) {
      setError('All NFTs have been minted')
      return
    }

    try {
      setIsMinting(true)
      setError(null)
      setMintSuccess(false)
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: MintNFTAbi,
        functionName: 'mint',
      })
    } catch (err: any) {
      console.error('Mint failed:', err)
      setError(err?.message || 'Failed to mint NFT')
      setIsMinting(false)
    }
  }

  const mintedCountNum = mintedCount ? Number(mintedCount) : 0
  const remainingMintsNum = remainingMints ? Number(remainingMints) : 0
  const totalSupplyNum = totalSupply ? Number(totalSupply) : 0
  const remainingSupplyNum = remainingSupply ? Number(remainingSupply) : 0

  return {
    // Actions
    mint: handleMint,

    // States
    isMinting: isMinting || isPending || isConfirming,
    mintSuccess,
    error,
    txHash: hash,

    // Contract data
    mintedCount: mintedCountNum,
    remainingMints: remainingMintsNum,
    totalSupply: totalSupplyNum,
    remainingSupply: remainingSupplyNum,
    canMint: !!address && remainingMintsNum > 0 && remainingSupplyNum > 0,

    // Reset
    reset: () => {
      setMintSuccess(false)
      setError(null)
      setIsMinting(false)
    },
  }
}

