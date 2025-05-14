import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRotateProps {
  texts: string[]
  mainClassName?: string
  staggerDuration?: number
  staggerFrom?: "first" | "last"
  rotationInterval?: number
  transition?: any
}

export function TextRotate({
  texts,
  mainClassName = "",
  staggerDuration = 0.03,
  staggerFrom = "first",
  rotationInterval = 3000,
  transition,
}: TextRotateProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsAnimating(false)
      }, 200)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [texts.length, rotationInterval])

  const currentText = texts[currentTextIndex]
  const letters = currentText.split("")

  return (
    <motion.div layout className={cn(mainClassName)}>
      <motion.div
        layout
        className="flex whitespace-pre"
        animate={{ opacity: isAnimating ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {letters.map((letter, index) => {
          const delay =
            staggerFrom === "first"
              ? index * staggerDuration
              : (letters.length - index) * staggerDuration

          return (
            <motion.span
              layout
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay,
                ...transition,
              }}
            >
              {letter}
            </motion.span>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
