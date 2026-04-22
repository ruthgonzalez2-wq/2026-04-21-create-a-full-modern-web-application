import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SimpleCard } from '../components/SimpleCard'
import { useSite } from '../state/SiteContext'

export function HomePage() {
  const { data } = useSite()

  return (
    <div className="space-y-8">
      <PageHero
        title={data.site.heroTitle}
        description={data.site.heroText}
        media={data.site.heroMedia}
        mediaType={data.site.heroMediaType}
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {data.publications.map((item) => (
          <SimpleCard key={item.id} title={item.title} subtitle={item.category} description={item.description} image={item.image} />
        ))}
      </section>

      <div className="flex justify-center">
        <Link to="/admin" className="rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white">
          Entrar a administrar
        </Link>
      </div>
    </div>
  )
}
