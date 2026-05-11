import { useEffect, useRef } from 'react'

export function AdCodeSlot({ code, title = 'Espacio para anuncio', compact = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    container.innerHTML = ''

    if (!code?.trim()) {
      return
    }

    const template = document.createElement('div')
    template.innerHTML = code

    Array.from(template.childNodes).forEach((node) => {
      if (node.nodeName.toLowerCase() === 'script') {
        const script = document.createElement('script')
        Array.from(node.attributes).forEach((attribute) => script.setAttribute(attribute.name, attribute.value))
        script.textContent = node.textContent
        container.appendChild(script)
        return
      }

      container.appendChild(node.cloneNode(true))
    })
  }, [code])

  return (
    <div className={`glass border border-white/80 ${compact ? 'p-4' : 'p-5'}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">{title}</p>
        {!code?.trim() ? <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-500">Pega tu codigo en admin</span> : null}
      </div>
      {!code?.trim() ? (
        <div className="rounded-[1.3rem] border border-dashed border-[rgba(74,111,165,0.25)] bg-white/65 p-5 text-sm leading-7 text-slate-500">
          Este espacio queda listo para anuncios de AdSense, Adsterra u otra red.
        </div>
      ) : null}
      <div ref={containerRef} className="min-h-[80px] overflow-hidden rounded-[1.2rem]" />
    </div>
  )
}
