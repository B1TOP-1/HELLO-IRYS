import { useEffect } from 'react'
import { useProgress } from '../contexts/ProgressContext'

/**
 * 章节进度跟踪 Hook
 * 每个章节有固定的进度：
 * - 第1步：20%，0个章节完成
 * - 第2步：40%，第1步完成
 * - 第3步：60%，第1、2步完成
 * - 第4步：80%，第1、2、3步完成
 * - 第5步：100%，第1、2、3、4步完成
 */
export function useChapterProgress(chapterId: number) {
  const { updateChapterProgress, markChapterComplete } = useProgress()

  useEffect(() => {
    // 每个章节的固定进度值
    const progressMap: Record<number, number> = {
      1: 20,
      2: 40,
      3: 60,
      4: 80,
      5: 100,
    }

    // 设置当前章节的进度
    const currentProgress = progressMap[chapterId] || 20
    updateChapterProgress(chapterId, currentProgress)

    // 标记之前的所有章节为完成（绿色）
    for (let i = 1; i < chapterId; i++) {
      markChapterComplete(i)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId])  // 只依赖 chapterId，避免无限循环
}

