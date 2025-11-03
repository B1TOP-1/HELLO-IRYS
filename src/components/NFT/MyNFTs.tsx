import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useMintNFT } from '../../hooks/useMintNFT'
import { useLanguage } from '../../i18n/LanguageContext'
import { 
  StarIcon, 
  ExternalLinkIcon, 
  RocketIcon,
  CrossCircledIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons'
import Button from '../UI/Button'

export default function MyNFTs() {
  const { t, language } = useLanguage()
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const isCorrectNetwork = chainId === 1270 // Irys Testnet
  
  const {
    mintedCount,
    remainingMints,
    totalSupply,
    remainingSupply,
  } = useMintNFT()

  const [showFullDetails, setShowFullDetails] = useState(false)

  if (!isConnected) {
    return (
      <div className="p-8 bg-dark-surface border border-dark-border rounded-xl shadow-xl text-center">
        <InfoCircledIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-dark-text-primary mb-2">
          {language === 'zh' ? '请连接钱包' : 'Please Connect Wallet'}
        </h3>
        <p className="text-dark-text-secondary">
          {language === 'zh' 
            ? '连接钱包后即可查看你拥有的 NFT'
            : 'Connect your wallet to view your NFTs'}
        </p>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-xl shadow-xl text-center">
        <CrossCircledIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-red-400 mb-2">
          {language === 'zh' ? '网络错误' : 'Wrong Network'}
        </h3>
        <p className="text-dark-text-secondary">
          {language === 'zh' 
            ? '请切换到 Irys 测试网络'
            : 'Please switch to Irys Testnet'}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* 标题 / Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          {language === 'zh' ? '我的 NFT 收藏' : 'My NFT Collection'}
        </h2>
        <p className="text-dark-text-secondary">
          {language === 'zh' 
            ? '查看你在 Irys 上铸造的所有 NFT'
            : 'View all your minted NFTs on Irys'}
        </p>
      </div>

      {/* NFT 卡片 / NFT Card */}
      <div className="p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/30 rounded-xl shadow-2xl">
        {/* NFT 图片 / NFT Image */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-dark-surface border-2 border-purple-500/50 rounded-2xl p-3 shadow-2xl">
              <img
                src="https://file.notion.so/f/f/805c8ee6-d632-43a5-bb85-5b1e2e4a9000/a9d1ae37-80d6-4360-8a8d-fc65e52102b5/Discord_PFP_Teal.gif?table=block&id=189e9455-e498-8035-b188-f1ff4c0fb8c9&spaceId=805c8ee6-d632-43a5-bb85-5b1e2e4a9000&expirationTimestamp=1762192800000&signature=E63oVInCyM-SIZzkebT0qJBn7b4YA4ILYcFQ4c6hoRU"
                alt="HELLO IRYS NFT"
                className="w-80 h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NFT
              </div>
            </div>
          </div>
        </div>

        {/* 快速统计 / Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-surface/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
            <p className="text-dark-text-secondary text-sm mb-1">
              {language === 'zh' ? '已拥有' : 'Owned'}
            </p>
            <p className="text-3xl font-bold text-purple-400">{mintedCount}</p>
          </div>
          <div className="bg-dark-surface/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center">
            <p className="text-dark-text-secondary text-sm mb-1">
              {language === 'zh' ? '可铸造' : 'Available'}
            </p>
            <p className="text-3xl font-bold text-green-400">{remainingMints}</p>
          </div>
          <div className="bg-dark-surface/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-center">
            <p className="text-dark-text-secondary text-sm mb-1">
              {t.common.totalSupplyLabel}
            </p>
            <p className="text-3xl font-bold text-blue-400">{totalSupply}</p>
          </div>
          <div className="bg-dark-surface/80 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4 text-center">
            <p className="text-dark-text-secondary text-sm mb-1">
              {language === 'zh' ? '剩余' : 'Remaining'}
            </p>
            <p className="text-3xl font-bold text-orange-400">{remainingSupply}</p>
          </div>
        </div>

        {/* 详细信息按钮 / Details Toggle */}
        <div className="text-center mb-4">
          <Button
            variant="ghost"
            onClick={() => setShowFullDetails(!showFullDetails)}
            className="text-purple-400 hover:text-purple-300"
          >
            <StarIcon className="w-4 h-4 mr-2" />
            {showFullDetails 
              ? (language === 'zh' ? '隐藏详情' : 'Hide Details')
              : (language === 'zh' ? '查看详情' : 'Show Details')}
          </Button>
        </div>

        {/* 详细信息（可折叠） / Detailed Info (Collapsible) */}
        {showFullDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-xl p-6">
              <h4 className="text-xl font-semibold text-dark-text-primary mb-4 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                {t.common.nftDetails}
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                  <span className="text-dark-text-secondary">{t.common.nftName}</span>
                  <span className="text-dark-text-primary font-semibold">HELLO IRYS NFT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                  <span className="text-dark-text-secondary">{t.common.nftSymbol}</span>
                  <span className="text-dark-text-primary font-semibold">HIRYSNFT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                  <span className="text-dark-text-secondary">
                    {language === 'zh' ? '合约地址' : 'Contract Address'}
                  </span>
                  <span className="text-dark-text-primary font-mono text-sm">
                    0x8E84...227C
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                  <span className="text-dark-text-secondary">
                    {language === 'zh' ? '网络' : 'Network'}
                  </span>
                  <span className="text-dark-text-primary font-semibold">Irys Testnet</span>
                </div>
                <div className="col-span-2 flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                  <span className="text-dark-text-secondary">
                    {language === 'zh' ? '我的钱包' : 'My Wallet'}
                  </span>
                  <span className="text-dark-text-primary font-mono text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            {/* 查看区块浏览器 / View on Explorer */}
            <div className="text-center space-y-3">
              <p className="text-dark-text-secondary text-sm">
                {language === 'zh' 
                  ? '查看 NFT 合约的所有交易记录'
                  : 'View all transactions on the NFT contract'}
              </p>
              <a
                href={`https://testnet-explorer.irys.xyz/address/0x8E842cA7AFa67d65C19B564D23fBB764F480227C`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                <ExternalLinkIcon className="w-5 h-5" />
                {language === 'zh' ? '查看合约交易' : 'View Contract Transactions'}
              </a>
            </div>
          </motion.div>
        )}

        {/* 提示信息 / Info Message */}
        {mintedCount === 0 && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
            <RocketIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400">
              {language === 'zh' 
                ? '你还没有铸造 NFT，快去教程中领取吧！'
                : "You haven't minted any NFTs yet. Go to the tutorial to claim yours!"}
            </p>
          </div>
        )}
      </div>

      {/* 铸造进度 / Minting Progress */}
      <div className="p-6 bg-dark-surface border border-dark-border rounded-xl">
        <h3 className="text-xl font-semibold text-dark-text-primary mb-4">
          {language === 'zh' ? '铸造进度' : 'Minting Progress'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-dark-text-secondary">
              {language === 'zh' ? '个人进度' : 'Personal Progress'}
            </span>
            <span className="text-purple-400 font-semibold">
              {mintedCount} / 3 ({Math.round((mintedCount / 3) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-dark-hover rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(mintedCount / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-dark-text-secondary">
              {language === 'zh' ? '全局进度' : 'Global Progress'}
            </span>
            <span className="text-blue-400 font-semibold">
              {totalSupply} / 1000 ({(() => {
                const percentage = (totalSupply / 1000) * 100;
                return percentage < 1 ? percentage.toFixed(1) : Math.round(percentage);
              })()}%)
            </span>
          </div>
          <div className="w-full bg-dark-hover rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalSupply / 1000) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

