import { useState } from 'react'
import { AdminItemEditor } from '../components/AdminItemEditor'
import { FormPanel } from '../components/FormPanel'
import { SectionHeader } from '../components/SectionHeader'
import { SimpleCard } from '../components/SimpleCard'
import { aspectRatios, helpsCategories, helpsSubjects, marketingCategories, studioCategories } from '../data/defaultData'
import { useSite } from '../state/SiteContext'

const sections = ['Portada', 'Publicaciones', 'Studio', 'Marketing', 'Helps', 'eBooks', 'Cursos', 'Trabajos', 'Legal']

export function AdminPage() {
  const [section, setSection] = useState('Portada')
  const [studioCategory, setStudioCategory] = useState(studioCategories[0])
  const [marketingCategory, setMarketingCategory] = useState(marketingCategories[0])
  const [helpsCategory, setHelpsCategory] = useState(helpsCategories[0])
  const [helpsSubject, setHelpsSubject] = useState(helpsSubjects[0])
  const site = useSite()

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="glass h-fit p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Panel</p>
        <div className="space-y-2">
          {sections.map((item) => (
            <button
              key={item}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm ${
                section === item ? 'bg-slate-800 text-white' : 'bg-white/70 text-slate-700'
              }`}
              onClick={() => setSection(item)}
            >
              {item}
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
            <FormPanel
              title="Portada principal"
              initialValues={site.data.site}
              fields={[
                { key: 'logo', label: 'Logo del sitio', type: 'file', accept: 'image/*', fullWidth: true },
                { key: 'heroTitle', label: 'Titulo principal' },
                { key: 'heroText', label: 'Texto principal', type: 'textarea', fullWidth: true },
                { key: 'heroMediaType', label: 'Tipo de portada', type: 'select', options: ['image', 'video'] },
                { key: 'heroMedia', label: 'Imagen o video horizontal', type: 'file', accept: 'image/*,video/*', fullWidth: true },
              ]}
              onSubmit={site.updateSite}
            />
          </>
        ) : null}

        {section === 'Publicaciones' ? (
          <>
            <SectionHeader title="Publicaciones" text="Agrega entradas visibles en el inicio del sitio." />
            <FormPanel
              title="Nueva publicacion"
              fields={[
                { key: 'category', label: 'Categoria' },
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
              ]}
              onSubmit={site.addPublication}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {site.data.publications.map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'category', label: 'Categoria' },
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'image', label: 'Imagen', type: 'file', accept: 'image/*', fullWidth: true },
                  ]}
                  onSave={(values) => site.updatePublication(item.id, values)}
                  onDelete={() => site.deletePublication(item.id)}
                >
                  <SimpleCard title={item.title} subtitle={item.category} description={item.description} image={item.image} />
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

        {section === 'Marketing' ? (
          <>
            <SectionHeader title="Marketing" text="Funciona igual que Studio, pero solo para material de marketing." />
            <FormPanel
              title="Cabecera de Marketing"
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
              title={`Nuevo item en ${marketingCategory}`}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
              ]}
              onSubmit={(values) => site.addSectionItem('marketing', {
                ...values,
                category: marketingCategory,
              })}
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
                    { key: 'type', label: 'Tipo', type: 'select', options: ['image', 'video'] },
                    { key: 'ratio', label: 'Aspect ratio', type: 'select', options: aspectRatios },
                    { key: 'file', label: 'Archivo', type: 'file', accept: 'image/*,video/*', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateSectionItem('marketing', item.id, values)}
                  onDelete={() => site.deleteSectionItem('marketing', item.id)}
                >
                  <SimpleCard title={item.title} description={item.description} media={item.file} mediaType={item.type} />
                </AdminItemEditor>
              ))}
            </div>
          </>
        ) : null}

        {section === 'Helps' ? (
          <>
            <SectionHeader title="Helps educativa" text="Agrega recursos por categoria y materia." />
            <FormPanel
              title="Cabecera de Helps"
              initialValues={site.data.helps}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
              ]}
              onSubmit={site.updateHelpsInfo}
            />
            <div className="flex flex-wrap gap-3">
              {helpsCategories.map((item) => (
                <button key={item} className={`rounded-full px-4 py-2 text-sm ${helpsCategory === item ? 'bg-slate-800 text-white' : 'glass'}`} onClick={() => setHelpsCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {helpsSubjects.map((item) => (
                <button key={item} className={`rounded-full px-4 py-2 text-sm ${helpsSubject === item ? 'bg-sky-500 text-white' : 'glass'}`} onClick={() => setHelpsSubject(item)}>
                  {item}
                </button>
              ))}
            </div>
            <FormPanel
              title={`Nuevo recurso en ${helpsCategory} / ${helpsSubject}`}
              fields={[
                { key: 'title', label: 'Titulo' },
                { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                { key: 'videoUrl', label: 'Video embed URL', fullWidth: true },
                { key: 'gameUrl', label: 'Juego o iframe URL', fullWidth: true },
              ]}
              onSubmit={(values) => site.addHelpsItem(helpsCategory, helpsSubject, values)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {(site.data.helps.items[helpsCategory][helpsSubject] || []).map((item) => (
                <AdminItemEditor
                  key={item.id}
                  title={`Editar ${item.title}`}
                  item={item}
                  fields={[
                    { key: 'title', label: 'Titulo' },
                    { key: 'description', label: 'Descripcion', type: 'textarea', fullWidth: true },
                    { key: 'videoUrl', label: 'Video embed URL', fullWidth: true },
                    { key: 'gameUrl', label: 'Juego o iframe URL', fullWidth: true },
                  ]}
                  onSave={(values) => site.updateHelpsItem(helpsCategory, helpsSubject, item.id, values)}
                  onDelete={() => site.deleteHelpsItem(helpsCategory, helpsSubject, item.id)}
                >
                  <SimpleCard title={item.title} description={item.description} />
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
            <SectionHeader title="Trabajos" text="Agrega servicios y trabajos realizados." />
            <FormPanel
              title="Cabecera de Trabajos"
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
