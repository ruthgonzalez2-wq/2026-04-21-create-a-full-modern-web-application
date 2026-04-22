import { Link, NavLink } from 'react-router-dom'
import { navItems } from '../data/defaultData'
import { CookieConsent } from './CookieConsent'
import { useSite } from '../state/SiteContext'

export function Layout({ children }) {
  const { data } = useSite()

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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#5DADE2,#F78FB3)] font-semibold text-white">
                D
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-slate-800">Digishoppress Multiverse</p>
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
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="glass mt-10 flex flex-col gap-4 px-5 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Digishoppress Multiverse</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms">Terms and Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
      <CookieConsent />
    </div>
  )
}
