import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface ChapterProgress {
  completed: boolean
  progress: number // 0-100
  lastVisited?: Date
}

interface ProgressContextType {
  chapters: Record<number, ChapterProgress>
  markChapterComplete: (chapterId: number) => void
  updateChapterProgress: (chapterId: number, progress: number) => void
  isChapterComplete: (chapterId: number) => boolean
  getChapterProgress: (chapterId: number) => number
  getHighestUnlockedChapter: () => number
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

const STORAGE_KEY = 'irys_tutorial_progress'

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [chapters, setChapters] = useState<Record<number, ChapterProgress>>(() => {
    // 从 localStorage 加载进度
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse stored progress:', e)
      }
    }
    return {}
  })

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters))
  }, [chapters])

  const markChapterComplete = useCallback((chapterId: number) => {
    setChapters((prev) => ({
      ...prev,
      [chapterId]: {
        completed: true,
        progress: 100,
        lastVisited: new Date(),
      },
    }))
  }, [])

  const updateChapterProgress = useCallback((chapterId: number, progress: number) => {
    setChapters((prev) => ({
      ...prev,
      [chapterId]: {
        completed: progress >= 100,
        progress: Math.min(100, Math.max(0, progress)),
        lastVisited: new Date(),
      },
    }))
  }, [])

  const isChapterComplete = useCallback((chapterId: number): boolean => {
    const chapter = chapters[chapterId]
    return chapter?.completed === true || chapter?.progress === 100
  }, [chapters])

  const getChapterProgress = useCallback((chapterId: number): number => {
    return chapters[chapterId]?.progress || 0
  }, [chapters])

  // 获取用户曾经解锁到的最高章节
  const getHighestUnlockedChapter = useCallback((): number => {
    // 如果没有章节数据，默认解锁第1章
    if (Object.keys(chapters).length === 0) {
      return 1
    }
    
    // 找到所有已完成章节的最大值，然后+1
    const completedChapterIds = Object.keys(chapters)
      .map(Number)
      .filter((id) => {
        const chapter = chapters[id]
        return chapter?.completed || chapter?.progress === 100
      })
    
    if (completedChapterIds.length === 0) {
      return 1
    }
    
    return Math.max(...completedChapterIds) + 1
  }, [chapters])

  const resetProgress = useCallback(() => {
    setChapters({})
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        chapters,
        markChapterComplete,
        updateChapterProgress,
        isChapterComplete,
        getChapterProgress,
        getHighestUnlockedChapter,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

