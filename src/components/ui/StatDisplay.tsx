// StatDisplay — Alvar design system
//
// Outdoor mode only — doesn't exist in companion/studio. A single big
// tabular number with a label underneath, sized to read at arm's length or
// floor distance. See DESIGN-SYSTEM.md section 3 (display scale, 64–96px).

import React from 'react'

interface StatDisplayProps {
  value: string | number
  label: string
  className?: string
}

export function StatDisplay({ value, label, className = '' }: StatDisplayProps) {
  return (
    <div className={className}>
      <div className="text-stat font-medium tabular-nums text-foreground leading-none">
        {value}
      </div>
      <div className="text-caption font-medium text-muted-text mt-2">{label}</div>
    </div>
  )
}
