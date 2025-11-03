import { motion } from 'framer-motion'
import WalletConnect from '../Wallet/WalletConnect'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Header() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <header className="fixed top-0 right-0 left-80 z-50 bg-dark-bg/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            {/* Irys 官方角色图标 - 带晃动动画 */}
            <motion.div
              animate={{
                y: [0, -3, 0, -3, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-14 h-14 flex items-center justify-center"
            >
              <img 
                src="https://irys.xyz/assets/characters/character-5.svg" 
                alt="Irys Character"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Hello Irys</h1>
          </div>

          {/* Wallet Connect & Language Toggle */}
          <div className="flex items-center gap-3">
            <WalletConnect />
            {/* 语言切换按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-md bg-dark-hover hover:bg-dark-border text-sm font-medium text-dark-text-secondary hover:text-dark-text-primary transition-all duration-200"
              title="Switch Language / 切换语言"
            >
              {language === 'zh' ? '🇬🇧 English' : '🇨🇳 中文'}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}


