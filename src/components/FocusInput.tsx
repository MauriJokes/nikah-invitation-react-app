/**
 * FocusInput / FocusTextarea / FocusSelect
 *
 * Reusable wrappers that fix two problems:
 *  1. iOS Safari auto-zooms when input font-size < 16px. Setting font-size to
 *     1rem (16px) prevents the native zoom entirely.
 *  2. Provides a smooth CSS transition for the focus ring so the visual state
 *     always returns cleanly on blur — no persistent transforms or stuck states.
 *
 * Usage: drop-in replacement for <input>, <textarea>, <select>.
 * All HTML attributes and styles are forwarded; the wrapper only overrides
 * font-size and box-shadow / border-color for the focus effect.
 */
import { useState, forwardRef } from 'react'

const FOCUSED_SHADOW = '0 0 0 3px rgba(175, 203, 255, 0.25)'
const TRANSITION = 'box-shadow 0.25s ease'

// ── Input ─────────────────────────────────────────────────────────────────────

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const FocusInput = forwardRef<HTMLInputElement, InputProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <input
        ref={ref}
        {...props}
        style={{
          ...style,
          fontSize: '1rem',           // ≥ 16px → iOS Safari will NOT auto-zoom
          outline: 'none',
          transition: TRANSITION,
          boxShadow: focused ? FOCUSED_SHADOW : 'none',
        }}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
      />
    )
  }
)
FocusInput.displayName = 'FocusInput'

// ── Textarea ──────────────────────────────────────────────────────────────────

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const FocusTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <textarea
        ref={ref}
        {...props}
        style={{
          ...style,
          fontSize: '1rem',
          outline: 'none',
          transition: TRANSITION,
          boxShadow: focused ? FOCUSED_SHADOW : 'none',
        }}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
      />
    )
  }
)
FocusTextarea.displayName = 'FocusTextarea'

// ── Select ────────────────────────────────────────────────────────────────────

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const FocusSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    return (
      <select
        ref={ref}
        {...props}
        style={{
          ...style,
          fontSize: '1rem',
          outline: 'none',
          transition: TRANSITION,
          boxShadow: focused ? FOCUSED_SHADOW : 'none',
        }}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
      />
    )
  }
)
FocusSelect.displayName = 'FocusSelect'
