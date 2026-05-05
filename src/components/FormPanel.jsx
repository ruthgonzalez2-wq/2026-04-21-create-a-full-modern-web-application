import { useEffect, useMemo, useRef, useState } from 'react'
import { RichTextEditor } from './RichTextEditor'

function getInitial(fields) {
  return fields.reduce((acc, field) => {
    acc[field.key] = field.defaultValue ?? ''
    return acc
  }, {})
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function validateFile(file) {
  const isVideo = file.type.startsWith('video/')
  const maxSize = isVideo ? 40 * 1024 * 1024 : 12 * 1024 * 1024

  if (file.size > maxSize) {
    throw new Error(isVideo ? 'El video es demasiado grande. Usa uno menor de 40 MB.' : 'La imagen es demasiado grande. Usa una menor de 12 MB.')
  }
}

export function FormPanel({ title, fields, onSubmit, buttonLabel = 'Guardar', initialValues }) {
  const defaults = useMemo(() => ({ ...getInitial(fields), ...(initialValues || {}) }), [fields, initialValues])
  const defaultsSignature = useMemo(() => JSON.stringify(defaults), [defaults])
  const [form, setForm] = useState(defaults)
  const [status, setStatus] = useState('')
  const defaultsSignatureRef = useRef(defaultsSignature)

  useEffect(() => {
    if (defaultsSignatureRef.current !== defaultsSignature) {
      defaultsSignatureRef.current = defaultsSignature
      setForm(defaults)
    }
  }, [defaults, defaultsSignature])

  async function onFile(field, file) {
    if (!file) return
    validateFile(file)
    setStatus('Cargando archivo...')
    const value = await readFile(file)
    setForm((current) => ({ ...current, [field.key]: value }))
    setStatus('Archivo listo para guardar.')
  }

  function submit(event) {
    event.preventDefault()
    setStatus('Guardando...')
    onSubmit(form)
    setStatus('Cambios enviados.')
    if (!initialValues) {
      setForm(getInitial(fields))
    }
  }

  return (
    <form className="glass grid gap-3 p-5" onSubmit={submit}>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      {fields.map((field) => {
        const wrapperClass = `${field.fullWidth ? 'md:col-span-2' : ''} grid gap-1 text-sm text-slate-600`

        if (field.type === 'richtext') {
          return (
            <div key={field.key} className={wrapperClass}>
              <span>{field.label}</span>
              <RichTextEditor
                name={field.key}
                value={form[field.key] || ''}
                onChange={(value) => setForm((current) => ({ ...current, [field.key]: value }))}
              />
            </div>
          )
        }

        return (
          <label key={field.key} className={wrapperClass}>
            <span>{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea
                className="input-field min-h-28"
                value={form[field.key] || ''}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
              />
            ) : field.type === 'select' ? (
              <select
                className="input-field"
                value={form[field.key] || ''}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
              >
                {field.options.map((option) => (
                  <option key={typeof option === 'string' ? option : option.value} value={typeof option === 'string' ? option : option.value}>
                    {typeof option === 'string' ? option : option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'file' ? (
              <input className="input-field" type="file" accept={field.accept} onChange={(event) => onFile(field, event.target.files?.[0])} />
            ) : (
              <input
                className="input-field"
                value={form[field.key] || ''}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
              />
            )}
          </label>
        )
      })}
      {status ? <p className="text-sm text-slate-500">{status}</p> : null}
      <button className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white" type="submit">
        {buttonLabel}
      </button>
    </form>
  )
}
