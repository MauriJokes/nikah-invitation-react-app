/**
 * useFocusReset
 *
 * Global hook that listens for blur events on any input / textarea / select.
 * When the user leaves a field (and doesn't move to another input), it:
 *  - Finds the nearest scrollable ancestor and returns it to the position it
 *    was at before focus (prevents the modal from jumping after keyboard dismiss)
 *  - Resets window scroll as a fallback
 *
 * Apply once at the app root (App.tsx). No props needed.
 */
import { useEffect } from 'react'

function isInputEl(el: EventTarget | Element | null): el is HTMLElement {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  )
}

function getScrollableAncestor(el: Element | null): Element | null {
  let node = el?.parentElement ?? null
  while (node && node !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll') return node
    node = node.parentElement
  }
  return null
}

export function useFocusReset() {
  useEffect(() => {
    // Remember the scrollable container's scroll position at focus time
    // so we can restore it (not reset to 0) after the keyboard closes.
    const scrollSnapshot = new WeakMap<Element, number>()

    const handleFocusIn = (e: FocusEvent) => {
      if (!isInputEl(e.target)) return
      const container = getScrollableAncestor(e.target as Element)
      if (container) scrollSnapshot.set(container, container.scrollTop)
    }

    const handleFocusOut = (e: FocusEvent) => {
      if (!isInputEl(e.target)) return

      // Defer one frame so relatedTarget / document.activeElement is settled
      requestAnimationFrame(() => {
        // If focus moved to another input, don't interfere
        if (isInputEl(document.activeElement)) return

        const container = getScrollableAncestor(e.target as Element)
        if (container) {
          const saved = scrollSnapshot.get(container) ?? 0
          container.scrollTo({ top: saved, behavior: 'smooth' })
        }

        // Reset any residual window-level scroll drift (safe no-op when
        // body is overflow:hidden, but catches edge cases on Android)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      })
    }

    document.addEventListener('focusin', handleFocusIn, true)
    document.addEventListener('focusout', handleFocusOut, true)

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true)
      document.removeEventListener('focusout', handleFocusOut, true)
    }
  }, [])
}
