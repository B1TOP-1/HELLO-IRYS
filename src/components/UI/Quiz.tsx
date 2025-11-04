import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { useProgress } from '../../contexts/ProgressContext'
import { RocketIcon, LightningBoltIcon, CrossCircledIcon } from '@radix-ui/react-icons'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

interface QuizProps {
  questions: QuizQuestion[]
  chapterId: number
  onComplete: () => void
  onCancel: () => void
}

export default function Quiz({ questions, chapterId, onComplete, onCancel }: QuizProps) {
  const { t } = useLanguage()
  const { markChapterComplete, getChapterProgress } = useProgress()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Set<string>>>({})
  const [showResults, setShowResults] = useState(false)
  const [allCorrect, setAllCorrect] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  // 处理选项点击 - 单选模式
  const handleOptionToggle = (optionId: string) => {
    const questionId = currentQuestion.id
    const correctCount = currentQuestion.options.filter(opt => opt.isCorrect).length
    
    setSelectedOptions(prev => {
      const newSelections = { ...prev }
      
      if (correctCount === 1) {
        // 单选模式：只有一个正确答案，直接替换
        newSelections[questionId] = new Set([optionId])
      } else {
        // 多选模式：允许选择多个
        if (!newSelections[questionId]) {
          newSelections[questionId] = new Set()
        }
        
        const currentSet = new Set(newSelections[questionId])
        if (currentSet.has(optionId)) {
          currentSet.delete(optionId)
        } else {
          currentSet.add(optionId)
        }
        
        newSelections[questionId] = currentSet
      }
      
      return newSelections
    })
  }

  // 检查当前题目是否有选择
  const hasSelection = () => {
    const questionId = currentQuestion.id
    return selectedOptions[questionId] && selectedOptions[questionId].size > 0
  }

  // 检查当前题目答案是否正确 (保留以备将来使用)
  // const isCurrentAnswerCorrect = () => {
  //   const questionId = currentQuestion.id
  //   const selected = selectedOptions[questionId] || new Set()
  //   const correctIds = currentQuestion.options
  //     .filter(opt => opt.isCorrect)
  //     .map(opt => opt.id)
  //   
  //   if (selected.size !== correctIds.length) return false
  //   
  //   return correctIds.every(id => selected.has(id))
  // }

  // 下一题
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 最后一题，检查所有答案
      checkAllAnswers()
    }
  }

  // 检查所有答案
  const checkAllAnswers = () => {
    const allAnswersCorrect = questions.every(question => {
      const selected = selectedOptions[question.id] || new Set()
      const correctIds = question.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id)
      
      if (selected.size !== correctIds.length) return false
      return correctIds.every(id => selected.has(id))
    })
    
    setAllCorrect(allAnswersCorrect)
    setShowResults(true)
    
    // 如果全部答对，标记章节完成
    if (allAnswersCorrect) {
      markChapterComplete(chapterId)
    }
  }

  // 重新开始
  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptions({})
    setShowResults(false)
    setAllCorrect(false)
  }

  // 结果页面
  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
      <motion.div
        className="bg-dark-surface rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-2 sm:mx-4 shadow-2xl border border-dark-border max-h-[90vh] overflow-y-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
          {allCorrect ? (
            <div className="text-center space-y-6">
              {/* 成功图标 */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <RocketIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400">{t.quiz.congratulations}</h3>
              <p className="text-dark-text-secondary">
                {t.quiz.congratulationsDesc}
              </p>
              
              {/* 进度显示 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-dark-text-secondary">
                    {t.overallProgress || '章节进度'}
                  </span>
                  <span className="font-bold text-accent-primary">
                    {getChapterProgress(chapterId)}%
                  </span>
                </div>
                <div className="h-2 bg-dark-hover rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  />
                </div>
              </div>
              
              <Button 
                onClick={onComplete}
                className="w-full"
              >
                {t.quiz.continueLearning}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              {/* 失败图标 */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                    <CrossCircledIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-red-400">{t.quiz.answerIncorrect}</h3>
              <p className="text-dark-text-secondary">
                {t.quiz.answerIncorrectDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleRetry}
                  variant="outline"
                  className="flex-1 w-full sm:w-auto"
                >
                  {t.quiz.retryQuiz}
                </Button>
                <Button 
                  onClick={onCancel}
                  variant="ghost"
                  className="flex-1 w-full sm:w-auto"
                >
                  {t.quiz.backToStudyBtn}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    )
  }

  // 测验页面
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        className="bg-dark-surface rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full mx-2 sm:mx-4 shadow-2xl border border-dark-border max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-dark-text-secondary">
              {t.quiz.questionLabel} {currentQuestionIndex + 1} {t.quiz.of} {questions.length}
            </span>
            <button
              onClick={onCancel}
              className="text-dark-text-secondary hover:text-dark-text-primary transition-colors"
            >
              {t.quiz.close}
            </button>
          </div>
          <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* 题目 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-dark-text-primary mb-4 md:mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* 选项 */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptions[currentQuestion.id]?.has(option.id)
                const isSingleChoice = currentQuestion.options.filter(opt => opt.isCorrect).length === 1
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleOptionToggle(option.id)}
                    className={`
                      w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-200
                      border-2 flex items-center gap-2 sm:gap-3
                      ${isSelected 
                        ? 'border-accent-primary bg-accent-primary/10' 
                        : 'border-dark-border bg-dark-bg hover:border-dark-hover'
                      }
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* 单选框或复选框 */}
                    <div
                      className={`
                        w-5 h-5 border-2 flex items-center justify-center
                        transition-all duration-200
                        ${isSingleChoice ? 'rounded-full' : 'rounded'}
                        ${isSelected 
                          ? 'border-accent-primary bg-accent-primary' 
                          : 'border-dark-border'
                        }
                      `}
                    >
                      {isSelected && (
                        isSingleChoice ? (
                          // 单选按钮 - 实心圆点
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-white"
                          />
                        ) : (
                          // 复选框 - 勾选标记
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeWidth="3"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )
                      )}
                    </div>
                    
                    <span className={`flex-1 text-sm sm:text-base ${isSelected ? 'text-dark-text-primary font-medium' : 'text-dark-text-secondary'}`}>
                      {option.text}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* 提示 */}
            <div className="text-sm text-dark-text-secondary mb-6 flex items-center gap-2">
              <div className="flex-shrink-0">
                <LightningBoltIcon className="w-4 h-4 text-accent-primary" />
              </div>
              <span>
                {currentQuestion.options.filter(opt => opt.isCorrect).length === 1 
                  ? t.quiz.selectSingleAnswer
                  : t.quiz.selectMultipleAnswers
                }
              </span>
            </div>

            {/* 按钮 */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <Button
                onClick={onCancel}
                variant="ghost"
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                {t.quiz.backToStudy}
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                {currentQuestionIndex > 0 && (
                  <Button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {t.quiz.previousQuestion}
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={!hasSelection()}
                  className="w-full sm:w-auto"
                >
                  {currentQuestionIndex === questions.length - 1 ? t.quiz.submitAnswer : t.quiz.nextQuestion}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

