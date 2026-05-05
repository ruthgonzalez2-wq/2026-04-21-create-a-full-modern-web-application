import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { useSite } from '../state/SiteContext'

function hasRichMarkup(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value || '')
}

export function ContentPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const { data, isAdmin } = useSite()
  const page = data.pages.find((item) => item.slug === slug)
  const isPreview = searchParams.get('preview') === '1'

  if (!page) {
    return <Navigate to="/" replace />
  }

  if (!isAdmin && !isPreview && page.status !== 'Publicado') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="space-y-6">
      <SectionHeader title={page.title} text={page.summary} />
      <article className="glass overflow-hidden p-6 sm:p-8">
        {page.coverImage ? (
          <div className="overflow-hidden rounded-[1.8rem] bg-white/70 p-1.5">
            <img className="max-h-[440px] w-full rounded-[1.4rem] object-cover" src={page.coverImage} alt={page.title} />
          </div>
        ) : null}
        <div className="mt-6 space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
          {page.content ? (
            hasRichMarkup(page.content) ? (
              <div className="space-y-4" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <p className="whitespace-pre-wrap">{page.content}</p>
            )
          ) : null}
          {page.videoUrl ? (
            <a className="inline-flex rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white" href={page.videoUrl} target="_blank" rel="noreferrer">
              Ver video relacionado
            </a>
          ) : null}
          {page.pdfFile ? (
            <a className="inline-flex rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white" href={page.pdfFile} target="_blank" rel="noreferrer">
              Abrir archivo PDF
            </a>
          ) : null}
          {page.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {page.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </div>
  )
}
