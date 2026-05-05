import { ContactPanel } from '../components/ContactPanel'
import { PageHero } from '../components/PageHero'
import { SectionTabs } from '../components/SectionTabs'
import { useSite } from '../state/SiteContext'

export function HomePage() {
  const { data } = useSite()

  return (
    <SectionTabs data={data} targetSection="Inicio" overviewLabel="Portada" emptyText="Todavia no hay publicaciones asignadas a Inicio.">
      <div className="space-y-8">
        <PageHero
          title={data.site.heroTitle}
          description={data.site.heroText}
          media={data.site.heroMedia}
          mediaType={data.site.heroMediaType}
        />
        <ContactPanel title="Haz tu consulta" />
      </div>
    </SectionTabs>
  )
}
