import { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { SimpleCard } from '../components/SimpleCard'
import { marketingCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function MarketingPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(marketingCategories[0])
  const items = data.marketing.items[category] || []
  const whatsappBase = 'https://wa.me/18092561175?text='

  return (
    <SectionTabs data={data} targetSection="Recursos" overviewLabel="Recursos" emptyText="Todavia no hay publicaciones asignadas a Recursos.">
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
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.length ? (
            items.map((item) => (
              <SimpleCard
                key={item.id}
                title={item.title}
                subtitle={`${item.accessType || 'Gratis'}${item.price ? ` · ${item.price}` : ''}`}
                description={item.description || item.previewNote}
                media={item.file}
                mediaType={item.type}
                compact
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {item.resourceLink ? (
                    <a className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700" href={item.resourceLink} target="_blank" rel="noreferrer">
                      Ver recurso
                    </a>
                  ) : null}
                  <a
                    className="rounded-full bg-[linear-gradient(135deg,#25D366,#5DADE2)] px-4 py-2 text-sm font-semibold text-white"
                    href={`${whatsappBase}${encodeURIComponent(`Hola, quiero informacion sobre el recurso "${item.title}" en Digishop Press Multiverse.`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.contactLabel || 'Contactar por WhatsApp'}
                  </a>
                </div>
              </SimpleCard>
            ))
          ) : (
            <div className="glass p-6 text-sm text-slate-500">Todavia no hay recursos cargados.</div>
          )}
        </section>
      </div>
    </SectionTabs>
  )
}
