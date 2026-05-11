import { Link } from 'react-router-dom'
import { navItems } from '../data/defaultData'

const universeVisuals = {
  '/': { code: 'IN', glow: 'from-[rgba(74,111,165,0.9)] via-[rgba(184,161,217,0.75)] to-[rgba(246,214,189,0.9)]' },
  '/studio': { code: 'SF', glow: 'from-[rgba(74,111,165,0.9)] via-[rgba(244,166,193,0.72)] to-[rgba(246,214,189,0.88)]' },
  '/recursos': { code: 'MP', glow: 'from-[rgba(184,161,217,0.9)] via-[rgba(74,111,165,0.72)] to-[rgba(244,166,193,0.86)]' },
  '/helps': { code: 'HE', glow: 'from-[rgba(246,214,189,0.95)] via-[rgba(74,111,165,0.68)] to-[rgba(184,161,217,0.82)]' },
  '/ebooks': { code: 'EB', glow: 'from-[rgba(244,166,193,0.88)] via-[rgba(184,161,217,0.7)] to-[rgba(246,214,189,0.9)]' },
  '/cursos': { code: 'CU', glow: 'from-[rgba(74,111,165,0.88)] via-[rgba(246,214,189,0.74)] to-[rgba(184,161,217,0.86)]' },
  '/trabajos': { code: 'RL', glow: 'from-[rgba(246,214,189,0.92)] via-[rgba(244,166,193,0.74)] to-[rgba(74,111,165,0.84)]' },
}

export function UniverseExplorer() {
  return (
    <section className="glass overflow-hidden border border-white/80 bg-[linear-gradient(135deg,rgba(74,111,165,0.14),rgba(184,161,217,0.16),rgba(244,166,193,0.12),rgba(246,214,189,0.16))] p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Mapa del multiverso</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-800 sm:text-4xl">¿En qué universo quieres aterrizar hoy?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          Explora cada area del sitio desde un acceso visual rapido para llegar al universo que necesites.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {navItems.map((item) => {
          const visual = universeVisuals[item.to]
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/78 p-5 shadow-[0_18px_45px_rgba(95,104,145,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(95,104,145,0.18)]"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${visual?.glow || 'from-sky-400 to-pink-300'}`} />
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${visual?.glow || 'from-sky-400 to-pink-300'} text-base font-semibold tracking-[0.18em] text-white shadow-lg`}>
                  {visual?.code || 'DV'}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Universo</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-800">{item.label}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">Entrar y descubrir contenido, publicaciones y recursos relacionados con esta area.</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
