import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface InteractiveMacTerminalProps {
  title?: string
  username?: string
  hostname?: string
  initialCommands?: string[]
}

interface CommandLine {
  id: number
  prompt: string
  command: string
  output: string[]
  isInput?: boolean
}

export default function InteractiveMacTerminal({ 
  title = 'HELLO IRYS',
  username = 'videcodr',
  hostname = 'MacBook-Pro',
  initialCommands = []
}: InteractiveMacTerminalProps) {
  const [lines, setLines] = useState<CommandLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const lineIdCounter = useRef(0)

  const prompt = `${username}@${hostname} ~ %`

  // 初始化终端
  useEffect(() => {
    if (initialCommands.length > 0 && lines.length === 0) {
      const initialLines: CommandLine[] = initialCommands.map((cmd) => ({
        id: lineIdCounter.current++,
        prompt,
        command: cmd,
        output: executeCommand(cmd),
        isInput: false
      }))
      setLines([...initialLines, createInputLine()])
    } else if (lines.length === 0) {
      setLines([createInputLine()])
    }
  }, [initialCommands])

  const createInputLine = (): CommandLine => ({
    id: lineIdCounter.current++,
    prompt,
    command: '',
    output: [],
    isInput: true
  })

  // 模拟命令执行
  const executeCommand = (cmd: string): string[] => {
    const trimmedCmd = cmd.trim()
    
    if (!trimmedCmd) return []
    
    // node --version
    if (trimmedCmd === 'node --version' || trimmedCmd === 'node -v') {
      return ['v20.10.0']
    }
    
    // npm --version
    if (trimmedCmd === 'npm --version' || trimmedCmd === 'npm -v') {
      return ['10.2.3']
    }
    
    // npm install
    if (trimmedCmd.startsWith('npm install') || trimmedCmd.startsWith('npm i')) {
      return [
        '',
        `added 42 packages, and audited 43 packages in 3s`,
        '',
        '7 packages are looking for funding',
        '  run `npm fund` for details',
        '',
        'found 0 vulnerabilities'
      ]
    }
    
    // clear
    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      return ['__CLEAR__']
    }
    
    // help
    if (trimmedCmd === 'help') {
      return [
        'Available commands:',
        '  node --version     Check Node.js version',
        '  npm --version      Check npm version',
        '  npm install        Install packages',
        '  clear              Clear terminal',
        '  help               Show this help'
      ]
    }
    
    // 未知命令
    return [`zsh: command not found: ${trimmedCmd.split(' ')[0]}`]
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter - 执行命令
    if (e.key === 'Enter') {
      const cmd = currentInput.trim()
      const output = executeCommand(cmd)
      
      // 处理 clear 命令
      if (output[0] === '__CLEAR__') {
        setLines([createInputLine()])
        setCurrentInput('')
        return
      }
      
      // 添加到历史
      if (cmd) {
        setCommandHistory([...commandHistory, cmd])
        setHistoryIndex(-1)
      }
      
      // 更新当前输入行为已执行的命令
      setLines(prev => {
        const updated = prev.map(line => 
          line.isInput 
            ? { ...line, command: cmd, output, isInput: false }
            : line
        )
        return [...updated, createInputLine()]
      })
      
      setCurrentInput('')
      
      // 滚动到底部
      setTimeout(() => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 0)
    }
    
    // 上箭头 - 历史命令上翻
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    }
    
    // 下箭头 - 历史命令下翻
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
    
    // Ctrl+C - 取消当前输入
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setCurrentInput('')
    }
    
    // Ctrl+L - 清屏
    if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setLines([createInputLine()])
      setCurrentInput('')
    }
  }

  // 点击终端任意位置聚焦输入框
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

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
        {/* 标题 */}
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

      {/* 终端内容区域 */}
      <div 
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="overflow-y-auto overflow-x-hidden cursor-text"
        style={{
          background: '#1e1e1e',
          minHeight: '300px',
          maxHeight: '500px',
          padding: '1rem',
          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Consolas', monospace",
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {/* 命令行提示符和命令 */}
            <div className="flex items-start">
              <span style={{ color: '#22c55e', whiteSpace: 'nowrap' }}>
                {line.prompt}
              </span>
              <span className="ml-2" style={{ color: '#e5e7eb', wordBreak: 'break-word' }}>
                {line.isInput ? (
                  <div className="flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="outline-none bg-transparent flex-1"
                      style={{ 
                        color: '#e5e7eb',
                        caretColor: '#22c55e',
                        width: '100%',
                        border: 'none'
                      }}
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                ) : (
                  line.command
                )}
              </span>
            </div>
            
            {/* 命令输出 */}
            {line.output.map((outputLine, idx) => (
              <div 
                key={idx} 
                style={{ 
                  color: outputLine.includes('command not found') ? '#ef4444' : '#9ca3af',
                  paddingLeft: '0.5rem',
                  wordBreak: 'break-word'
                }}
              >
                {outputLine}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

