import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { SimpleCard } from '../components/SimpleCard'
import { useSite } from '../state/SiteContext'

export function CoursesPage() {
  const { data } = useSite()

  return (
    <SectionTabs data={data} targetSection="Cursos" overviewLabel="Cursos" emptyText="Todavia no hay publicaciones asignadas a Cursos.">
      <div className="space-y-6">
        <SectionHeader title={data.courses.title} text={data.courses.description} />
        <section className="grid gap-5 lg:grid-cols-2">
          {data.courses.items.length ? (
            data.courses.items.map((item) => (
              <SimpleCard key={item.id} title={item.title} subtitle={item.category} description={item.description} image={item.image}>
                <div className="grid gap-2 text-sm text-slate-600">
                  <p><strong>Estructura:</strong> {item.lessons}</p>
                  <p><strong>Formato:</strong> {item.format}</p>
                </div>
              </SimpleCard>
            ))
          ) : (
            <div className="glass p-6 text-sm text-slate-500">Todavia no hay cursos cargados.</div>
          )}
        </section>
      </div>
    </SectionTabs>
  )
}
