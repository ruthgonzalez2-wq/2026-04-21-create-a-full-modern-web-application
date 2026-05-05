import { Link } from 'react-router-dom'

function hasRichMarkup(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value || '')
}

function PublicationAction({ item, linkedPage }) {
  if (item.type === 'Pagina interna' && linkedPage) {
    return (
      <Link className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" to={`/pagina/${linkedPage.slug}`}>
        Abrir pagina
      </Link>
    )
  }

  if (item.type === 'Enlace externo' && item.linkUrl) {
    return (
      <a className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" href={item.linkUrl} target="_blank" rel="noreferrer">
        {item.linkLabel || 'Abrir enlace'}
      </a>
    )
  }

  if (item.type === 'PDF' && item.pdfFile) {
    return (
      <a className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white" href={item.pdfFile} target="_blank" rel="noreferrer">
        {item.linkLabel || 'Abrir PDF'}
      </a>
    )
  }

  return null
}

function PublicationCard({ item, linkedPage }) {
  return (
    <article className="glass overflow-hidden p-4">
      {item.image ? (
        <div className="overflow-hidden rounded-[1.5rem] bg-white/70 p-1.5">
          <img className="h-40 w-full rounded-[1.2rem] object-cover" src={item.image} alt={item.title} />
        </div>
      ) : null}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          {item.category ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">{item.category}</p> : null}
          {item.type ? <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-500">{item.type}</span> : null}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-slate-800">{item.title}</h3>
        {item.description ? (
          hasRichMarkup(item.description) ? (
            <div className="mt-3 text-sm leading-7 text-slate-500" dangerouslySetInnerHTML={{ __html: item.description }} />
          ) : (
            <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
          )
        ) : null}
        {item.linkDescription ? <p className="mt-3 text-sm leading-7 text-slate-500">{item.linkDescription}</p> : null}
        <div className="mt-4">
          <PublicationAction item={item} linkedPage={linkedPage} />
        </div>
      </div>
    </article>
  )
}

function PageCard({ page }) {
  return (
    <article className="glass overflow-hidden p-4">
      {page.coverImage ? (
        <div className="overflow-hidden rounded-[1.5rem] bg-white/70 p-1.5">
          <img className="h-40 w-full rounded-[1.2rem] object-cover" src={page.coverImage} alt={page.title} />
        </div>
      ) : null}
      <div className="mt-4">
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-500">Pagina</span>
        <h3 className="mt-2 text-xl font-semibold text-slate-800">{page.title}</h3>
        {page.summary ? <p className="mt-3 text-sm leading-7 text-slate-500">{page.summary}</p> : null}
        <div className="mt-4">
          <Link className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white" to={`/pagina/${page.slug}`}>
            Abrir pagina
          </Link>
        </div>
      </div>
    </article>
  )
}

export function SectionPublications({ data, targetSection, embedded = false, showEmpty = false, emptyText = 'Todavia no hay publicaciones en esta seccion.' }) {
  const publications = data.publications.filter((item) => item.status === 'Publicado' && item.targetSection === targetSection)
  const pages = data.pages.filter((item) => item.status === 'Publicado' && item.targetSection === targetSection)
  const hasContent = publications.length || pages.length

  if (!hasContent && !showEmpty) {
    return null
  }

  const content = hasContent ? (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {publications.map((item) => (
        <PublicationCard key={item.id} item={item} linkedPage={data.pages.find((page) => page.slug === item.pageSlug)} />
      ))}
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  ) : (
    <div className="glass p-6 text-sm text-slate-500">{emptyText}</div>
  )

  if (embedded) {
    return content
  }

  return (
    <section className="space-y-5">
      <div className="glass p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Publicaciones</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-800">Publicaciones</h2>
      </div>
      {content}
    </section>
  )
}
