import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import WalletConnect from '../Wallet/WalletConnect'
import { useLanguage } from '../../i18n/LanguageContext'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Sidebar from './Sidebar'

interface HeaderProps {
  chapters?: any[]
  currentChapter?: number
  onChapterChange?: (id: number) => void
  showMyNFTs?: boolean
  onShowMyNFTs?: () => void
}

export default function Header({ chapters, currentChapter, onChapterChange, showMyNFTs, onShowMyNFTs }: HeaderProps) {
  const { language, toggleLanguage } = useLanguage()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 right-0 left-0 md:left-80 z-50 bg-dark-bg/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo / Title - 左侧 */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* 移动端菜单按钮 */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-dark-hover transition-colors"
                aria-label="Open menu"
              >
                <HamburgerMenuIcon className="w-5 h-5 text-dark-text-primary" />
              </button>
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
                className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center"
              >
                <img 
                  src="https://irys.xyz/assets/characters/character-5.svg" 
                  alt="Irys Character"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Hello Irys</h1>
            </div>

            {/* Wallet Connect & Language Toggle */}
            <div className="flex items-center gap-2 md:gap-3">
              <WalletConnect />
              {/* 语言切换按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="px-2 sm:px-3 py-1.5 rounded-md bg-dark-hover hover:bg-dark-border text-xs sm:text-sm font-medium text-dark-text-secondary hover:text-dark-text-primary transition-all duration-200"
                title="Switch Language / 切换语言"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端侧边栏抽屉 */}
      <AnimatePresence>
        {sidebarOpen && chapters && currentChapter && onChapterChange && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* 侧边栏 */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50 md:hidden"
            >
              <Sidebar
                chapters={chapters}
                currentChapter={currentChapter}
                onChapterChange={(id) => {
                  onChapterChange(id)
                  setSidebarOpen(false)
                }}
                showMyNFTs={showMyNFTs}
                onShowMyNFTs={onShowMyNFTs}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


