import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../UI/Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { useMintNFT } from '../../hooks/useMintNFT'
import { useAccount, useChainId } from 'wagmi'
import { 
  CheckCircledIcon, 
  TargetIcon,
  FileTextIcon,
  ImageIcon,
  StarIcon,
  LightningBoltIcon,
  RocketIcon,
  CrossCircledIcon,
  LockClosedIcon
} from '@radix-ui/react-icons'
import { ChallengeModal } from '../Challenges/ChallengeModal'

interface ChapterProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Chapter5({ onNext, onPrevious, isLast }: ChapterProps) {
  const { t, language } = useLanguage()
  useChapterProgress(5) // 追踪第五章进度
  const [selectedChallenge, setSelectedChallenge] = useState<'file' | 'image' | null>(null)
  const [acceptedChallenge, setAcceptedChallenge] = useState<'file' | 'image' | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [modalChallengeType, setModalChallengeType] = useState<'file' | 'image'>('file')
  
  // 钱包和网络
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const isCorrectNetwork = chainId === 1270 // Irys Testnet
  
  // NFT 铸造
  const {
    mint,
    isMinting,
    mintSuccess,
    error: mintError,
    mintedCount,
    remainingMints,
    totalSupply,
    remainingSupply,
    canMint,
    txHash,
  } = useMintNFT()

  const handleChallengeSelect = (challengeType: 'file' | 'image') => {
    setSelectedChallenge(challengeType)
  }

  const handleConfirm = () => {
    if (selectedChallenge) {
      setModalChallengeType(selectedChallenge)
      setShowChallengeModal(true)
    }
  }

