import { useMemo, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { studioCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

function StudioCard({ item, onPreview }) {
  return (
    <article className="glass flex flex-col items-center p-3 text-center">
      {item.type === 'video' ? (
        <video
          className="h-52 w-[150px] rounded-[1.2rem] object-cover bg-white"
          src={item.file}
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img className="h-52 w-[150px] rounded-[1.2rem] object-cover bg-white" src={item.file} alt={item.title} />
      )}
      <div className="mt-3 max-w-[180px]">
        <h3 className="text-lg font-semibold leading-6 text-slate-800">{item.title}</h3>
        {item.description ? <p className="mt-2 text-xs leading-6 text-slate-500 line-clamp-3">{item.description}</p> : null}
        <button
          className="mt-3 inline-flex rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple))] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
          onClick={() => onPreview(item)}
          type="button"
        >
          Vista previa
        </button>
      </div>
    </article>
  )
}

export function StudioPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(studioCategories[0])
  const [previewItem, setPreviewItem] = useState(null)
  const items = data.studio.items[category] || []
  const previewRatioClass = useMemo(() => {
    if (!previewItem?.ratio) {
      return 'aspect-[4/5]'
    }

    if (previewItem.ratio === '16:9') {
      return 'aspect-video'
    }

    if (previewItem.ratio === '9:16') {
      return 'aspect-[9/16]'
    }

    if (previewItem.ratio === '1:1') {
      return 'aspect-square'
    }

    return 'aspect-[4/5]'
  }, [previewItem])

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
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.length ? (
            items.map((item) => <StudioCard key={item.id} item={item} onPreview={setPreviewItem} />)
          ) : (
            <div className="glass col-span-full p-6 text-sm text-slate-500">Todavia no hay contenido en esta categoria.</div>
          )}
        </section>
        {previewItem ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="glass max-h-[90vh] w-full max-w-4xl overflow-hidden p-3 shadow-2xl">
              <div className="rounded-[1.8rem] bg-white/92 p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800">{previewItem.title}</h3>
                    {previewItem.description ? <p className="mt-2 text-sm leading-7 text-slate-500">{previewItem.description}</p> : null}
                  </div>
                  <button
                    className="rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple))] px-4 py-2 text-sm font-semibold text-white"
                    onClick={() => setPreviewItem(null)}
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
                <div className={`mt-5 overflow-hidden rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(74,111,165,0.08),rgba(184,161,217,0.08),rgba(246,214,189,0.12))] p-3 ${previewRatioClass}`}>
                  {previewItem.type === 'video' ? (
                    <video
                      className="h-full w-full rounded-[1.2rem] bg-white object-contain"
                      src={previewItem.file}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img className="h-full w-full rounded-[1.2rem] bg-white object-contain" src={previewItem.file} alt={previewItem.title} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SectionTabs>
  )
}
