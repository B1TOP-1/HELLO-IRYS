import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useProgress } from '../../contexts/ProgressContext'
import { CheckIcon, ImageIcon, LockClosedIcon } from '@radix-ui/react-icons'

interface Chapter {
  id: number
  title: string
  component: React.ComponentType<any>
}

interface SidebarProps {
  chapters: Chapter[]
  currentChapter: number
  onChapterChange: (id: number) => void
  showMyNFTs?: boolean
  onShowMyNFTs?: () => void
}

export default function Sidebar({
  chapters,
  currentChapter,
  onChapterChange,
  showMyNFTs = false,
  onShowMyNFTs,
}: SidebarProps) {
  const { language, t } = useLanguage()
  const { getChapterProgress, getHighestUnlockedChapter } = useProgress()
  
  // 获取用户已解锁的最高章节（基于完成进度，不是当前查看章节）
  const highestUnlockedChapter = getHighestUnlockedChapter()
  
  // 计算总体进度（基于当前章节）
  const getOverallProgress = () => {
    return getChapterProgress(currentChapter) || 0
  }
  
  const overallProgress = getOverallProgress()
  
  // 使用 motion value 来平滑更新进度条，避免每次都从 0 开始
  const progressMotionValue = useMotionValue(overallProgress)
  const smoothProgress = useSpring(progressMotionValue, { 
    stiffness: 100, 
    damping: 30 
  })
  // 将数字转换为百分比字符串
  const progressWidth = useTransform(smoothProgress, (value) => `${value}%`)
  
  useEffect(() => {
    progressMotionValue.set(overallProgress)
  }, [overallProgress, progressMotionValue])

  return (
    <aside className="h-screen bg-dark-surface border-r border-dark-border flex flex-col overflow-hidden">
      {/* Logo/标题区域 */}
      <div className="p-4 sm:p-6 md:p-8 border-b border-dark-border flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text"
          >
            {t.title}
          </motion.h1>
        </div>
        <p className="text-dark-text-secondary text-xs sm:text-sm mb-4">
          {t.subtitle}
        </p>
        
        {/* 总体进度条 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-dark-text-muted">{t.overallProgress || '整体进度'}</span>
            <span className="font-bold text-accent-primary">{overallProgress}%</span>
          </div>
          <div className="h-2 bg-dark-hover rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-2 px-2 sm:px-4">
          {chapters.map((chapter, index) => {
            const isCurrent = currentChapter === chapter.id
            // 判断章节是否已完成（基于用户解锁的最高章节）
            const isPast = chapter.id < highestUnlockedChapter
            // 锁定：章节编号 > 最高已解锁章节（即还未解锁）
            const isLocked = chapter.id > highestUnlockedChapter

            return (
              <div key={chapter.id}>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => !isLocked && onChapterChange(chapter.id)}
                    disabled={isLocked}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-all duration-200 relative
                      ${
                        isCurrent
                          ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'
                          : isPast
                          ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20'
                          : isLocked
                          ? 'bg-dark-hover/30 text-dark-text-muted cursor-not-allowed opacity-60'
                          : 'text-dark-text-secondary hover:bg-dark-hover hover:text-dark-text-primary'
                      }
                    `}
                  >
                    {/* 毛玻璃遮罩效果 - 仅用于锁定的章节 */}
                    {isLocked && (
                      <div className="absolute inset-0 backdrop-blur-[2px] bg-dark-surface/40 rounded-lg z-10" />
                    )}
                    
                    <div className="flex items-center gap-3 relative z-20">
                      {/* 章节编号或完成标记或锁图标 */}
                      <div className="relative">
                        <span
                          className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                            ${
                              isPast
                                ? 'bg-green-500 text-white'
                                : isCurrent
                                ? 'bg-white text-accent-primary'
                                : isLocked
                                ? 'bg-dark-border text-dark-text-muted'
                                : 'bg-dark-hover text-dark-text-muted'
                            }
                          `}
                        >
                          {isPast ? (
                            <CheckIcon className="w-3.5 h-3.5" />
                          ) : isLocked ? (
                            <LockClosedIcon className="w-3.5 h-3.5" />
                          ) : (
                            chapter.id
                          )}
                        </span>
                        
                        {/* 完成标记的光晕效果 */}
                        {isPast && (
                          <motion.div
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'easeOut',
                            }}
                            className="absolute inset-0 rounded-full bg-green-500"
                          />
                        )}
                      </div>

                      {/* 章节标题 */}
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium block">
                          {chapter.title}
                        </span>
                        {/* 锁定提示 */}
                        {isLocked && (
                          <span className="text-[10px] sm:text-xs text-dark-text-muted mt-0.5 block">
                            {language === 'zh' ? '完成上一步解锁' : 'Complete previous step'}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.li>

                {/* 我的 NFT 按钮 - 作为第五步的子项，只在解锁第5章后显示 */}
                {chapter.id === 5 && onShowMyNFTs && highestUnlockedChapter > 5 && (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-4"
                  >
                    <button
                      onClick={onShowMyNFTs}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border
                        ${
                          showMyNFTs
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20 border-transparent'
                            : 'border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                          ${showMyNFTs ? 'bg-white text-purple-500' : 'bg-purple-500/20 text-purple-400'}
                        `}>
                          <ImageIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium">
                          {language === 'zh' ? '我的 NFT' : 'My NFTs'}
                        </span>
                      </div>
                    </button>
                  </motion.li>
                )}
              </div>
            )
          })}
        </ul>
      </nav>

      {/* 底部信息 */}
      <div className="p-4 sm:p-6 border-t border-dark-border flex-shrink-0">
        <p className="text-[10px] sm:text-xs text-dark-text-muted">
          {t.footer}
        </p>
        <p className="text-[10px] sm:text-xs text-dark-text-muted mt-1">
          {t.copyright}
        </p>
      </div>
    </aside>
  )
}



