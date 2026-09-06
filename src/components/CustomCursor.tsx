import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window
    if (prefersReduced || isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
    }

    const onMouseDown = () => cursor.classList.add('scale-75')
    const onMouseUp = () => cursor.classList.remove('scale-75')

    const addMagnetic = (el: Element) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'))
    }

    document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(addMagnetic)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            node.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(addMagnetic)
          }
        })
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999] w-6 h-6 border border-[#D4AF37] transition-all duration-150 ease-out hidden lg:block"
      style={{ transform: 'translate(-100px, -100px)' }}
    />
  )
}