  const handleAcceptChallenge = () => {
    if (selectedChallenge) {
      setAcceptedChallenge(selectedChallenge)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 w-full max-w-full overflow-hidden"
    >
      {/* 标题 / Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          {t.common.acceptChallengeFullTitle}
        </h2>
      </div>

      {/* 更新上传成功 + 废话 / Upload Success Update + Description */}
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <CheckCircledIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-400 mb-2">
                {t.common.dataUploadSuccess}
              </h3>
              <p className="text-dark-text-secondary leading-relaxed">
                {language === 'zh' 
                  ? '恭喜你！你已经成功完成了第一次数据上传。你的数据现在已经永久存储在去中心化网络上，任何人都可以通过交易 ID 访问它。这是你迈向 Web3 世界的重要一步！'
                  : "Congratulations! You've successfully completed your first data upload. Your data is now permanently stored on the decentralized network, accessible to anyone via the transaction ID. This is an important step into the Web3 world!"}
              </p>
            </div>
          </div>
        </div>

        {/* NFT 奖励部分 / NFT Reward Section */}
        <div className="p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/30 rounded-xl shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                  <RocketIcon className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold gradient-text mb-3">
              {t.common.nftRewardTitle}
            </h3>
            <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
              {t.common.nftRewardDesc}
            </p>
          </div>

          {/* NFT 预览图片 / NFT Preview Image */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-dark-surface border-2 border-purple-500/50 rounded-2xl p-3 shadow-2xl">
                <img
                  src="https://file.notion.so/f/f/805c8ee6-d632-43a5-bb85-5b1e2e4a9000/a9d1ae37-80d6-4360-8a8d-fc65e52102b5/Discord_PFP_Teal.gif?table=block&id=189e9455-e498-8035-b188-f1ff4c0fb8c9&spaceId=805c8ee6-d632-43a5-bb85-5b1e2e4a9000&expirationTimestamp=1762192800000&signature=E63oVInCyM-SIZzkebT0qJBn7b4YA4ILYcFQ4c6hoRU"
                  alt="HELLO IRYS NFT"
                  className="w-72 h-72 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  NFT
                </div>
              </div>
            </div>
          </div>

          {/* 铸造按钮和状态 / Mint Button and Status */}
          <div className="space-y-4">
            {!isConnected ? (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                <p className="text-yellow-400">
                  {t.common.connectWalletToMint}
                </p>
              </div>
            ) : !isCorrectNetwork ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                <p className="text-red-400 flex items-center justify-center gap-2">
                  <CrossCircledIcon className="w-5 h-5" />
                  {t.common.wrongNetwork}
                </p>
              </div>
            ) : mintSuccess ? (
              <div className="space-y-4">
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <CheckCircledIcon className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-green-400 text-lg font-semibold mb-2">
                    {t.common.mintSuccessful}
                  </p>
                  <p className="text-dark-text-secondary text-sm mb-4">
                    {language === 'zh' ? '你已成功铸造 NFT！' : 'You have successfully minted an NFT!'}
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    {txHash && (
                      <a
                        href={`https://testnet-explorer.irys.xyz/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 transition-colors"
                      >
                        {t.common.viewOnExplorer} →
                      </a>
                    )}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-colors"
                    >
                      <StarIcon className="w-4 h-4" />
                      {language === 'zh' ? '查看 NFT 详情' : 'View NFT Details'}
                    </button>
                  </div>
                </div>

                {/* NFT 详情（可折叠） / NFT Details (Collapsible) */}
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-xl p-6"
                  >
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
                        <span className="text-dark-text-secondary">{t.common.yourMintedCount}</span>
                        <span className="text-purple-400 font-semibold">{mintedCount} / 3</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                        <span className="text-dark-text-secondary">{t.common.remainingMints}</span>
                        <span className="text-green-400 font-semibold">{remainingMints}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                        <span className="text-dark-text-secondary">{t.common.totalSupplyLabel}</span>
                        <span className="text-dark-text-primary font-semibold">{totalSupply}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-dark-hover rounded-lg">
                        <span className="text-dark-text-secondary">{t.common.remainingSupplyLabel}</span>
                        <span className="text-blue-400 font-semibold">{remainingSupply}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={mint}
                    disabled={!canMint || isMinting}
                    className={`px-8 py-4 text-lg font-semibold ${
                      !canMint || isMinting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50'
                    }`}
                  >
                    {isMinting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⚡
                        </motion.div>
                        {t.common.minting}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <RocketIcon className="w-5 h-5" />
                        {t.common.mintNFT}
                      </span>
                    )}
                  </Button>
                </motion.div>
                
                {mintError && (
                  <p className="mt-3 text-red-400 text-sm">{mintError}</p>
                )}
                
                {!canMint && remainingMints === 0 && (
                  <p className="mt-3 text-yellow-400 text-sm">
                    {t.common.mintLimitReached}
                  </p>
                )}
                
                {!canMint && remainingSupply === 0 && (
                  <p className="mt-3 text-red-400 text-sm">
                    {t.common.soldOut}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 发起新的挑战 / Launch New Challenge */}
        <div className="p-8 bg-dark-surface border border-dark-border rounded-xl shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full blur-xl opacity-50"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl">
                  <TargetIcon className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-dark-text-primary mb-3">
              {t.common.readyForChallenge}
            </h3>
            <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
              {language === 'zh' 
                ? '为了巩固你所学的知识，我将为你准备一个实战挑战。完成挑战后，你将获得 IRYS 测试币奖励！请选择你想要挑战的任务：'
                : 'To consolidate what you\'ve learned, I\'ve prepared a practical challenge for you. Complete it to earn IRYS test tokens! Choose your challenge:'}
            </p>
          </div>

          {/* 选择框 A 和 B / Options A and B */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 选项 A：上传文件 / Option A: File Upload */}
            <motion.button
              whileHover={selectedChallenge === null || selectedChallenge === 'file' ? { scale: 1.02, y: -4 } : {}}
              whileTap={selectedChallenge === null || selectedChallenge === 'file' ? { scale: 0.98 } : {}}
              onClick={() => selectedChallenge === null && handleChallengeSelect('file')}
              disabled={selectedChallenge !== null && selectedChallenge !== 'file'}
              className={`relative p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                acceptedChallenge === 'file'
                  ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                  : selectedChallenge === 'file'
                  ? 'border-accent-primary bg-accent-primary/10 shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                  : selectedChallenge === 'image'
                  ? 'border-dark-border/30 bg-dark-card/50 opacity-40 cursor-not-allowed'
                  : 'border-dark-border hover:border-accent-primary/50 bg-dark-card cursor-pointer'
              }`}
            >
              {/* 锁定遮罩 / Lock Overlay */}
              {selectedChallenge === 'image' && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-surface/60 backdrop-blur-sm rounded-xl z-10">
                  <div className="text-center">
                    <LockClosedIcon className="w-10 h-10 text-dark-text-secondary/70 mx-auto mb-2" />
                    <p className="text-dark-text-secondary/80 text-sm font-semibold">
                      {language === 'zh' ? '已选择其他挑战' : 'Other challenge selected'}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  acceptedChallenge === 'file'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                }`}>
                  {acceptedChallenge === 'file' ? (
                    <CheckCircledIcon className="w-8 h-8 text-white" />
                  ) : (
                    <FileTextIcon className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-dark-text-primary">
                      {t.common.challengeA}
                    </h4>
                    {acceptedChallenge === 'file' ? (
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                        <CheckCircledIcon className="w-3 h-3" />
                        {language === 'zh' ? '已接受' : 'Accepted'}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                        {t.common.fileUpload}
                      </span>
                    )}
                  </div>
                  <p className="text-dark-text-secondary mb-3">
                    {language === 'zh' 
                      ? '上传一个文本文件（.txt、.json、.md 等）到 Irys 网络'
                      : 'Upload a text file (.txt, .json, .md, etc.) to the Irys network'}
                  </p>
                  <div className={`flex items-center gap-2 text-sm ${
                    acceptedChallenge === 'file' ? 'text-green-400' : 'text-accent-primary'
                  }`}>
                    <StarIcon className="w-4 h-4" />
                    <span>{t.common.rewardExclusiveNFT}</span>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* 选项 B：上传图片 / Option B: Image Upload */}
            <motion.button
              whileHover={selectedChallenge === null || selectedChallenge === 'image' ? { scale: 1.02, y: -4 } : {}}
              whileTap={selectedChallenge === null || selectedChallenge === 'image' ? { scale: 0.98 } : {}}
              onClick={() => selectedChallenge === null && handleChallengeSelect('image')}
              disabled={selectedChallenge !== null && selectedChallenge !== 'image'}
              className={`relative p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                acceptedChallenge === 'image'
                  ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                  : selectedChallenge === 'image'
                  ? 'border-accent-secondary bg-accent-secondary/10 shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                  : selectedChallenge === 'file'
                  ? 'border-dark-border/30 bg-dark-card/50 opacity-40 cursor-not-allowed'
                  : 'border-dark-border hover:border-accent-secondary/50 bg-dark-card cursor-pointer'
              }`}
            >
              {/* 锁定遮罩 / Lock Overlay */}
              {selectedChallenge === 'file' && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-surface/60 backdrop-blur-sm rounded-xl z-10">
                  <div className="text-center">
                    <LockClosedIcon className="w-10 h-10 text-dark-text-secondary/70 mx-auto mb-2" />
                    <p className="text-dark-text-secondary/80 text-sm font-semibold">
                      {language === 'zh' ? '已选择其他挑战' : 'Other challenge selected'}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  acceptedChallenge === 'image'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-purple-500 to-pink-600'
                }`}>
                  {acceptedChallenge === 'image' ? (
                    <CheckCircledIcon className="w-8 h-8 text-white" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-xl font-bold text-dark-text-primary">
                      {t.common.challengeB}
                    </h4>
                    {acceptedChallenge === 'image' ? (
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                        <CheckCircledIcon className="w-3 h-3" />
                        {language === 'zh' ? '已接受' : 'Accepted'}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                        {t.common.imageUpload}
                      </span>
                    )}
                  </div>
                  <p className="text-dark-text-secondary mb-3">
                    {language === 'zh' 
                      ? '上传一张图片（.jpg、.png、.gif 等）到 Irys 网络'
                      : 'Upload an image (.jpg, .png, .gif, etc.) to the Irys network'}
                  </p>
                  <div className={`flex items-center gap-2 text-sm ${
                    acceptedChallenge === 'image' ? 'text-green-400' : 'text-purple-400'
                  }`}>
                    <StarIcon className="w-4 h-4" />
                    <span>{t.common.rewardExclusiveNFT}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          </div>

          {/* 接受挑战按钮 / Accept Challenge Button */}
          {selectedChallenge && !acceptedChallenge && (
            <motion.div 
              className="mt-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleConfirm}
                  className="px-10 py-5 text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:shadow-2xl hover:shadow-orange-500/50 flex items-center gap-3"
                >
                  <RocketIcon className="w-6 h-6" />
                  {language === 'zh' ? '接受挑战' : 'Accept Challenge'}
                  <LightningBoltIcon className="w-6 h-6" />
                </Button>
              </motion.div>
              
              <p className="text-sm text-dark-text-secondary flex items-center justify-center gap-2">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span>
                  {language === 'zh' 
                    ? '点击按钮开始你的挑战之旅！'
                    : 'Click the button to start your challenge!'}
                </span>
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* 底部导航 / Bottom Navigation */}
      <div className="flex justify-between pt-8 border-t border-dark-border">
        <Button variant="ghost" onClick={onPrevious}>
          ← {t.previous}
        </Button>
        {!isLast && (
          <Button 
            onClick={handleConfirm}
            disabled={!selectedChallenge}
            className={!selectedChallenge ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {t.next} →
          </Button>
        )}
      </div>

      {/* 挑战任务详情弹窗 / Challenge Details Modal */}
      <ChallengeModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        challengeType={modalChallengeType}
        onAccept={handleAcceptChallenge}
      />
    </motion.div>
  )
}



