import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../UI/Button'
import CodeBlock from '../UI/CodeBlock'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { 
  CheckCircledIcon, 
  GlobeIcon, 
  LockClosedIcon, 
  CodeIcon, 
  FileTextIcon,
  RocketIcon,
  LightningBoltIcon
} from '@radix-ui/react-icons'

interface ChapterProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Chapter4({ onNext, onPrevious }: ChapterProps) {
  const { t, language } = useLanguage()
  useChapterProgress(4) // 追踪第四章进度
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [challengeAccepted, setChallengeAccepted] = useState(false)

  // 上传成功后的响应数据示例 / Response data example after successful upload
  const successResponseCode = language === 'zh'
    ? `// 上传成功后返回的响应示例
{
  id: "KEH-3zKZiQ_dJSs2E3bLYZlIM8zpc...",  // 交易 ID
  timestamp: 1699123456789,                // 上传时间戳
  version: "1.0.0",                        // Irys 版本
  public: "0x1234567890abcdef...",         // 上传者公钥
  signature: "0xabcdef1234567890...",      // 交易签名
  deadlineHeight: 1234567,                 // 过期区块高度
  block: 1234500,                          // 当前区块高度
  validatorSignatures: [],                 // 验证者签名
  verify: [Function]                       // 验证函数
}`
    : `// Example response after successful upload
{
  id: "KEH-3zKZiQ_dJSs2E3bLYZlIM8zpc...",  // Transaction ID
  timestamp: 1699123456789,                // Upload timestamp
  version: "1.0.0",                        // Irys version
  public: "0x1234567890abcdef...",         // Uploader public key
  signature: "0xabcdef1234567890...",      // Transaction signature
  deadlineHeight: 1234567,                 // Expiry block height
  block: 1234500,                          // Current block height
  validatorSignatures: [],                 // Validator signatures
  verify: [Function]                       // Verification function
}`

  const handleAcceptChallenge = () => {
    setChallengeAccepted(true)
    setShowChallengeModal(false)
  }

