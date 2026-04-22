import { SectionHeader } from '../components/SectionHeader'
import { useSite } from '../state/SiteContext'

export function PrivacyPage() {
  const { data } = useSite()
  return (
    <div className="space-y-6">
      <SectionHeader title={data.legal.privacyTitle} text={data.legal.privacyText} />
    </div>
  )
}
