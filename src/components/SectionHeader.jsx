export function SectionHeader({ title, text }) {
  return (
    <div className="glass border border-white/80 bg-[linear-gradient(135deg,rgba(74,111,165,0.14),rgba(184,161,217,0.12),rgba(244,166,193,0.12),rgba(246,214,189,0.16))] p-6">
      <div className="mb-3 h-1.5 w-24 rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple),var(--brand-pink),var(--brand-cream))]" />
      <h2 className="text-3xl font-semibold text-slate-800">{title}</h2>
      {text ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{text}</p> : null}
    </div>
  )
}
