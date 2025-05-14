import { RefObject, useEffect, useRef } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePositionRef(containerRef: RefObject<HTMLElement>) {
  const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      mousePositionRef.current = { x, y }
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [containerRef])

  return mousePositionRef
} 