import { CheckMedHero } from '@/components/checkmed/CheckMedHero'
import { CheckMedNavbar } from '@/components/checkmed/CheckMedNavbar'

export const metadata = {
  title: 'CheckMed — Employee Health Benefits & IPD Protection',
  description:
    'CheckMed gives your employees complete IPD hospitalization protection and proactive healthcare — so minor issues never become costly hospital admissions.',
}

export default function CheckMedPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <CheckMedNavbar />
      <CheckMedHero />
    </div>
  )
}