  const handleDeclineChallenge = () => {
    setShowChallengeModal(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 w-full max-w-full overflow-hidden"
    >
      {/* 庆祝标题 / Celebration Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 relative overflow-hidden"
      >
        {/* 背景光效 / Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-secondary/5 to-transparent rounded-3xl blur-3xl"></div>
        
        {/* 图标容器 / Icon Container */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative inline-flex items-center justify-center mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full blur-xl opacity-50 scale-150"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl">
            <RocketIcon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <h2 className="text-5xl font-bold gradient-text mb-4 relative">
          {t.common.congratulations}
        </h2>
        <p className="text-dark-text-secondary text-xl max-w-2xl mx-auto relative">
          {t.common.understandingResponseDesc}
        </p>
      </motion.div>

      {/* 成就徽章 / Achievement Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="group relative p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl text-center hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/10 rounded-2xl transition-all duration-300"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircledIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-green-400 mb-2 text-lg">
              {t.common.dataUploaded}
            </h3>
            <p className="text-sm text-dark-text-secondary">
              {t.common.permanentlyStored}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="group relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl text-center hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/10 rounded-2xl transition-all duration-300"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <GlobeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-blue-400 mb-2 text-lg">
              {t.common.globallyAccessible}
            </h3>
            <p className="text-sm text-dark-text-secondary">
              {t.common.anyoneCanView}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="group relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl text-center hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/10 rounded-2xl transition-all duration-300"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <LockClosedIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-purple-400 mb-2 text-lg">
              {t.common.immutable}
            </h3>
            <p className="text-sm text-dark-text-secondary">
              {t.common.dataStoredForever}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        {/* 理解上传成功的响应数据 / Understanding Upload Success Response */}
        <section>
          <h3 className="text-2xl font-semibold mb-3 text-dark-text-primary">
            {t.common.understandingResponse}
          </h3>
          <p className="text-dark-text-secondary leading-relaxed mb-4">
            {t.common.understandingResponseDesc}
          </p>
          
          {/* 上下布局 / Vertical Layout */}
          <div className="space-y-6 mt-6">
            {/* 上方：终端输出效果 / Top: Terminal Output */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-dark-text-primary flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <CodeIcon className="w-5 h-5 text-white" />
                </div>
                <span>{t.common.terminalOutputExample}</span>
              </h4>
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-dark-border shadow-xl">
                {/* Mac 样式顶部控制按钮 / Mac Style Top Control Buttons */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#3d3d3d]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400">
                    {language === 'zh' ? '上传输出' : 'Upload Output'}
                  </div>
                </div>
                
                {/* 终端内容 / Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-2 text-gray-300">
                  <div className="text-blue-400 flex items-center gap-2">
                    <span className="text-blue-500">▶</span>
                    {language === 'zh' ? '开始上传到 Irys...' : 'Starting upload to Irys...'}
                  </div>
                  <div className="h-4"></div>
                  <div className="text-green-400 flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {language === 'zh' ? '上传成功！' : 'Upload successful!'}
                  </div>
                  <div className="h-2"></div>
                  <div className="text-cyan-400 flex items-center gap-2">
                    <span className="text-cyan-500">●</span>
                    {language === 'zh' ? '响应数据详情：' : 'Response details:'}
                  </div>
                  <div className="text-gray-500">────────────────────────────────────────────────────────────</div>
                  <div>
                    <span className="text-gray-400">
                      {language === 'zh' ? '交易 ID      : ' : 'Transaction ID: '}
                    </span>
                    <span className="text-yellow-300">KEH-3zKZiQ_dJSs2E3bLYZlIM8zpc...</span>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      {language === 'zh' ? '时间戳      : ' : 'Timestamp     : '}
                    </span>
                    <span className="text-yellow-300">1699123456789</span>
                    <span className="text-gray-500">
                      {language === 'zh' ? ' (2023/11/5 12:30:56)' : ' (11/5/2023 12:30:56 PM)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      {language === 'zh' ? 'Irys 版本   : ' : 'Irys version  : '}
                    </span>
                    <span className="text-yellow-300">1.0.0</span>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      {language === 'zh' ? '上传者公钥  : ' : 'Uploader key  : '}
                    </span>
                    <span className="text-yellow-300">0x1234567890abcdef...</span>
                  </div>
                  <div>
                    <span className="text-gray-400">
                      {language === 'zh' ? '当前区块    : ' : 'Current block : '}
                    </span>
                    <span className="text-yellow-300">1234500</span>
                  </div>
                  <div className="text-gray-500">────────────────────────────────────────────────────────────</div>
                  <div className="h-2"></div>
                  <div>
                    <span className="text-green-400 flex items-center gap-2">
                      <span className="text-green-500">◆</span>
                      {language === 'zh' ? '访问地址: ' : 'Access URL: '}
                    </span>
                    <span className="text-blue-400 underline ml-4">https://gateway.irys.xyz/KEH-3zKZiQ_dJSs2E3bLYZlIM8zpc...</span>
                  </div>
                  <div className="h-2"></div>
                  <div className="text-purple-400 flex items-center gap-2">
                    <span className="text-purple-500">■</span>
                    {language === 'zh' ? '完整响应对象:' : 'Full response object:'}
                  </div>
                  <div className="text-gray-500 text-xs">
                    <div>{'{'}</div>
                    <div className="pl-4">
                      <span className="text-cyan-300">"id"</span>
                      <span>: </span>
                      <span className="text-green-300">"KEH-3zKZiQ_dJSs2E3bLYZlIM8zpc..."</span>
                      <span>,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-300">"timestamp"</span>
                      <span>: </span>
                      <span className="text-orange-300">1699123456789</span>
                      <span>,</span>
                    </div>
                    <div className="pl-4 text-gray-600">...</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 下方：JSON 响应对象 / Bottom: JSON Response Object */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-dark-text-primary flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                  <FileTextIcon className="w-5 h-5 text-white" />
                </div>
                <span>{t.common.responseStructure}</span>
              </h4>
              <CodeBlock
                code={successResponseCode}
                language="javascript"
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-dark-text-primary">
              {t.common.responsePurpose}
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-dark-surface border border-dark-border rounded-lg">
                <h5 className="font-semibold text-accent-primary mb-2">
                  {t.common.transactionId}
                </h5>
                <p className="text-dark-text-secondary text-sm">
                  {language === 'zh' 
                    ? '这是最重要的信息！交易 ID 是你访问已上传数据的唯一标识符。通过这个 ID，你可以在任何时候、任何地方访问你的数据。' 
                    : 'This is the most important information! The transaction ID is the unique identifier to access your uploaded data. With this ID, you can access your data anytime, anywhere.'}
                </p>
              </div>
              
              <div className="p-4 bg-dark-surface border border-dark-border rounded-lg">
                <h5 className="font-semibold text-accent-primary mb-2">
                  {t.common.timestamp}
                </h5>
                <p className="text-dark-text-secondary text-sm">
                  {language === 'zh' 
                    ? '记录了数据上传的精确时间，方便你追踪和管理上传历史。' 
                    : 'Records the exact time of data upload, making it easy to track and manage your upload history.'}
                </p>
              </div>
              
              <div className="p-4 bg-dark-surface border border-dark-border rounded-lg">
                <h5 className="font-semibold text-accent-primary mb-2">
                  {t.common.signature}
                </h5>
                <p className="text-dark-text-secondary text-sm">
                  {language === 'zh' 
                    ? '证明数据是由你的私钥上传的，确保数据的真实性和所有权。' 
                    : 'Proves that the data was uploaded by your private key, ensuring authenticity and ownership.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h5 className="text-green-400 font-semibold mb-3">
              {t.common.howToAccess}
            </h5>
            <p className="text-dark-text-secondary text-sm mb-2">
              {language === 'zh' 
                ? '使用交易 ID 通过以下 URL 格式访问你的数据：' 
                : 'Use the transaction ID to access your data via the following URL format:'}
            </p>
            <code className="block bg-dark-bg p-2 rounded text-accent-primary text-sm">
              https://gateway.irys.xyz/YOUR_TRANSACTION_ID
            </code>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3 text-dark-text-primary">
              {t.common.relatedResources}
            </h4>
            <div className="space-y-2">
              <a 
                href="https://docs.irys.xyz/build/d/sdk/upload/upload" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-dark-surface border border-dark-border hover:border-accent-primary rounded-lg transition-colors"
              >
                <span className="text-accent-primary hover:underline">
                  {t.common.irysUploadApiDocs}
                </span>
              </a>
              
              <a 
                href="https://docs.irys.xyz/build/d/sdk/upload/uploadFile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-dark-surface border border-dark-border hover:border-accent-primary rounded-lg transition-colors"
              >
                <span className="text-accent-primary hover:underline">
                  {t.common.irysFileUploadDocs}
                </span>
              </a>
              
              <a 
                href="https://docs.irys.xyz/build/d/sdk/upload/uploadFolder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-dark-surface border border-dark-border hover:border-accent-primary rounded-lg transition-colors"
              >
                <span className="text-accent-primary hover:underline">
                  {t.common.irysFolderUploadDocs}
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 导航按钮区域 / Navigation Button Area */}
      <div className="pt-8 border-t border-dark-border">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="ghost" onClick={onPrevious}>
              ← {t.previous}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* 领取奖励按钮 / Claim Reward Button */}
            {!challengeAccepted && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => setShowChallengeModal(true)}
                  variant="outline"
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white flex items-center gap-2"
                >
                  <LightningBoltIcon className="w-4 h-4" />
                  {t.common.claimReward}
                </Button>
              </motion.div>
            )}

            {/* 下一步按钮 / Next Step Button */}
            {challengeAccepted ? (
              <Button onClick={onNext}>
                {t.next} →
              </Button>
            ) : (
              <div className="relative group">
                <Button
                  disabled
                  className="opacity-50 cursor-not-allowed flex items-center gap-2"
                >
                  <LockClosedIcon className="w-4 h-4" />
                  {t.next}
                </Button>
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-dark-surface border border-dark-border rounded-lg text-xs text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {t.common.unlockAfterChallenge}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 挑战确认模态框 / Challenge Confirmation Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-dark-surface border border-dark-border rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl relative overflow-hidden"
          >
            {/* 背景装饰 / Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10 pointer-events-none"></div>
            
            {/* 顶部装饰 / Top Decoration */}
            <div className="flex justify-center mb-6 relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full blur-2xl opacity-30"
              ></motion.div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl">
                <RocketIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* 标题 / Title */}
            <h3 className="text-3xl font-bold text-center mb-4 text-dark-text-primary relative">
              {language === 'zh' ? '恭喜你成功上传数据！' : 'Congratulations on Successfully Uploading Data!'}
            </h3>

            {/* 疑问句 / Question Text */}
            <p className="text-lg text-center text-dark-text-secondary mb-8 relative">
              {language === 'zh' 
                ? '是否准备好了领取奖励和接受挑战呢？' 
                : 'Are you ready to claim your reward and accept the challenge?'}
            </p>

            {/* 按钮区域 / Buttons Area */}
            <div className="grid grid-cols-2 gap-4 relative">
              {/* 左：拒绝按钮 / Left: Reject Button */}
              <Button
                onClick={handleDeclineChallenge}
                variant="outline"
                className="border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-400 transition-all"
              >
                {language === 'zh' ? '暂不接受' : 'Not Yet'}
              </Button>

              {/* 右：接受按钮 / Right: Accept Button */}
              <Button
                onClick={handleAcceptChallenge}
                className="bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>{language === 'zh' ? '接受挑战' : 'Accept Challenge'}</span>
                <RocketIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* 提示文本 / Hint Text */}
            <p className="text-xs text-center text-gray-500 mt-6 relative">
              {language === 'zh' 
                ? '接受挑战后，你将解锁下一章节的学习内容' 
                : 'After accepting the challenge, you will unlock the next chapter'}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}



