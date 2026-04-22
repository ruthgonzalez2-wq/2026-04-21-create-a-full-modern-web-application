import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { marketingCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function MarketingPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(marketingCategories[0])
  const items = data.marketing.items[category] || []

  return (
    <div className="space-y-6">
      <SectionHeader title={data.marketing.title} text={data.marketing.description} />
      <div className="flex flex-wrap gap-3">
        {marketingCategories.map((item) => (
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
        {items.length ? (
          items.map((item) => (
            <SimpleCard
              key={item.id}
              title={item.title}
              description={item.description}
              media={item.file}
              mediaType={item.type}
            />
          ))
        ) : (
          <div className="glass p-6 text-sm text-slate-500">Todavia no hay contenido en marketing.</div>
        )}
      </section>
    </div>
  )
}
