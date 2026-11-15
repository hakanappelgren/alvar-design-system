// Badge — Alvar design system
//
// Variants:
//   default — neutral muted background
//   new     — solid blåeld. Reserved for the rare "new"/milestone badge —
//             the one other place blåeld is allowed outside an outdoor CTA
//   accent  — cikoria tint, for everyday tags
//   success — moss
//   warning — lichen
//   error   — rowan

import React from 'react'

type BadgeVariant = 'default' | 'new' | 'accent' | 'success' | 'warning' | 'error'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-text border border-border',
  new: 'bg-action text-white',
  accent: 'bg-accent/10 text-accent border border-accent/30',
  success: 'bg-status-success/10 text-status-success border border-status-success/30',
  warning: 'bg-status-warning/10 text-status-warning border border-status-warning/30',
  error: 'bg-status-error/10 text-status-error border border-status-error/30',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5',
        'text-caption font-medium',
        'rounded-sm',
        variantStyles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
