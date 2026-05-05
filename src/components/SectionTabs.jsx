import { useState } from 'react'
import { SectionPublications } from './SectionPublications'

export function SectionTabs({ data, targetSection, overviewLabel = 'Contenido', emptyText, children }) {
  const [activeTab, setActiveTab] = useState('contenido')

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

      {activeTab === 'contenido' ? children : <SectionPublications data={data} targetSection={targetSection} embedded showEmpty emptyText={emptyText} />}
    </div>
  )
}
