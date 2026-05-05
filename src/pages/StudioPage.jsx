import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { SimpleCard } from '../components/SimpleCard'
import { studioCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function StudioPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(studioCategories[0])
  const items = data.studio.items[category] || []

  return (
    <SectionTabs data={data} targetSection="Studio" overviewLabel="Studio" emptyText="Todavia no hay publicaciones asignadas a Studio.">
      <div className="space-y-6">
        <SectionHeader title={data.studio.title} text={data.studio.description} />
        <div className="flex flex-wrap gap-3">
          {studioCategories.map((item) => (
            <button
              key={item}
              className={`rounded-full px-4 py-2 text-sm ${category === item ? 'bg-slate-800 text-white' : 'glass'}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <section className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
          {items.length ? items.map((item) => (
            <SimpleCard
              key={item.id}
              title={item.title}
              description={item.description}
              media={item.file}
              mediaType={item.type}
              compact
            />
          )) : <div className="glass p-6 text-sm text-slate-500">Todavia no hay contenido en esta categoria.</div>}
        </section>
      </div>
    </SectionTabs>
  )
}
