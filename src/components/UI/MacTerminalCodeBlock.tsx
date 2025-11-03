import { motion } from 'framer-motion'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useState, useEffect, useRef } from 'react'

// 注册语言
SyntaxHighlighter.registerLanguage('javascript', javascript)

interface MacTerminalCodeBlockProps {
  code: string
  language?: string
  title?: string
  animated?: boolean  // 是否启用打字机动画
  typingSpeed?: number  // 打字速度（毫秒/字符）
  onTypingComplete?: () => void  // 打字完成回调
}

export default function MacTerminalCodeBlock({ 
  code, 
  language = 'javascript', 
  title = 'HELLO IRYS',
  animated = false,
  typingSpeed = 15,
  onTypingComplete
}: MacTerminalCodeBlockProps) {
  const [displayedCode, setDisplayedCode] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [codeHeight, setCodeHeight] = useState<number | null>(null)
  const [hasTyped, setHasTyped] = useState(false)  // 标记是否已经打字过
  const timerRef = useRef<number>()
  const measureRef = useRef<HTMLDivElement>(null)
  
  // 测量完整代码的高度
  useEffect(() => {
    if (measureRef.current && animated) {
      const height = measureRef.current.scrollHeight
      setCodeHeight(height)
    }
  }, [code, animated])
  
  useEffect(() => {
    if (!animated) {
      setDisplayedCode(code)
      setIsTypingComplete(true)
      setShowCursor(false)
      return
    }
    
    // 如果已经打字过，直接显示完整内容
    if (hasTyped) {
      setDisplayedCode(code)
      setIsTypingComplete(true)
      setShowCursor(false)
      return
    }
    
    // 打字机效果（只执行一次）
    setDisplayedCode('')
    setIsTypingComplete(false)
    setShowCursor(true)
    
    let currentIndex = 0
    let isCancelled = false
    
    const typeNextChar = () => {
      if (isCancelled) return
      
      if (currentIndex < code.length) {
        setDisplayedCode(code.substring(0, currentIndex + 1))
        currentIndex++
        timerRef.current = window.setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTypingComplete(true)
        setHasTyped(true)  // 标记已完成打字
        // 打字完成后，光标闪烁一会儿再消失
        window.setTimeout(() => {
          if (!isCancelled) {
            setShowCursor(false)
            // 调用完成回调
            if (onTypingComplete) {
              onTypingComplete()
            }
          }
        }, 1000)
      }
    }
    
    typeNextChar()
    
    return () => {
      isCancelled = true
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, animated, typingSpeed])  // 移除 hasTyped 依赖，避免循环
  
  // 光标闪烁效果
  useEffect(() => {
    if (!showCursor || isTypingComplete) return
    
    const cursorInterval = window.setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => {
      window.clearInterval(cursorInterval)
    }
  }, [showCursor, isTypingComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 rounded-lg overflow-hidden shadow-2xl w-full max-w-full"
      style={{
        background: '#1e1e1e',
      }}
    >
      {/* Mac 终端标题栏 */}
      <div 
        className="px-4 py-3 flex items-center gap-2"
        style={{
          background: '#323232',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        {/* Mac 三个按钮 */}
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              background: '#ff5f56',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
            }}
          />
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              background: '#ffbd2e',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
            }}
          />
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              background: '#27c93f',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
            }}
          />
        </div>
        {/* 文件名 */}
        <div className="flex-1 text-center">
          <span 
            className="text-sm font-medium"
            style={{ color: '#8b8b8b' }}
          >
            {title}
          </span>
        </div>
        {/* 占位保持居中 */}
        <div className="w-[52px]" />
      </div>

      {/* 隐藏的测量元素 - 用于获取完整代码的高度 */}
      {animated && (
        <div 
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            width: '100%',
          }}
        >
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.9rem',
              lineHeight: '1.6',
            }}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}

      {/* 代码区域 */}
      <div 
        className="overflow-x-auto relative"
        style={{
          background: '#1e1e1e',
          minHeight: animated && codeHeight ? `${codeHeight}px` : '200px',
          height: animated && codeHeight ? `${codeHeight}px` : 'auto',
        }}
      >
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.9rem',
              lineHeight: '1.6',
            }}
            codeTagProps={{
              style: {
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
              }
            }}
            showLineNumbers={false}
          >
            {displayedCode}
          </SyntaxHighlighter>
          
          {/* 打字光标 */}
          {animated && showCursor && (
            <span
              className="inline-block animate-pulse"
              style={{
                position: 'absolute',
                width: '2px',
                height: '1em',
                background: '#528bff',
                marginLeft: '2px',
                animation: 'blink 1s step-end infinite',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// 添加光标闪烁的 CSS 动画
const style = document.createElement('style')
style.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`
if (typeof document !== 'undefined' && !document.querySelector('style[data-cursor-blink]')) {
  style.setAttribute('data-cursor-blink', 'true')
  document.head.appendChild(style)
}

