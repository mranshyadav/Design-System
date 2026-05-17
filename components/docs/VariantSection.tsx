'use client'
import { motion } from 'framer-motion'
import { PreviewContainer } from './PreviewContainer'

interface VariantSectionProps {
  id: string
  label: string
  description: string
  preview: React.ReactNode
  code: {
    react: string
    html: string
    tailwind: string
    typescript: string
  }
  componentId: string
  index: number
}

export function VariantSection({
  id,
  label,
  description,
  preview,
  code,
  componentId,
  index,
}: VariantSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="mb-16 scroll-mt-6"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <PreviewContainer preview={preview} code={code} componentId={componentId} />
    </motion.div>
  )
}
