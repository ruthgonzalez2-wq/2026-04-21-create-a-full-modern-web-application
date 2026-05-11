import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultData } from '../data/defaultData'

const LEGACY_STORAGE_KEY = 'digishoppress-multiverse-stable-v1'
const EDITOR_MODE_KEY = 'digishoppress-multiverse-editor-mode'
const ADMIN_TOKEN_KEY = 'digishoppress-multiverse-admin-token'
const DB_NAME = 'digishoppress-multiverse-db'
const STORE_NAME = 'site'
const RECORD_ID = 'current-site'
const REMOTE_ENDPOINT = '/api/site-content'
const SiteContext = createContext(null)

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function mergeDefaults(base, saved) {
  if (Array.isArray(base)) {
    return Array.isArray(saved) ? saved : base
  }

  if (isObject(base)) {
    const result = { ...base }
    const source = isObject(saved) ? saved : {}

    Object.keys(base).forEach((key) => {
      result[key] = mergeDefaults(base[key], source[key])
    })

    Object.keys(source).forEach((key) => {
      if (!(key in result)) {
        result[key] = source[key]
      }
    })

    return result
  }

  return saved ?? base
}

function splitTags(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizePublication(item) {
  const type = item?.type || 'Entrada'
  return {
    id: item?.id || '',
    category: item?.category || '',
    title: item?.title || '',
    description: item?.description || '',
    image: item?.image || '',
    type,
    status: item?.status || 'Publicado',
    targetSection: item?.targetSection || 'Inicio',
    pageSlug: item?.pageSlug || '',
    linkUrl: item?.linkUrl || '',
    linkLabel: item?.linkLabel || '',
    linkDescription: item?.linkDescription || '',
    pdfFile: item?.pdfFile || '',
    tags: splitTags(item?.tags),
  }
}

function normalizePage(item) {
  const title = item?.title || ''
  const slug = item?.slug ? slugify(item.slug) : slugify(title)

  return {
    id: item?.id || '',
    title,
    slug,
    summary: item?.summary || '',
    content: item?.content || '',
    status: item?.status || 'Privado',
    targetSection: item?.targetSection || '',
    coverImage: item?.coverImage || '',
    videoUrl: item?.videoUrl || '',
    pdfFile: item?.pdfFile || '',
    tags: splitTags(item?.tags),
  }
}

function normalizeHelpsItem(item) {
  return {
    id: item?.id || '',
    tab: item?.tab || '',
    title: item?.title || '',
    description: item?.description || '',
    type: item?.type || 'Entrada',
    status: item?.status || 'Publicado',
    image: item?.image || '',
    videoUrl: item?.videoUrl || '',
    linkUrl: item?.linkUrl || '',
    linkDescription: item?.linkDescription || '',
    pdfFile: item?.pdfFile || '',
    tags: splitTags(item?.tags),
  }
}

function normalizeMarketingItems(items = {}) {
  const oldMappings = {
    Imagenes: 'Redes sociales',
    Videos: 'Negocios',
    Campanas: 'Negocios',
    Plantillas: 'Redes sociales',
    Diapositivas: 'Educacion',
    'Redes sociales': 'Redes sociales',
    Educacion: 'Educacion',
    'Recursos laborales': 'Recursos laborales',
    Negocios: 'Negocios',
  }

  const normalized = {
    'Redes sociales': [],
    Educacion: [],
    'Recursos laborales': [],
    Negocios: [],
  }

  Object.entries(items || {}).forEach(([key, values]) => {
    const target = oldMappings[key] || 'Redes sociales'
    normalized[target] = [...normalized[target], ...((Array.isArray(values) ? values : []).map((item) => ({
      ...item,
      accessType: item?.accessType || 'Gratis',
      price: item?.price || '',
      resourceLink: item?.resourceLink || '',
      downloadFile: item?.downloadFile || '',
      downloadName: item?.downloadName || '',
      paymentLink: item?.paymentLink || '',
      previewNote: item?.previewNote || '',
      contactLabel: item?.contactLabel || '',
    })))]
  })

  return normalized
}

function ensureSystemPages(pages = []) {
  const hasAbout = pages.some((item) => item.slug === 'sobre-nosotros')
  if (hasAbout) {
    return pages
  }

  return [...pages, ...defaultData.pages]
}

function removeLegacyWelcomePublication(data) {
  if (!Array.isArray(data?.publications)) {
    return data
  }

  return {
    ...data,
    publications: data.publications.filter(
      (item) =>
        !(
          item?.title === 'Bienvenida' &&
          item?.category === 'Novedad' &&
          item?.description === 'Este es el espacio principal del sitio para mostrar novedades y contenido importante.'
        ),
    ),
  }
}

function normalizeData(data) {
  const helpsItems = Array.isArray(data.helps?.items)
    ? data.helps.items
    : Object.values(data.helps?.items || {}).flatMap((group) =>
        Object.values(group || {}).flatMap((items) => (Array.isArray(items) ? items : [])),
      )

  return {
    ...data,
    site: {
      ...data.site,
      brandName: data.site?.brandName || defaultData.site.brandName,
      heroTitle: data.site?.heroTitle === 'Digishoppress Multiverse' ? defaultData.site.heroTitle : data.site?.heroTitle || defaultData.site.heroTitle,
      paypalUrl: data.site?.paypalUrl || '',
      footerAdCode: data.site?.footerAdCode || '',
      sideAdCode: data.site?.sideAdCode || '',
    },
    publications: (data.publications || []).map(normalizePublication),
    pages: ensureSystemPages((data.pages || []).map(normalizePage)),
    marketing: {
      ...data.marketing,
      title:
        !data.marketing?.title || data.marketing?.title === 'Marketing Digishoppress' || data.marketing?.title === 'Recursos'
          ? defaultData.marketing.title
          : data.marketing.title,
      description:
        !data.marketing?.description || data.marketing?.description === 'Area dedicada a piezas de marketing, campanas visuales, videos promocionales y recursos comerciales.'
          ? defaultData.marketing.description
          : data.marketing.description,
      items: normalizeMarketingItems(data.marketing?.items),
    },
    helps: {
      ...data.helps,
      tabs: Array.isArray(data.helps?.tabs)
        ? data.helps.tabs
        : [...new Set(helpsItems.map((item) => item?.tab).filter(Boolean))],
      items: helpsItems.map(normalizeHelpsItem),
    },
    jobs: {
      ...data.jobs,
      title: !data.jobs?.title || data.jobs?.title === 'Trabajos y servicios' ? defaultData.jobs.title : data.jobs.title,
    },
  }
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB no esta disponible.'))
      return
    }

    const request = window.indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('No se pudo abrir la base local.'))
  })
}

