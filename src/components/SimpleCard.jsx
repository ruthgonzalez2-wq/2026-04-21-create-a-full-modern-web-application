export function SimpleCard({ title, subtitle, description, image, media, mediaType, children }) {
  const source = media || image

  return (
    <article className="glass overflow-hidden p-4">
      {source ? (
        <div className="overflow-hidden rounded-[1.6rem] bg-white/70">
          {mediaType === 'video' ? (
            <video className="h-56 w-full object-cover" src={source} controls />
          ) : (
            <img className="h-56 w-full object-cover" src={source} alt={title} />
          )}
        </div>
      ) : null}
      <div className="mt-4">
        {subtitle ? <p className="text-sm text-sky-500">{subtitle}</p> : null}
        <h3 className="mt-2 text-2xl font-semibold text-slate-800">{title}</h3>
        {description ? <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </article>
  )
}
