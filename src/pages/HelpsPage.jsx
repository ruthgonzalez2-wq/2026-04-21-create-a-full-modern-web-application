import { useEffect, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { SimpleCard } from '../components/SimpleCard'
import { useSite } from '../state/SiteContext'

function renderRichText(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value || '')
}

export function HelpsPage() {
  const { data } = useSite()
  const [activeTab, setActiveTab] = useState(data.helps.tabs[0] || '')
  const items = data.helps.items.filter((item) => item.status === 'Publicado' && (!activeTab || item.tab === activeTab))

  useEffect(() => {
    if (data.helps.tabs.length && !data.helps.tabs.includes(activeTab)) {
      setActiveTab(data.helps.tabs[0])
    }

    if (!data.helps.tabs.length && activeTab) {
      setActiveTab('')
    }
  }, [activeTab, data.helps.tabs])

  return (
    <SectionTabs data={data} targetSection="Helps" overviewLabel="Helps" emptyText="Todavia no hay publicaciones asignadas a Helps educativa.">
      <div className="space-y-6">
        <SectionHeader title={data.helps.title} text={data.helps.description} />
        {data.helps.tabs.length ? (
          <div className="flex flex-wrap gap-3">
            {data.helps.tabs.map((item) => (
              <button
                key={item}
                className={`rounded-full px-4 py-2 text-sm ${activeTab === item ? 'bg-slate-800 text-white' : 'glass'}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
        <section className="grid gap-5 lg:grid-cols-2">
          {items.length ? (
            items.map((item) => (
              <SimpleCard
                key={item.id}
                title={item.title}
                subtitle={item.tab ? `${item.tab} · ${item.type}` : item.type}
                image={item.image}
              >
                {item.description || item.linkDescription ? (
                  renderRichText(item.description || item.linkDescription) ? (
                    <div className="text-sm leading-7 text-slate-500" dangerouslySetInnerHTML={{ __html: item.description || item.linkDescription }} />
                  ) : (
                    <p className="text-sm leading-7 text-slate-500">{item.description || item.linkDescription}</p>
                  )
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.videoUrl ? (
                    <a className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" href={item.videoUrl} target="_blank" rel="noreferrer">
                      Ver video
                    </a>
                  ) : null}
                  {item.linkUrl ? (
                    <a className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" href={item.linkUrl} target="_blank" rel="noreferrer">
                      Abrir enlace
                    </a>
                  ) : null}
                  {item.pdfFile ? (
                    <a className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white" href={item.pdfFile} target="_blank" rel="noreferrer">
                      Abrir PDF
                    </a>
                  ) : null}
                </div>
              </SimpleCard>
            ))
          ) : (
            <div className="glass p-6 text-sm text-slate-500">Todavia no hay contenido en helps educativa.</div>
          )}
        </section>
      </div>
    </SectionTabs>
  )
}
