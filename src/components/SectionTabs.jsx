import { useState } from 'react'
import { useSite } from '../state/SiteContext'
import { AdCodeSlot } from './AdCodeSlot'
import { SectionPublications } from './SectionPublications'

export function SectionTabs({ data, targetSection, overviewLabel = 'Contenido', emptyText, children }) {
  const [activeTab, setActiveTab] = useState('contenido')
  const { data: siteData } = useSite()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          className={`rounded-full px-4 py-2 text-sm ${activeTab === 'contenido' ? 'bg-slate-800 text-white' : 'glass'}`}
          onClick={() => setActiveTab('contenido')}
          type="button"
        >
          {overviewLabel}
        </button>
        <button
          className={`rounded-full px-4 py-2 text-sm ${activeTab === 'publicaciones' ? 'bg-slate-800 text-white' : 'glass'}`}
          onClick={() => setActiveTab('publicaciones')}
          type="button"
        >
          Publicaciones
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_290px] xl:items-start">
        <div>
          {activeTab === 'contenido' ? children : <SectionPublications data={data} targetSection={targetSection} embedded showEmpty emptyText={emptyText} />}
        </div>
        <aside className="hidden xl:block xl:sticky xl:top-28">
          <AdCodeSlot code={siteData.site.sideAdCode} title={`Anuncio lateral de ${overviewLabel}`} />
        </aside>
      </div>
    </div>
  )
}
