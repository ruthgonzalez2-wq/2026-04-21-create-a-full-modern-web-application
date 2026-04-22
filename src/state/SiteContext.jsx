import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultData } from '../data/defaultData'

const STORAGE_KEY = 'digishoppress-multiverse-stable-v1'
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

function loadData() {
  if (typeof window === 'undefined') {
    return defaultData
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultData
    }

    return mergeDefaults(defaultData, JSON.parse(raw))
  } catch {
    return defaultData
  }
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }, [data])

  const actions = useMemo(
    () => ({
      setIsAdmin,
      updateSite(values) {
        setData((current) => ({ ...current, site: { ...current.site, ...values } }))
      },
      addPublication(item) {
        setData((current) => ({
          ...current,
          publications: [{ ...item, id: createId('pub') }, ...current.publications],
        }))
      },
      updatePublication(id, values) {
        setData((current) => ({
          ...current,
          publications: current.publications.map((item) => (item.id === id ? { ...item, ...values } : item)),
        }))
      },
      deletePublication(id) {
        setData((current) => ({
          ...current,
          publications: current.publications.filter((item) => item.id !== id),
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
      addHelpsItem(category, subject, item) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: {
              ...current.helps.items,
              [category]: {
                ...current.helps.items[category],
                [subject]: [{ ...item, id: createId('helps') }, ...current.helps.items[category][subject]],
              },
            },
          },
        }))
      },
      updateHelpsItem(category, subject, id, values) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: {
              ...current.helps.items,
              [category]: {
                ...current.helps.items[category],
                [subject]: current.helps.items[category][subject].map((item) => (item.id === id ? { ...item, ...values } : item)),
              },
            },
          },
        }))
      },
      deleteHelpsItem(category, subject, id) {
        setData((current) => ({
          ...current,
          helps: {
            ...current.helps,
            items: {
              ...current.helps.items,
              [category]: {
                ...current.helps.items[category],
                [subject]: current.helps.items[category][subject].filter((item) => item.id !== id),
              },
            },
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
                [item.category]: [{ ...item, id: createId('marketing') }, ...current.marketing.items[item.category]],
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

  return <SiteContext.Provider value={{ data, isAdmin, ...actions }}>{children}</SiteContext.Provider>
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used inside SiteProvider')
  }
  return context
}
