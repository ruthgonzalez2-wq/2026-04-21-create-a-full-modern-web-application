import { useMemo, useState } from 'react'

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

export function FormPanel({ title, fields, onSubmit, buttonLabel = 'Guardar', initialValues }) {
  const defaults = useMemo(() => ({ ...getInitial(fields), ...(initialValues || {}) }), [fields, initialValues])
  const [form, setForm] = useState(defaults)

  async function onFile(field, file) {
    if (!file) return
    const value = await readFile(file)
    setForm((current) => ({ ...current, [field.key]: value }))
  }

  function submit(event) {
    event.preventDefault()
    onSubmit(form)
    if (!initialValues) {
      setForm(getInitial(fields))
    }
  }

  return (
    <form className="glass grid gap-3 p-5" onSubmit={submit}>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      {fields.map((field) => (
        <label key={field.key} className={`${field.fullWidth ? 'md:col-span-2' : ''} grid gap-1 text-sm text-slate-600`}>
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
                <option key={option} value={option}>
                  {option}
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
      ))}
      <button className="rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white" type="submit">
        {buttonLabel}
      </button>
    </form>
  )
}
