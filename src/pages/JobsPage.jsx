import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { useSite } from '../state/SiteContext'

export function JobsPage() {
  const { data } = useSite()

  return (
    <div className="space-y-6">
      <SectionHeader title={data.jobs.title} text={data.jobs.description} />
      <section className="grid gap-5 lg:grid-cols-2">
        {data.jobs.items.length ? (
          data.jobs.items.map((item) => (
            <SimpleCard key={item.id} title={item.title} subtitle={item.category} description={item.description}>
              <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-700">{item.cta}</div>
            </SimpleCard>
          ))
        ) : (
          <div className="glass p-6 text-sm text-slate-500">Todavia no hay trabajos o servicios cargados.</div>
        )}
      </section>
    </div>
  )
}
