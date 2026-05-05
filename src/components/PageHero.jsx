export function PageHero({ title, description, image, media, mediaType }) {
  const heroSource = media || image

  return (
    <section className="glass overflow-hidden p-3">
      <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(214,219,223,0.75))] sm:min-h-[400px]">
        {mediaType === 'video' ? (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover brightness-[1.08] saturate-[1.08]"
              src={heroSource}
              autoPlay
              muted
              loop
              playsInline
            />
          </>
        ) : (
          <>
            <img
              className="absolute inset-0 h-full w-full object-cover brightness-[1.06] saturate-[1.08]"
              src={heroSource}
              alt={title}
            />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.14))]" />
        <div className="flex min-h-[360px] items-end p-6 sm:min-h-[400px] sm:p-10">
          <div className="max-w-2xl rounded-[1.6rem] border border-white/60 bg-white/28 p-5 text-slate-800 shadow-lg backdrop-blur-md sm:p-6">
            <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
