import { SectionHeader } from '../components/SectionHeader'
import { useSite } from '../state/SiteContext'

export function TermsPage() {
  const { data } = useSite()
  return (
    <div className="space-y-6">
      <SectionHeader title={data.legal.termsTitle} text={data.legal.termsText} />
    </div>
  )
}
