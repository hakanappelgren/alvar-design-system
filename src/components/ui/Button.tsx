// Button — Alvar design system
//
// Variants:
//   action    — filled blåeld. The rare, loud one — outdoor CTAs, milestones.
//               Don't reach for this by default; see DESIGN-SYSTEM.md section 2.
//   accent    — outline/text in cikoria. The everyday interactive button.
//   secondary — neutral outline, low-emphasis actions
//   ghost     — no border, subtle hover
//
// Sizes: sm | md (default) | lg | outdoor (56px min touch target, full width)

import React from 'react'

type ButtonVariant = 'action' | 'accent' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'outdoor'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  action: 'bg-action text-white hover:opacity-90',
  accent: 'border border-accent text-accent bg-transparent hover:bg-accent/10',
  secondary: 'border border-border text-foreground bg-transparent hover:bg-muted',
  ghost: 'text-foreground bg-transparent hover:bg-muted',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
  outdoor: 'w-full h-14 text-base font-medium rounded-xl', // 56px — see DESIGN-SYSTEM.md section 4
}

export function Button({
  variant = 'accent',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
