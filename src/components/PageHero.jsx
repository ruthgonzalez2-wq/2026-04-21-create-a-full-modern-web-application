export function PageHero({ title, description, image, media, mediaType }) {
  const heroSource = media || image

  return (
    <section className="glass overflow-hidden p-3">
      <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
        {mediaType === 'video' ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={heroSource} autoPlay muted loop playsInline />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSource})`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.55),rgba(15,23,42,0.2))]" />
        <div className="flex min-h-[360px] items-end p-6 sm:p-10">
          <div className="max-w-3xl rounded-[1.8rem] border border-white/25 bg-white/15 p-6 text-white backdrop-blur-md">
            <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
