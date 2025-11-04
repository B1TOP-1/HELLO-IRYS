import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLanguage } from './i18n/LanguageContext'
import { ProgressProvider, useProgress } from './contexts/ProgressContext'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import WelcomePage from './components/Welcome/WelcomePage'
import Chapter1 from './components/Chapters/Chapter1'
import Chapter2 from './components/Chapters/Chapter2'
import Chapter3 from './components/Chapters/Chapter3'
import Chapter4 from './components/Chapters/Chapter4'
import Chapter5 from './components/Chapters/Chapter5'
import MyNFTs from './components/NFT/MyNFTs'

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(1)
  const [showMyNFTs, setShowMyNFTs] = useState(false)
  const { t } = useLanguage()
  const { markChapterComplete } = useProgress()
  const mainContentRef = useRef<HTMLElement>(null)

  // 检查是否已经看过欢迎页面
  // 注释掉：每次刷新都显示欢迎界面
  // useEffect(() => {
  //   const hasSeenWelcome = localStorage.getItem(WELCOME_SEEN_KEY)
  //   if (hasSeenWelcome === 'true') {
  //     setShowWelcome(false)
  //   }
  // }, [])

  const handleStartLearning = () => {
    // 注释掉：不再保存到 localStorage
    // localStorage.setItem(WELCOME_SEEN_KEY, 'true')
    setShowWelcome(false)
  }

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

  // 章节切换时滚动到顶部
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentChapter, showMyNFTs])

  // 如果显示欢迎页面，只显示欢迎页面
  if (showWelcome) {
    return <WelcomePage onStartLearning={handleStartLearning} />
  }

  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      {/* 左侧边栏 - 桌面端显示，移动端隐藏（通过抽屉显示） */}
      <div className="hidden md:block w-80 flex-shrink-0 h-screen overflow-hidden">
        <Sidebar
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
          showMyNFTs={showMyNFTs}
          onShowMyNFTs={handleShowMyNFTs}
        />
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:ml-0">
        {/* Header - 固定在顶部 */}
        <Header
          chapters={chapters}
          currentChapter={currentChapter}
          onChapterChange={handleChapterChange}
          showMyNFTs={showMyNFTs}
          onShowMyNFTs={handleShowMyNFTs}
        />
        
        {/* 主内容 - 只允许垂直滚动 */}
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
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



