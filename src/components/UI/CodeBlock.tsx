import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 rounded-lg overflow-hidden border border-dark-border"
    >
      {title && (
        <div className="bg-dark-hover px-4 py-2 border-b border-dark-border">
          <span className="text-sm text-dark-text-secondary">{title}</span>
        </div>
      )}
      <div className="bg-dark-surface p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className={`language-${language} text-dark-text-primary`}>
            {code}
          </code>
        </pre>
      </div>
    </motion.div>
  )
}



