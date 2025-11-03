import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLanguage } from './i18n/LanguageContext'
import { ProgressProvider, useProgress } from './contexts/ProgressContext'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Chapter1 from './components/Chapters/Chapter1'
import Chapter2 from './components/Chapters/Chapter2'
import Chapter3 from './components/Chapters/Chapter3'
import Chapter4 from './components/Chapters/Chapter4'
import Chapter5 from './components/Chapters/Chapter5'
import MyNFTs from './components/NFT/MyNFTs'

function AppContent() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [showMyNFTs, setShowMyNFTs] = useState(false)
  const { t } = useLanguage()
  const { markChapterComplete } = useProgress()

  const chapters = [
    { id: 1, title: t.chapters[1], component: Chapter1 },
    { id: 2, title: t.chapters[2], component: Chapter2 },
    { id: 3, title: t.chapters[3], component: Chapter3 },
    { id: 4, title: t.chapters[4], component: Chapter4 },
    { id: 5, title: t.chapters[5], component: Chapter5 },
  ]

  const CurrentChapterComponent = chapters.find(
    (ch) => ch.id === currentChapter
  )?.component || Chapter1

  const goToNext = () => {
    if (currentChapter < chapters.length) {
      // 标记当前章节为完成
      markChapterComplete(currentChapter)
      setCurrentChapter(currentChapter + 1)
    }
  }

  const goToPrevious = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const handleChapterChange = (chapterId: number) => {
    // 如果跳转到更后面的章节，自动标记所有之前的章节为完成
    if (chapterId > currentChapter) {
      for (let i = currentChapter; i < chapterId; i++) {
        markChapterComplete(i)
      }
    }
    setCurrentChapter(chapterId)
    setShowMyNFTs(false)
  }

  const handleShowMyNFTs = () => {
    setShowMyNFTs(true)
  }

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      {/* 左侧边栏 - 固定，不随页面滚动 */}
      <div className="w-80 flex-shrink-0 h-screen overflow-hidden">
        <Sidebar
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
          showMyNFTs={showMyNFTs}
          onShowMyNFTs={handleShowMyNFTs}
        />
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - 固定在顶部 */}
        <Header />
        
        {/* 主内容 - 只允许垂直滚动 */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-20">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <AnimatePresence mode="wait">
              {showMyNFTs ? (
                <MyNFTs key="my-nfts" />
              ) : (
                <CurrentChapterComponent
                  key={currentChapter}
                  onNext={goToNext}
                  onPrevious={goToPrevious}
                  isFirst={currentChapter === 1}
                  isLast={currentChapter === chapters.length}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  )
}

export default App



