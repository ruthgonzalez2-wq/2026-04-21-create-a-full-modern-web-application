import { useEffect, useMemo, useState } from 'react'
import { AdminItemEditor } from '../components/AdminItemEditor'
import { FormPanel } from '../components/FormPanel'
import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import {
  aspectRatios,
  contentTypes,
  destinationSectionOptions,
  marketingCategories,
  publicationTypes,
  publishStatuses,
  resourceAccessTypes,
  studioCategories,
} from '../data/defaultData'
import { useSite } from '../state/SiteContext'

const sections = [
  { id: 'Portada', label: 'Portada' },
  { id: 'Publicaciones', label: 'Publicaciones' },
  { id: 'Paginas', label: 'Paginas' },
  { id: 'Studio', label: 'Studio' },
  { id: 'Recursos', label: 'Markeplacet' },
  { id: 'Helps', label: 'Helps' },
  { id: 'eBooks', label: 'eBooks' },
  { id: 'Cursos', label: 'Cursos' },
  { id: 'Trabajos', label: 'Recursos laborales' },
  { id: 'Legal', label: 'Legal' },
]

function PagePreview({ item }) {
  const [showPreview, setShowPreview] = useState(false)
  const hasRichMarkup = /<\/?[a-z][\s\S]*>/i.test(item.content || '')

  return (
    <article className="glass overflow-hidden p-4">
      {item.coverImage ? (
        <div className="overflow-hidden rounded-[1.5rem] bg-white/70 p-1.5">
          <img className="h-40 w-full rounded-[1.2rem] object-cover" src={item.coverImage} alt={item.title} />
        </div>
      ) : null}
      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-white">{item.status}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600">/{item.slug}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
        {item.summary ? <p className="text-sm leading-7 text-slate-500">{item.summary}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
            onClick={() => setShowPreview((value) => !value)}
            type="button"
          >
            {showPreview ? 'Ocultar vista previa' : 'Ver vista previa aqui'}
          </button>
          <a className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700" href={`/pagina/${item.slug}?preview=1`}>
            {item.status === 'Publicado' ? 'Ver pagina' : 'Vista previa'}
          </a>
          {item.status !== 'Publicado' ? <span className="text-sm font-semibold text-slate-400">Solo visible en modo editor hasta publicarla.</span> : null}
        </div>
        {showPreview ? (
          <div className="mt-4 rounded-[1.5rem] border border-white/70 bg-white/75 p-4 text-sm leading-7 text-slate-600">
            {item.content ? (
              hasRichMarkup ? <div className="space-y-4" dangerouslySetInnerHTML={{ __html: item.content }} /> : <p className="whitespace-pre-wrap">{item.content}</p>
            ) : (
              <p>No hay contenido todavia en esta pagina.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {item.videoUrl ? (
                <a className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" href={item.videoUrl} target="_blank" rel="noreferrer">
                  Ver video
                </a>
              ) : null}
              {item.pdfFile ? (
                <a className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white" href={item.pdfFile} target="_blank" rel="noreferrer">
                  Abrir PDF
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function AdminPage() {
  const [section, setSection] = useState('Portada')
  const [studioCategory, setStudioCategory] = useState(studioCategories[0])
  const [marketingCategory, setMarketingCategory] = useState(marketingCategories[0])
  const [helpsTabDraft, setHelpsTabDraft] = useState('')
  const [publishKeyDraft, setPublishKeyDraft] = useState('')
  const site = useSite()

  const pageOptions = useMemo(
    () => [{ value: '', label: 'Sin pagina enlazada' }, ...site.data.pages.map((item) => ({ value: item.slug, label: item.title || item.slug }))],
    [site.data.pages],
  )

  useEffect(() => {
    site.setIsAdmin(true)
  }, [site])

  useEffect(() => {
    setPublishKeyDraft(site.adminToken || '')
  }, [site.adminToken])

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="glass h-fit p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Panel</p>
        <div className="space-y-2">
          {sections.map((item) => (
            <button
              key={item.id}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm ${
                section === item.id ? 'bg-slate-800 text-white' : 'bg-white/70 text-slate-700'
              }`}
              onClick={() => setSection(item.id)}
            >
              {item.label}
              <span>{'>'}</span>
            </button>
          ))}
          <button className="mt-4 w-full rounded-2xl bg-pink-100 px-4 py-3 text-sm font-semibold text-pink-600" onClick={site.resetAll}>
            Reiniciar contenido
          </button>
        </div>
      </aside>

      <div className="space-y-6">
        {section === 'Portada' ? (
          <>
            <SectionHeader title="Editar portada" text="Cambia el titulo, texto e imagen principal." />
            <div className="glass grid gap-3 p-5">
              <h3 className="text-xl font-semibold text-slate-800">Publicacion compartida para todos</h3>
              <p className="text-sm leading-7 text-slate-500">
                Estado actual: <strong>{site.syncMode === 'cloud' ? 'Nube disponible' : 'Modo local'}</strong>. Si pegas la clave de publicacion, los cambios se enviaran a la nube y tus visitantes los veran.
              </p>
              <label className="grid gap-1 text-sm text-slate-600">
                <span>Clave de publicacion en la nube</span>
                <input className="input-field" value={publishKeyDraft} onChange={(event) => setPublishKeyDraft(event.target.value)} placeholder="Pega aqui tu ADMIN_WRITE_TOKEN" />
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => site.setAdminToken(publishKeyDraft)}
                  type="button"
                >
                  Guardar clave
                </button>
                <button
                  className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700"
                  onClick={() => {
                    setPublishKeyDraft('')
                    site.setAdminToken('')
                  }}
                  type="button"
                >
                  Quitar clave
                </button>
              </div>
              <p className="text-xs leading-6 text-slate-400">La configuracion de Supabase esta explicada en el archivo `SUPABASE_SETUP.md` del proyecto.</p>
            </div>
            <FormPanel
              title="Portada principal"
              initialValues={site.data.site}
              fields={[
                { key: 'logo', label: 'Logo del sitio', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'brandName', label: 'Nombre de marca' },
                { key: 'heroTitle', label: 'Titulo principal' },
                { key: 'heroText', label: 'Texto principal', type: 'textarea', fullWidth: true },
                { key: 'heroMediaType', label: 'Tipo de portada', type: 'select', options: ['image', 'video'] },
                { key: 'heroMedia', label: 'Imagen o video horizontal', type: 'file', accept: 'image/*,video/*', fullWidth: true },
                { key: 'paypalUrl', label: 'Enlace de donacion PayPal', fullWidth: true },
                { key: 'footerAdCode', label: 'Codigo de anuncio del pie de pagina', type: 'textarea', fullWidth: true },
                { key: 'sideAdCode', label: 'Codigo de anuncio lateral por universo', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateSite}
            />
          </>
        ) : null}

        {section === 'Publicaciones' ? (
          <>
            <SectionHeader title="Publicaciones" text="Crea entradas para inicio y decide si llevan a una pagina interna, enlace externo o PDF." />
            <FormPanel
              title="Nueva publicacion"
              fields={[
                { key: 'status', label: 'Estado', type: 'select', options: publishStatuses, defaultValue: 'Publicado' },
                { key: 'type', label: 'Tipo de contenido', type: 'select', options: publicationTypes, defaultValue: 'Entrada' },
                { key: 'targetSection', label: 'Destino de la publicacion', type: 'select', options: destinationSectionOptions, defaultValue: 'Inicio' },
                { key: 'category', label: 'Categoria' },
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'richtext', fullWidth: true },
                { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'pageSlug', label: 'Pagina interna enlazada', type: 'select', options: pageOptions, fullWidth: true },
                { key: 'linkDescription', label: 'De que trata el enlace o archivo', type: 'textarea', fullWidth: true },
                { key: 'linkLabel', label: 'Texto del boton' },
                { key: 'linkUrl', label: 'Enlace externo', fullWidth: true },
                { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
              ]}
              onSubmit={site.addPublication}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.publications.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={{ ...item, tags: item.tags?.join(', ') || '' }}
                  fields={[
                    { key: 'status', label: 'Estado', type: 'select', options: publishStatuses },
                    { key: 'type', label: 'Tipo de contenido', type: 'select', options: publicationTypes },
                    { key: 'targetSection', label: 'Destino de la publicacion', type: 'select', options: destinationSectionOptions },
                    { key: 'category', label: 'Categoria' },
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'richtext', fullWidth: true },
                    { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                    { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                    { key: 'pageSlug', label: 'Pagina interna enlazada', type: 'select', options: pageOptions, fullWidth: true },
                    { key: 'linkDescription', label: 'De que trata el enlace o archivo', type: 'textarea', fullWidth: true },
                    { key: 'linkLabel', label: 'Texto del boton' },
                    { key: 'linkUrl', label: 'Enlace externo', fullWidth: true },
                    { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
                  ]}
                  onSave={(values) => site.updatePublication(item.id, values)}
                  onDelete={() => site.deletePublication(item.id)}
                >
                  <SimpleCard title={item.title} subtitle={`${item.category || 'Sin categoria'} · ${item.type}`} description={item.description || item.linkDescription} image={item.image} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Paginas' ? (
          <>
            <SectionHeader title="Paginas" text="Crea paginas internas como en Blogger o WordPress. Puedes dejarlas privadas, en borrador o publicarlas." />
            <FormPanel
              title="Nueva pagina"
              fields={[
                { key: 'status', label: 'Estado', type: 'select', options: publishStatuses, defaultValue: 'Privado' },
                { key: 'targetSection', label: 'Destino de la pagina', type: 'select', options: [{ value: '', label: 'Sin destino publico' }, ...destinationSectionOptions], defaultValue: '' },
                { key: 'title', label: 'Titulo' },
                { key: 'slug', label: 'URL corta (opcional)' },
                { key: 'summary', label: 'Resumen', type: 'textarea', fullWidth: true },
                { key: 'content', label: 'Contenido completo', type: 'richtext', fullWidth: true },
                { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                { key: 'coverImage', label: 'Imagen principal', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'videoUrl', label: 'Enlace de video', fullWidth: true },
                { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
              ]}
              onSubmit={site.addPage}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.pages.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={{ ...item, tags: item.tags?.join(', ') || '' }}
                  fields={[
                    { key: 'status', label: 'Estado', type: 'select', options: publishStatuses },
                    { key: 'targetSection', label: 'Destino de la pagina', type: 'select', options: [{ value: '', label: 'Sin destino publico' }, ...destinationSectionOptions] },
                    { key: 'title', label: 'Titulo' },
                    { key: 'slug', label: 'URL corta (opcional)' },
                    { key: 'summary', label: 'Resumen', type: 'textarea', fullWidth: true },
                    { key: 'content', label: 'Contenido completo', type: 'richtext', fullWidth: true },
                    { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                    { key: 'coverImage', label: 'Imagen principal', type: 'file', accept: 'image/*', fullWidth: true },
                    { key: 'videoUrl', label: 'Enlace de video', fullWidth: true },
                    { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
                  ]}
                  onSave={(values) => site.updatePage(item.id, values)}
                  onDelete={() => site.deletePage(item.id)}
                >
                  <PagePreview item={item} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Studio' ? (
          <>
            <SectionHeader title="Studio fotografico digital" text="Agrega imagenes o videos a la categoria correcta." />
            <FormPanel
              title="Cabecera de Studio"
              initialValues={site.data.studio}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateStudioInfo}
            />
            <div className="flex flex-wrap gap-3">
              {studioCategories.map((item) => (
                <button key={item} className={`rounded-full px-4 py-2 text-sm ${studioCategory === item ? 'bg-slate-800 text-white' : 'glass'}`} onClick={() => setStudioCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
            <FormPanel
              title={`Nuevo item en ${studioCategory}`}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
              ]}
              onSubmit={(values) => site.addStudioItem(studioCategory, values)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {(site.data.studio.items[studioCategory] || []).map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                    { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                    { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateStudioItem(studioCategory, item.id, values)}
                  onDelete={() => site.deleteStudioItem(studioCategory, item.id)}
                >
                  <SimpleCard title={item.title} description={item.description} media={item.file} mediaType={item.type} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Recursos' ? (
          <>
            <SectionHeader title="Markeplacet" text="Gestiona recursos descargables, plantillas con enlace a Canva y materiales gratuitos o de pago." />
            <FormPanel
              title="Cabecera de Markeplacet"
              initialValues={site.data.marketing}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateMarketingInfo}
            />
            <div className="flex flex-wrap gap-3">
              {marketingCategories.map((item) => (
                <button key={item} className={`rounded-full px-4 py-2 text-sm ${marketingCategory === item ? 'bg-slate-800 text-white' : 'glass'}`} onClick={() => setMarketingCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
            <FormPanel
              title={`Nuevo recurso en ${marketingCategory}`}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'previewNote', label: 'Texto de vista previa o detalle', type: 'textarea', fullWidth: true },
                { key: 'accessType', label: 'Acceso', type: 'select', options: resourceAccessTypes, defaultValue: 'Gratis' },
                { key: 'price', label: 'Precio o nota comercial' },
                { key: 'resourceLink', label: 'Enlace del recurso o vista previa (Canva u otro)', fullWidth: true },
                {
                  key: 'downloadFile',
                  label: 'Archivo descargable gratis o premium',
                  type: 'file',
                  accept: 'image/*,video/*,.ppt,.pptx,.pdf,.zip,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
                  fullWidth: true,
                },
                { key: 'downloadName', label: 'Nombre del archivo para descargar', fullWidth: true },
                { key: 'paymentLink', label: 'Enlace de pago externo (PayPal, Stripe u otro)', fullWidth: true },
                { key: 'contactLabel', label: 'Texto del boton de contacto' },
                { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
              ]}
              onSubmit={(values) =>
                site.addSectionItem('marketing', {
                  ...values,
                  category: marketingCategory,
                })
              }
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {(site.data.marketing.items[marketingCategory] || []).map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'previewNote', label: 'Texto de vista previa o detalle', type: 'textarea', fullWidth: true },
                    { key: 'accessType', label: 'Acceso', type: 'select', options: resourceAccessTypes },
                    { key: 'price', label: 'Precio o nota comercial' },
                    { key: 'resourceLink', label: 'Enlace del recurso o vista previa (Canva u otro)', fullWidth: true },
                    {
                      key: 'downloadFile',
                      label: 'Archivo descargable gratis o premium',
                      type: 'file',
                      accept: 'image/*,video/*,.ppt,.pptx,.pdf,.zip,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
                      fullWidth: true,
                    },
                    { key: 'downloadName', label: 'Nombre del archivo para descargar', fullWidth: true },
                    { key: 'paymentLink', label: 'Enlace de pago externo (PayPal, Stripe u otro)', fullWidth: true },
                    { key: 'contactLabel', label: 'Texto del boton de contacto' },
                    { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                    { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                    { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateSectionItem('marketing', item.id, values)}
                  onDelete={() => site.deleteSectionItem('marketing', item.id)}
                >
                  <SimpleCard title={item.title} subtitle={`${item.accessType || 'Gratis'}${item.price ? ` · ${item.price}` : ''}`} description={item.description || item.previewNote} media={item.file} mediaType={item.type} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Helps' ? (
          <>
            <SectionHeader title="Helps educativa" text="Area limpia para que publiques entradas, imagenes, videos, enlaces y PDF." />
            <FormPanel
              title="Cabecera de Helps"
              initialValues={site.data.helps}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateHelpsInfo}
            />
            <div className="glass p-5">
              <h3 className="text-xl font-semibold text-slate-800">Subpestanas de Helps</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {site.data.helps.tabs.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm">
                    <span className="font-semibold text-slate-700">{item}</span>
                    <button className="text-xs font-semibold text-pink-600" type="button" onClick={() => site.deleteHelpsTab(item)}>
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input className="input-field" value={helpsTabDraft} onChange={(event) => setHelpsTabDraft(event.target.value)} placeholder="Nueva subpestana, por ejemplo Matematica" />
                <button
                  className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white"
                  type="button"
                  onClick={() => {
                    site.addHelpsTab(helpsTabDraft)
                    setHelpsTabDraft('')
                  }}
                >
                  Anadir subpestana
                </button>
              </div>
            </div>
            <FormPanel
              title="Nueva publicacion en Helps"
              fields={[
                { key: 'status', label: 'Estado', type: 'select', options: publishStatuses, defaultValue: 'Publicado' },
                { key: 'type', label: 'Tipo de contenido', type: 'select', options: contentTypes, defaultValue: 'Entrada' },
                { key: 'tab', label: 'Subpestana', type: 'select', options: [{ value: '', label: 'Sin subpestana' }, ...site.data.helps.tabs.map((item) => ({ value: item, label: item }))], fullWidth: true },
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'richtext', fullWidth: true },
                { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'linkDescription', label: 'De que trata el enlace o archivo', type: 'textarea', fullWidth: true },
                { key: 'videoUrl', label: 'Enlace de video', fullWidth: true },
                { key: 'linkUrl', label: 'Enlace externo', fullWidth: true },
                { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
              ]}
              onSubmit={site.addHelpsItem}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.helps.items.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={{ ...item, tags: item.tags?.join(', ') || '' }}
                  fields={[
                    { key: 'status', label: 'Estado', type: 'select', options: publishStatuses },
                    { key: 'type', label: 'Tipo de contenido', type: 'select', options: contentTypes },
                    { key: 'tab', label: 'Subpestana', type: 'select', options: [{ value: '', label: 'Sin subpestana' }, ...site.data.helps.tabs.map((tab) => ({ value: tab, label: tab }))], fullWidth: true },
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'richtext', fullWidth: true },
                    { key: 'tags', label: 'Etiquetas (separadas por coma)', fullWidth: true },
                    { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                    { key: 'linkDescription', label: 'De que trata el enlace o archivo', type: 'textarea', fullWidth: true },
                    { key: 'videoUrl', label: 'Enlace de video', fullWidth: true },
                    { key: 'linkUrl', label: 'Enlace externo', fullWidth: true },
                    { key: 'pdfFile', label: 'Archivo PDF', type: 'file', accept: 'application/pdf', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateHelpsItem(item.id, values)}
                  onDelete={() => site.deleteHelpsItem(item.id)}
                >
                  <SimpleCard title={item.title} subtitle={`${item.type} · ${item.status}`} description={item.description || item.linkDescription} image={item.image} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'eBooks' ? (
          <>
            <SectionHeader title="eBooks" text="Solo aqui se usa el enlace externo del libro." />
            <FormPanel
              title="Cabecera de eBooks"
              initialValues={site.data.ebooks}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={(values) => site.updateSection('ebooks', values)}
            />
            <FormPanel
              title="Nuevo eBook"
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'cover', label: 'Portada', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'link', label: 'Enlace del libro', fullWidth: true },
              ]}
              onSubmit={(values) => site.addSectionItem('ebooks', values)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.ebooks.items.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'cover', label: 'Portada', type: 'file', accept: 'image/*', fullWidth: true },
                    { key: 'link', label: 'Enlace del libro', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateSectionItem('ebooks', item.id, values)}
                  onDelete={() => site.deleteSectionItem('ebooks', item.id)}
                >
                  <SimpleCard title={item.title} description={item.description} image={item.cover} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Cursos' ? (
          <>
            <SectionHeader title="Cursos" text="Agrega cursos completos, carpetas o tutoriales." />
            <FormPanel
              title="Cabecera de Cursos"
              initialValues={site.data.courses}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={(values) => site.updateSection('courses', values)}
            />
            <FormPanel
              title="Nuevo curso"
              fields={[
                { key: 'category', label: 'Tipo' },
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'lessons', label: 'Lecciones o modulos' },
                { key: 'format', label: 'Formato' },
              ]}
              onSubmit={(values) => site.addSectionItem('courses', values)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.courses.items.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'category', label: 'Tipo' },
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                    { key: 'lessons', label: 'Lecciones o modulos' },
                    { key: 'format', label: 'Formato' },
                  ]}
                  onSave={(values) => site.updateSectionItem('courses', item.id, values)}
                  onDelete={() => site.deleteSectionItem('courses', item.id)}
                >
                  <SimpleCard title={item.title} subtitle={item.category} description={item.description} image={item.image} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Trabajos' ? (
          <>
            <SectionHeader title="Recursos laborales" text="Agrega servicios, propuestas y recursos laborales." />
            <FormPanel
              title="Cabecera de Recursos laborales"
              initialValues={site.data.jobs}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={(values) => site.updateSection('jobs', values)}
            />
            <FormPanel
              title="Nuevo trabajo o servicio"
              fields={[
                { key: 'category', label: 'Categoria' },
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'cta', label: 'Texto destacado', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={(values) => site.addSectionItem('jobs', values)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.jobs.items.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'category', label: 'Categoria' },
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'cta', label: 'Texto destacado', type: 'textarea', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateSectionItem('jobs', item.id, values)}
                  onDelete={() => site.deleteSectionItem('jobs', item.id)}
                >
                  <SimpleCard title={item.title} subtitle={item.category} description={item.description} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Legal' ? (
          <>
            <SectionHeader title="Legal" text="Edita los textos legales del sitio." />
            <FormPanel
              title="Textos legales"
              initialValues={site.data.legal}
              fields={[
                { key: 'termsTitle', label: 'Titulo terms' },
                { key: 'termsText', label: 'Texto terms', type: 'textarea', fullWidth: true },
                { key: 'privacyTitle', label: 'Titulo privacy' },
                { key: 'privacyText', label: 'Texto privacy', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateLegal}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}