async function readFromDatabase() {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(RECORD_ID)

    request.onsuccess = () => {
      database.close()
      resolve(request.result?.value ?? null)
    }
    request.onerror = () => {
      database.close()
      reject(request.error || new Error('No se pudo leer la base local.'))
    }
  })
}

async function writeToDatabase(value) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.put({ id: RECORD_ID, value })

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error || new Error('No se pudo guardar en la base local.'))
    }
  })
}

function readLegacyStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

async function readRemoteSite() {
  if (typeof window === 'undefined') {
    throw new Error('No disponible fuera del navegador.')
  }

  const response = await fetch(REMOTE_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('La nube no esta disponible todavia.')
  }

  const payload = await response.json()
  return payload?.content ?? null
}

async function writeRemoteSite(value, adminToken) {
  if (!adminToken?.trim()) {
    throw new Error('Falta la clave de publicacion.')
  }

  const response = await fetch(REMOTE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': adminToken.trim(),
    },
    body: JSON.stringify({ content: value }),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.error || 'No se pudo publicar en la nube.')
  }

  return response.json()
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(defaultData)
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(EDITOR_MODE_KEY) === 'true'
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [saveState, setSaveState] = useState('idle')
  const [saveMessage, setSaveMessage] = useState('')
  const [syncMode, setSyncMode] = useState('local')
  const [adminToken, setAdminTokenState] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    return window.localStorage.getItem(ADMIN_TOKEN_KEY) || ''
  })
  const hydratedRef = useRef(false)

  useEffect(() => {
    let active = true

    async function hydrate() {
      try {
        const remote = await readRemoteSite()
        if (active) {
          setData(normalizeData(removeLegacyWelcomePublication(mergeDefaults(defaultData, remote))))
          setIsLoaded(true)
          setSyncMode('cloud')
          hydratedRef.current = true
        }
      } catch {
        try {
          const stored = await readFromDatabase()
          const legacy = stored ?? readLegacyStorage()
          if (active) {
            setData(normalizeData(removeLegacyWelcomePublication(mergeDefaults(defaultData, legacy))))
            setIsLoaded(true)
            setSyncMode('local')
            hydratedRef.current = true
          }
        } catch {
          if (active) {
            setData(defaultData)
            setIsLoaded(true)
            setSyncMode('local')
            hydratedRef.current = true
          }
        }
      }
    }

    hydrate()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!hydratedRef.current || !isLoaded) {
      return
    }

    let active = true
    setSaveState('saving')
    setSaveMessage('Guardando cambios...')

    async function persist() {
      try {
        if (syncMode === 'cloud' && adminToken?.trim()) {
          await writeRemoteSite(data, adminToken)
          if (active) {
            setSaveState('saved')
            setSaveMessage('Cambios publicados para todos.')
          }
          return
        }

        await writeToDatabase(data)
        if (active) {
          setSaveState('saved')
          setSaveMessage(syncMode === 'cloud' ? 'Cambios guardados solo en este navegador. Falta la clave para publicarlos.' : 'Cambios guardados solo en este navegador.')
        }
      } catch (error) {
        try {
          await writeToDatabase(data)
          if (active) {
            setSaveState('error')
            setSaveMessage(error?.message || 'No se pudo publicar. Se guardo solo en este navegador.')
          }
        } catch {
          if (active) {
            setSaveState('error')
            setSaveMessage('No se pudo guardar. Usa archivos mas pequenos.')
          }
        }
      }
    }

    persist()

    return () => {
      active = false
    }
  }, [adminToken, data, isLoaded, syncMode])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(EDITOR_MODE_KEY, String(isAdmin))
  }, [isAdmin])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (adminToken) {
      window.localStorage.setItem(ADMIN_TOKEN_KEY, adminToken)
      return
    }

    window.localStorage.removeItem(ADMIN_TOKEN_KEY)
  }, [adminToken])

  const actions = useMemo(
    () => ({
      setIsAdmin,
      setAdminToken(value) {
        setAdminTokenState(String(value || '').trim())
      },
      updateSite(values) {
        setData((current) => ({ ...current, site: { ...current.site, ...values } }))
      },
      addPublication(item) {
        setData((current) => ({
          ...current,
          publications: [{ ...normalizePublication(item), id: createId('pub') }, ...current.publications],
        }))
      },
      updatePublication(id, values) {
        setData((current) => ({
          ...current,
          publications: current.publications.map((item) => (item.id === id ? { ...item, ...normalizePublication({ ...item, ...values }) } : item)),
        }))
      },
      deletePublication(id) {
        setData((current) => ({
          ...current,
          publications: current.publications.filter((item) => item.id !== id),
        }))
      },
      addPage(item) {
        setData((current) => ({
          ...current,
          pages: [{ ...normalizePage(item), id: createId('page') }, ...current.pages],
        }))
      },
      updatePage(id, values) {
        setData((current) => ({
          ...current,
          pages: current.pages.map((item) => (item.id === id ? { ...item, ...normalizePage({ ...item, ...values }) } : item)),
        }))
      },
      deletePage(id) {
        setData((current) => ({
          ...current,
          pages: current.pages.filter((item) => item.id !== id),
          publications: current.publications.map((item) => (item.pageSlug === current.pages.find((page) => page.id === id)?.slug ? { ...item, pageSlug: '' } : item)),
        }))
      },
      updateStudioInfo(values) {
        setData((current) => ({ ...current, studio: { ...current.studio, ...values } }))
      },
      addStudioItem(category, item) {
        setData((current) => ({
          ...current,
          studio: {
            ...current.studio,
            items: {
              ...current.studio.items,
              [category]: [{ ...item, id: createId('studio') }, ...current.studio.items[category]],
            },
          },
        }))
      },
      updateStudioItem(category, id, values) {
        setData((current) => ({
          ...current,
          studio: {
            ...current.studio,
            items: {
              ...current.studio.items,
              [category]: current.studio.items[category].map((item) => (item.id === id ? { ...item, ...values } : item)),
            },
          },
        }))
      },
      deleteStudioItem(category, id) {
        setData((current) => ({
          ...current,
          studio: {
            ...current.studio,
            items: {
              ...current.studio.items,
              [category]: current.studio.items[category].filter((item) => item.id !== id),
            },
          },
        }))
      },
      updateMarketingInfo(values) {
        setData((current) => ({ ...current, marketing: { ...current.marketing, ...values } }))
      },
      updateHelpsInfo(values) {
        setData((current) => ({ ...current, helps: { ...current.helps, ...values } }))
      },
      addHelpsTab(title) {
        const cleanTitle = String(title || '').trim()
        if (!cleanTitle) {
          return
        }

        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            tabs: current.helps.tabs.includes(cleanTitle) ? current.helps.tabs : [...current.helps.tabs, cleanTitle],
          },
        }))
      },
      updateHelpsTab(previousTitle, nextTitle) {
        const cleanTitle = String(nextTitle || '').trim()
        if (!cleanTitle || previousTitle === cleanTitle) {
          return
        }

        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            tabs: current.helps.tabs.map((item) => (item === previousTitle ? cleanTitle : item)),
            items: current.helps.items.map((item) => (item.tab === previousTitle ? { ...item, tab: cleanTitle } : item)),
          },
        }))
      },
      deleteHelpsTab(title) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            tabs: current.helps.tabs.filter((item) => item !== title),
            items: current.helps.items.map((item) => (item.tab === title ? { ...item, tab: '' } : item)),
          },
        }))
      },
      addHelpsItem(item) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: [{ ...normalizeHelpsItem(item), id: createId('helps') }, ...current.helps.items],
          },
        }))
      },
      updateHelpsItem(id, values) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: current.helps.items.map((item) => (item.id === id ? { ...item, ...normalizeHelpsItem({ ...item, ...values }) } : item)),
          },
        }))
      },
      deleteHelpsItem(id) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: current.helps.items.filter((item) => item.id !== id),
          },
        }))
      },
      updateSection(section, values) {
        setData((current) => ({ ...current, [section]: { ...current[section], ...values } }))
      },
      addSectionItem(section, item) {
        if (section === 'marketing') {
          setData((current) => ({
            ...current,
            marketing: {
              ...current.marketing,
              items: {
              ...current.marketing.items,
                [item.category]: [
                  {
                    ...item,
                      accessType: item.accessType || 'Gratis',
                      price: item.price || '',
                      resourceLink: item.resourceLink || '',
                      downloadFile: item.downloadFile || '',
                      downloadName: item.downloadName || '',
                      paymentLink: item.paymentLink || '',
                      previewNote: item.previewNote || '',
                      contactLabel: item.contactLabel || '',
                      id: createId('marketing'),
                  },
                  ...current.marketing.items[item.category],
                ],
              },
            },
          }))
          return
        }

        setData((current) => ({
          ...current,
          [section]: {
            ...current[section],
            items: [{ ...item, id: createId(section) }, ...current[section].items],
          },
        }))
      },
      updateSectionItem(section, id, values) {
        if (section === 'marketing') {
          setData((current) => ({
            ...current,
            marketing: {
              ...current.marketing,
              items: Object.fromEntries(
                Object.entries(current.marketing.items).map(([key, items]) => [
                  key,
                  items.map((item) => (item.id === id ? { ...item, ...values } : item)),
                ]),
              ),
            },
          }))
          return
        }

        setData((current) => ({
          ...current,
          [section]: {
            ...current[section],
            items: current[section].items.map((item) => (item.id === id ? { ...item, ...values } : item)),
          },
        }))
      },
      deleteSectionItem(section, id) {
        if (section === 'marketing') {
          setData((current) => ({
            ...current,
            marketing: {
              ...current.marketing,
              items: Object.fromEntries(
                Object.entries(current.marketing.items).map(([key, items]) => [
                  key,
                  items.filter((item) => item.id !== id),
                ]),
              ),
            },
          }))
          return
        }

        setData((current) => ({
          ...current,
          [section]: {
            ...current[section],
            items: current[section].items.filter((item) => item.id !== id),
          },
        }))
      },
      updateLegal(values) {
        setData((current) => ({ ...current, legal: { ...current.legal, ...values } }))
      },
      resetAll() {
        setData(defaultData)
      },
    }),
    [],
  )

  return (
    <SiteContext.Provider value={{ data, isAdmin, isLoaded, saveState, saveMessage, syncMode, adminToken, ...actions }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used inside SiteProvider')
  }
  return context
}
