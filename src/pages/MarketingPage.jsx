import { useMemo, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { SectionTabs } from '../components/SectionTabs'
import { SimpleCard } from '../components/SimpleCard'
import { marketingCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

export function MarketingPage() {
  const { data } = useSite()
  const [category, setCategory] = useState(marketingCategories[0])
  const [previewItem, setPreviewItem] = useState(null)
  const items = data.marketing.items[category] || []
  const whatsappBase = 'https://wa.me/18495408672?text='
  const previewSubtitle = useMemo(
    () => (previewItem ? `${previewItem.accessType || 'Gratis'}${previewItem.price ? ` · ${previewItem.price}` : ''}` : ''),
    [previewItem],
  )

  return (
    <SectionTabs data={data} targetSection="Recursos" overviewLabel="Markeplacet" emptyText="Todavia no hay publicaciones asignadas a Markeplacet.">
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
                autoPlayMedia={item.type === 'video'}
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {item.accessType === 'Gratis' && item.downloadFile ? (
                    <a
                      className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
                      href={item.downloadFile}
                      download={item.downloadName || item.title || 'recurso'}
                    >
                      Descargar gratis
                    </a>
                  ) : null}
                  {item.accessType === 'De pago' && item.paymentLink ? (
                    <a className="rounded-full bg-pink-400 px-4 py-2 text-sm font-semibold text-white" href={item.paymentLink} target="_blank" rel="noreferrer">
                      Comprar recurso
                    </a>
                  ) : null}
                  {item.resourceLink ? (
                    <a className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700" href={item.resourceLink} target="_blank" rel="noreferrer">
                      Ver recurso
                    </a>
                  ) : null}
                  {item.file ? (
                    <button
                      className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700"
                      onClick={() => setPreviewItem(item)}
                      type="button"
                    >
                      Vista previa
                    </button>
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
            <div className="glass p-6 text-sm text-slate-500">Todavia no hay recursos cargados en esta categoria.</div>
          )}
        </section>
        {previewItem ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="glass max-h-[90vh] w-full max-w-4xl overflow-hidden p-3 shadow-2xl">
              <div className="rounded-[1.8rem] bg-white/90 p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-800">{previewItem.title}</h3>
                    {previewSubtitle ? <p className="mt-2 text-sm text-slate-500">{previewSubtitle}</p> : null}
                  </div>
                  <button
                    className="rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple))] px-4 py-2 text-sm font-semibold text-white"
                    onClick={() => setPreviewItem(null)}
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(74,111,165,0.08),rgba(184,161,217,0.08),rgba(246,214,189,0.12))] p-3">
                  {previewItem.type === 'video' ? (
                    <video
                      className="max-h-[70vh] w-full rounded-[1.2rem] bg-white object-contain"
                      src={previewItem.file}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img className="max-h-[70vh] w-full rounded-[1.2rem] bg-white object-contain" src={previewItem.file} alt={previewItem.title} />
                  )}
                </div>
                {previewItem.previewNote ? <p className="mt-4 text-sm leading-7 text-slate-600">{previewItem.previewNote}</p> : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </SectionTabs>
  )
}
