'use client'

import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HoverFillText from './hoverFillText'
import { useLanguage } from './languageContext'
import { Globe } from 'lucide-react'

const LanguageBtn = () => {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Mounted after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative flex items-center" ref={ref}>
      {/* Main button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Select language"
        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-105"
      >
        <Globe className="h-6 w-6" />
      </button>

      {/* Drop-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute top-full mt-2 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-visible z-[999999]"
            style={{
                    background: 'var(--background)',
                    border: '1px solid var(--foreground-muted)'
                  }}
          >
            {['en', 'fr', 'jp'].map((lang) => {
              const isActive = language === lang
              return (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as 'en' | 'fr' | 'jp')
                    setOpen(false)
                  }}
                  className="px-4 py-2 text-center flex justify-center transition-colors"
                >
                <HoverFillText active={isActive}>{lang.toUpperCase()}</HoverFillText>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageBtn
