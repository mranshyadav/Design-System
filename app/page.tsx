import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { ComponentsShowcase } from '@/components/home/ComponentsShowcase'
import { BlocksPreview } from '@/components/home/BlocksPreview'
import { Features } from '@/components/home/Features'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <ComponentsShowcase />
      <BlocksPreview />
      <Features />
      <CTASection />
    </main>
  )
}
