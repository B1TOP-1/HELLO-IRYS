import { motion } from 'framer-motion'
import { RocketIcon } from '@radix-ui/react-icons'
import Button from '../UI/Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { translations } from '../../i18n/translations'

interface WelcomePageProps {
  onStartLearning: () => void
}

export default function WelcomePage({ onStartLearning }: WelcomePageProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center space-y-8 sm:space-y-12"
      >
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-2xl flex items-center justify-center shadow-2xl">
              <RocketIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
              {t.welcome.title}
            </h1>
          </div>
          
          <div className="space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
              {t.welcome.subtitle}
            </p>
            {t.welcome.subtitle === translations.zh.welcome.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-dark-text-muted max-w-2xl mx-auto leading-relaxed">
                {translations.en.welcome.subtitle}
              </p>
            )}
          </div>
        </motion.div>

        {/* 装饰性元素 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-2 sm:gap-3"
        >
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-primary rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-secondary rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-accent-primary rounded-full"></div>
        </motion.div>

        {/* 开始学习按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-4 sm:pt-6"
        >
          <Button
            onClick={onStartLearning}
            className="px-8 sm:px-12 md:px-16 py-4 sm:py-5 text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 shadow-2xl hover:shadow-accent-primary/50 transition-all transform hover:scale-105"
          >
            <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            {t.welcome.startButton}
          </Button>
        </motion.div>

        {/* 底部提示信息 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm sm:text-base text-dark-text-muted pt-4 sm:pt-6"
        >
          {t.welcome.hint}
        </motion.p>
      </motion.div>
    </div>
  )
}

