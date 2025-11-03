import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-accent-primary to-accent-primary hover:from-accent-primary hover:to-accent-secondary text-white shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40',
    secondary: 'bg-dark-hover hover:bg-dark-border text-dark-text-primary shadow-md hover:shadow-lg',
    ghost: 'hover:bg-dark-hover text-dark-text-secondary hover:text-dark-text-primary',
    outline: 'border-2 border-dark-border hover:border-accent-primary bg-transparent text-dark-text-primary hover:text-accent-primary hover:bg-accent-primary/5 shadow-sm hover:shadow-md',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* 悬停光效 / Hover Glow Effect */}
      {!disabled && variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}



