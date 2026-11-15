// Card — Alvar design system
//
// A surface container for grouping related content. Uses the semantic
// surface tokens (surface, raised, muted, border).
//
// Variants:
//   default — surface with subtle border
//   raised  — stronger shadow, used for the persistent mini-player etc.
//   muted   — muted background, no shadow, secondary info blocks

import React from 'react'

type CardVariant = 'default' | 'raised' | 'muted'

interface CardProps {
  variant?: CardVariant
  children: React.ReactNode
  className?: string
}

interface CardSectionProps {
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface border border-border shadow-sm',
  raised: 'bg-raised border border-border shadow-md',
  muted: 'bg-muted border border-border',
}

export function Card({ variant = 'default', children, className = '' }: CardProps) {
  return (
    <div className={['rounded-lg p-4', variantStyles[variant], className].join(' ')}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: CardSectionProps) {
  return (
    <div className={['mb-3 flex items-center justify-between gap-2', className].join(' ')}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }: CardSectionProps) {
  return <div className={['text-body text-foreground', className].join(' ')}>{children}</div>
}

export function CardFooter({ children, className = '' }: CardSectionProps) {
  return (
    <div className={['mt-4 pt-4 border-t border-border flex items-center gap-3', className].join(' ')}>
      {children}
    </div>
  )
}
