export function SectionHeader({ title, text }) {
  return (
    <div className="glass p-6">
      <h2 className="text-3xl font-semibold text-slate-800">{title}</h2>
      {text ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{text}</p> : null}
    </div>
  )
}
