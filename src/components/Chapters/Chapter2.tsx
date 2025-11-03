import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../UI/Button'
import CodeBlock from '../UI/CodeBlock'
import InteractiveMacTerminal from '../UI/InteractiveMacTerminal'
import Quiz from '../UI/Quiz'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { LockClosedIcon, LightningBoltIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface ChapterProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Chapter2({ onNext, onPrevious }: ChapterProps) {
  const { t, language } = useLanguage()
  useChapterProgress(2) // 追踪第二章进度
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const installCode = language === 'zh' 
    ? `# 1. 检查 Node.js 版本（需要 v18 或更高）
node --version

# 2. 检查 npm 版本
npm --version

# 3. 安装 Irys SDK
npm install @irys/upload @irys/upload-ethereum

# 4. 安装 dotenv 依赖（用于读取 .env 文件中的环境变量）
npm install dotenv`
    : `# 1. Check Node.js version (requires v18 or higher)
node --version

# 2. Check npm version
npm --version

# 3. Install Irys SDK
npm install @irys/upload @irys/upload-ethereum

# 4. Install dotenv dependency (for reading environment variables from .env file)
npm install dotenv`

  const envCode = `# .env
PRIVATE_KEY=your_private_key_here`

  // 测验题目 - 从翻译系统读取
  const quizQuestions = t.quizQuestions.chapter2

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowQuiz(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 w-full max-w-full overflow-hidden"
    >
      <div>
        <h2 className="text-4xl font-bold gradient-text mb-4">
          {t.chapter2.title}
        </h2>
        <p className="text-dark-text-secondary text-lg">
          {t.chapter2.intro}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-2xl font-semibold mb-3 text-dark-text-primary">
            {language === 'zh' ? '1. ' + t.chapter2.install : '1. ' + t.chapter2.install}
          </h3>
          <p className="text-dark-text-secondary leading-relaxed mb-4">
            {language === 'zh' 
              ? 'Irys SDK 需要 Node.js v18 或更高版本。如果尚未安装，请先访问 ' 
              : 'Irys SDK requires Node.js v18 or higher. If not installed, first visit '}
            <a 
              href="https://nodejs.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline"
            >
              nodejs.org
            </a>
            {language === 'zh' 
              ? ' 下载并安装 LTS 版本，然后运行以下命令：' 
              : ' to download and install the LTS version, then run the following commands:'}
          </p>
          <CodeBlock
            code={installCode}
            language="bash"
          />
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm flex items-start gap-2">
              <LightningBoltIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>{t.common.tip}：</strong>{' '}{t.common.recommendLTS}</span>
            </p>
          </div>
          
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3 text-dark-text-primary">
              {t.common.tryItOut}
            </h4>
            <InteractiveMacTerminal
              title="HELLO IRYS"
              username="Iryna"
              hostname="macbook"
            />
            <div className="mt-3 p-3 bg-gray-500/10 border border-gray-500/20 rounded-lg">
              <p className="text-gray-400 text-xs">
                {t.common.terminalHint}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-3 text-dark-text-primary">
            {language === 'zh' ? '2. ' + t.chapter2.setup : '2. ' + t.chapter2.setup}
          </h3>
          <p className="text-dark-text-secondary leading-relaxed mb-4">
            {t.chapter2.setupDesc}
          </p>
          <CodeBlock
            title=".env"
            code={envCode}
            language="bash"
          />
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <ExclamationTriangleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>{t.common.securityNote}：</strong>{' '}{t.common.protectPrivateKey}</span>
            </p>
          </div>
        </section>
      </div>

      {/* 测验和导航按钮区域 / Quiz and Navigation Area */}
      <div className="pt-8 border-t border-dark-border">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="ghost" onClick={onPrevious}>
              ← {t.previous}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* 开始测试按钮 / Start Quiz Button */}
            {!quizCompleted && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="outline"
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white"
                >
                  {t.common.startQuiz}
                </Button>
              </motion.div>
            )}

            {/* 下一步按钮 - 测验完成前锁定 / Next Button - Locked Before Quiz Complete */}
            {quizCompleted ? (
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
                  {t.common.quizUnlockHint}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 测验弹窗 / Quiz Modal */}
      {showQuiz && (
        <Quiz
          questions={quizQuestions}
          chapterId={2}
          onComplete={handleQuizComplete}
          onCancel={() => setShowQuiz(false)}
        />
      )}
    </motion.div>
  )
}



