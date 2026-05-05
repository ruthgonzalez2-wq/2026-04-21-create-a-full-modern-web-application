const whatsappUrl =
  'https://wa.me/18092561175?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20Digishoppress%20Multiverse.'

export function ContactPanel({ title = 'Consultas y contacto' }) {
  return (
    <section className="glass p-6 text-center sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">Contacto</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-800">{title}</h2>
      <div className="mt-6 flex justify-center">
        <a
          className="rounded-full bg-[linear-gradient(135deg,#25D366,#5DADE2)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  )
}
