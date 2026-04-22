import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { useSite } from '../state/SiteContext'

export function EbooksPage() {
  const { data } = useSite()

  return (
    <div className="space-y-6">
      <SectionHeader title={data.ebooks.title} text={data.ebooks.description} />
      <section className="grid gap-5 lg:grid-cols-2">
        {data.ebooks.items.length ? (
          data.ebooks.items.map((item) => (
            <SimpleCard key={item.id} title={item.title} description={item.description} image={item.cover}>
              {item.link ? (
                <a className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" href={item.link} target="_blank" rel="noreferrer">
                  Abrir libro
                </a>
              ) : null}
            </SimpleCard>
          ))
        ) : (
          <div className="glass p-6 text-sm text-slate-500">Todavia no hay libros cargados.</div>
        )}
      </section>
    </div>
  )
}
