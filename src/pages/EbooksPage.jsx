import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { useSite } from '../state/SiteContext'

function EbookCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="glass flex flex-col items-center p-3 text-center">
      <div className="mx-auto w-fit overflow-hidden rounded-[1.2rem] bg-white/70 p-1.5">
        <img className="h-48 w-[130px] object-cover" src={item.cover} alt={item.title} />
      </div>
      <div className="mt-3 max-w-[170px]">
        <h3 className="text-lg font-semibold leading-6 text-slate-800">{item.title}</h3>
        <p className={`mt-2 text-xs leading-6 text-slate-500 ${isExpanded ? '' : 'line-clamp-3'}`}>{item.description}</p>
        {item.description ? (
          <button className="mt-1 text-xs font-semibold text-sky-600 transition hover:text-sky-700" onClick={() => setIsExpanded((value) => !value)}>
            {isExpanded ? 'Leer menos' : 'Leer mas'}
          </button>
        ) : null}
        {item.link ? (
          <a
            className="mt-3 inline-flex rounded-full bg-[linear-gradient(135deg,#5DADE2,#7FB3D5)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            Abrir libro
          </a>
        ) : null}
      </div>
    </article>
  )
}

export function EbooksPage() {
  const { data } = useSite()

  return (
    <SectionTabs data={data} targetSection="eBooks" overviewLabel="Biblioteca" emptyText="Todavia no hay publicaciones asignadas a eBooks.">
      <div className="space-y-6">
        <SectionHeader title={data.ebooks.title} text={data.ebooks.description} />
        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.ebooks.items.length ? (
            data.ebooks.items.map((item) => <EbookCard key={item.id} item={item} />)
          ) : (
            <div className="glass p-6 text-sm text-slate-500">Todavia no hay libros cargados.</div>
          )}
        </section>
      </div>
    </SectionTabs>
  )
}
