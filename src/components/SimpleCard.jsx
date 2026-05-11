export function SimpleCard({ title, subtitle, description, image, media, mediaType, children, compact = false, autoPlayMedia = false }) {
  const source = media || image

  return (
    <article className={`glass overflow-hidden p-4 ${compact ? 'w-full max-w-[238px] p-2.5' : ''}`}>
      {source ? (
        <div className={`overflow-hidden rounded-[1.6rem] bg-white/70 ${compact ? 'mx-auto inline-flex w-fit max-w-full p-1 shadow-sm' : ''}`}>
          {mediaType === 'video' ? (
            <video
              className={
                compact
                  ? 'max-h-44 w-auto max-w-[220px] rounded-[1.2rem] object-contain bg-white sm:max-h-48 sm:max-w-[230px]'
                  : 'h-56 w-full object-cover'
              }
              src={source}
              controls={!autoPlayMedia}
              autoPlay={autoPlayMedia}
              muted={autoPlayMedia}
              loop={autoPlayMedia}
              playsInline
            />
          ) : (
            <img
              className={
                compact
                  ? 'max-h-44 w-auto max-w-[220px] rounded-[1.2rem] object-contain bg-white sm:max-h-48 sm:max-w-[230px]'
                  : 'h-56 w-full object-cover'
              }
              src={source}
              alt={title}
            />
          )}
        </div>
      ) : null}
      <div className={`mt-2.5 ${compact ? 'mx-auto max-w-[210px] text-center' : ''}`}>
        {subtitle ? <p className="text-sm text-sky-500">{subtitle}</p> : null}
        <h3 className={`mt-2 font-semibold text-slate-800 ${compact ? 'text-lg leading-6' : 'text-2xl'}`}>{title}</h3>
        {description ? <p className="mt-3 text-sm leading-7 text-slate-500">{description}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </article>
  )
}
