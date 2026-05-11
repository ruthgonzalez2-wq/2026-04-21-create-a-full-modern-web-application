import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/defaultData'
import { AdCodeSlot } from './AdCodeSlot'
import { CookieConsent } from './CookieConsent'
import { useSite } from '../state/SiteContext'

export function Layout({ children }) {
  const { data, isAdmin, setIsAdmin, isLoaded, saveMessage, saveState } = useSite()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    function handleKeydown(event) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'e') {
        event.preventDefault()
        setIsAdmin((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [setIsAdmin])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-slate-700">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="glass sticky top-4 z-30 mb-8 flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3">
            {data.site.logo ? (
              <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm">
                <img className="h-11 w-11 object-cover" src={data.site.logo} alt="Logo Digishoppress Multiverse" />
              </div>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4A6FA5,#D39BCB,#F6D6BD)] font-semibold text-white">
                D
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-slate-800">{data.site.brandName || 'Digishop Press Multiverse'}</p>
            </div>
          </Link>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-white text-slate-900 shadow-md' : 'bg-white/60 text-slate-600 hover:bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {isAdminRoute ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-slate-800 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`
                }
              >
                Administrar
              </NavLink>
            ) : null}
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="glass mt-10 flex flex-col gap-4 px-5 py-5 text-sm text-slate-500">
          <AdCodeSlot code={data.site.footerAdCode} title="Anuncio de pie de pagina" compact />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 {data.site.brandName || 'Digishop Press Multiverse'}. Todos los derechos reservados. Autor: Ruth Gonzalez</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pagina/sobre-nosotros">Sobre nosotros</Link>
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
              {data.site.paypalUrl ? (
                <a href={data.site.paypalUrl} target="_blank" rel="noreferrer">
                  Donar con PayPal
                </a>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a href="mailto:digishoppress@gmail.com" className="transition hover:text-slate-800">
              Correo: digishoppress@gmail.com
            </a>
            <a href="https://wa.me/18495408672" target="_blank" rel="noreferrer" className="transition hover:text-slate-800">
              WhatsApp: 849 540 8672
            </a>
          </div>
        </footer>
      </div>
      {isAdminRoute && !isLoaded ? (
        <div className="fixed left-4 top-4 z-40 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
          Cargando sitio...
        </div>
      ) : null}
      {isAdminRoute && saveMessage ? (
        <div
          className={`fixed bottom-4 left-4 z-40 rounded-full px-4 py-2 text-sm font-semibold text-white ${
            saveState === 'error' ? 'bg-pink-500' : saveState === 'saved' ? 'bg-emerald-500' : 'bg-slate-800'
          }`}
        >
          {saveMessage}
        </div>
      ) : null}
      <CookieConsent />
      {isAdmin ? (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
          {!isAdminRoute ? (
            <Link
              to="/admin"
              className="rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700"
            >
              Abrir editor
            </Link>
          ) : (
            <Link
              to="/"
              className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-lg transition hover:bg-white"
            >
              Volver al sitio
            </Link>
          )}
          <button
            className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-md transition hover:bg-white"
            onClick={() => setIsAdmin(false)}
          >
            Ocultar modo editor
          </button>
        </div>
      ) : null}
    </div>
  )
}
