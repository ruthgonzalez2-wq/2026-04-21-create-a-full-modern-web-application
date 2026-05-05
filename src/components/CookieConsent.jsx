import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const KEY = 'digishoppress-cookie-ok'

export function CookieConsent() {
  const [accepted, setAccepted] = useState(true)
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    const value = typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : '1'
    setAccepted(value === '1')
  }, [])

  function accept() {
    window.localStorage.setItem(KEY, '1')
    setAccepted(true)
  }

  if (accepted || isAdminRoute) {
    return null
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl">
      <div className="glass flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-600">
          Este sitio usa cookies y almacenamiento local para mejorar tu experiencia de navegacion y recordar tus preferencias.
        </p>
        <button className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white" onClick={accept}>
          Aceptar
        </button>
      </div>
    </div>
  )
}
