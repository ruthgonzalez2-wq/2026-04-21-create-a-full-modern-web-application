import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { helpsCategories, helpsSubjects } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function HelpsPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(helpsCategories[0])
  const [subject, setSubject] = useState(helpsSubjects[0])
  const items = data.helps.items[category][subject] || []

  return (
    <div className="space-y-6">
      <SectionHeader title={data.helps.title} text={data.helps.description} />
      <div className="flex flex-wrap gap-3">
        {helpsCategories.map((item) => (
          <button
            key={item}
            className={`rounded-full px-4 py-2 text-sm ${category === item ? 'bg-slate-800 text-white' : 'glass'}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {helpsSubjects.map((item) => (
          <button
            key={item}
            className={`rounded-full px-4 py-2 text-sm ${subject === item ? 'bg-sky-500 text-white' : 'glass'}`}
            onClick={() => setSubject(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="grid gap-5 lg:grid-cols-2">
        {items.length ? items.map((item) => <SimpleCard key={item.id} title={item.title} description={item.description} />) : <div className="glass p-6 text-sm text-slate-500">Todavia no hay contenido en esta seccion.</div>}
      </section>
    </div>
  )
}
