import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../UI/Button'
import MacTerminalCodeBlock from '../UI/MacTerminalCodeBlock'
import Quiz from '../UI/Quiz'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { LockClosedIcon } from '@radix-ui/react-icons'

interface ChapterProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Chapter1({ onNext, isFirst }: ChapterProps) {
  const { t } = useLanguage()
  useChapterProgress(1) // 追踪第一章进度
  const [typingComplete, setTypingComplete] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const codeExample = `import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";

const uploadText = async (text) => {
  const uploader = await Uploader(Ethereum, { network: "testnet" })
    .withWallet(process.env.PRIVATE_KEY);
  
  const receipt = await uploader.upload(Buffer.from(text, 'utf-8'), {
    tags: [{ name: "Content-Type", value: "text/plain; charset=utf-8" }]
  });
  
  return \`https://gateway.irys.xyz/\${receipt.id}\`;
};

console.log(await uploadText("Hello Irys!"));`

  // 测验题目 - 从翻译系统读取
  const quizQuestions = t.quizQuestions.chapter1

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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 md:mb-4">
          {t.chapter1.title}
        </h2>
        <p className="text-dark-text-secondary text-base sm:text-lg">
          {t.chapter1.intro}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-3 text-dark-text-primary">
            {t.chapter1.whatIs}
          </h3>
          <p className="text-dark-text-secondary leading-relaxed">
            {t.chapter1.whatIsDesc}
          </p>
        </section>

        <section>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-3 text-dark-text-primary">
            {t.chapter1.features}
          </h3>
          <ul className="space-y-3 text-dark-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">•</span>
              <span>
                <strong className="text-dark-text-primary">{t.chapter1.feature1}：</strong>
                {t.chapter1.feature1Desc}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">•</span>
              <span>
                <strong className="text-dark-text-primary">{t.chapter1.feature2}：</strong>
                {t.chapter1.feature2Desc}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">•</span>
              <span>
                <strong className="text-dark-text-primary">{t.chapter1.feature3}：</strong>
                {t.chapter1.feature3Desc}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent-primary mt-1">•</span>
              <span>
                <strong className="text-dark-text-primary">{t.chapter1.feature4}：</strong>
                {t.chapter1.feature4Desc}
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-3 text-dark-text-primary">
            {t.chapter1.example}
          </h3>
          <MacTerminalCodeBlock
            title="HELLO IRYS"
            code={codeExample}
            language="javascript"
            animated={true}
            typingSpeed={15}
            onTypingComplete={() => setTypingComplete(true)}
          />
        </section>
      </div>

      {/* 测验和导航按钮区域 / Quiz and Navigation Area */}
      <div className="pt-6 md:pt-8 border-t border-dark-border">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div>
            {!isFirst && (
              <Button variant="ghost" onClick={() => {}} className="w-full sm:w-auto">
                ← {t.previous}
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* 开始测试按钮 - 打字完成后显示 / Start Quiz Button - Show After Typing Complete */}
            {typingComplete && !quizCompleted && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="outline"
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white w-full sm:w-auto"
                >
                  {t.common.startQuiz}
                </Button>
              </motion.div>
            )}

            {/* 下一步按钮 - 测验完成前锁定 / Next Button - Locked Before Quiz Complete */}
            {quizCompleted ? (
              <Button onClick={onNext} className="w-full sm:w-auto">
                {t.next} →
              </Button>
            ) : (
              <div className="relative group w-full sm:w-auto">
                <Button
                  disabled
                  className="opacity-50 cursor-not-allowed flex items-center gap-2 w-full sm:w-auto"
                >
                  <LockClosedIcon className="w-4 h-4" />
                  {t.next}
                </Button>
                {typingComplete && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-dark-surface border border-dark-border rounded-lg text-xs text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {t.common.quizUnlockHint}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 测验弹窗 / Quiz Modal */}
      {showQuiz && (
        <Quiz
          questions={quizQuestions}
          chapterId={1}
          onComplete={handleQuizComplete}
          onCancel={() => setShowQuiz(false)}
        />
      )}
    </motion.div>
  )
}



