import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { studioCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function StudioPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(studioCategories[0])
  const items = data.studio.items[category] || []

  return (
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
      <section className="grid gap-5 lg:grid-cols-2">
        {items.length ? items.map((item) => (
          <SimpleCard
            key={item.id}
            title={item.title}
            description={item.description}
            media={item.file}
            mediaType={item.type}
          />
        )) : <div className="glass p-6 text-sm text-slate-500">Todavia no hay contenido en esta categoria.</div>}
      </section>
    </div>
  )
}
