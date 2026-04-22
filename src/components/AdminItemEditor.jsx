import { useState } from 'react'
import { FormPanel } from './FormPanel'

export function AdminItemEditor({ title, fields, item, onSave, onDelete, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass p-4">
      {children}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? 'Cerrar edicion' : 'Editar'}
        </button>
        <button className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600" onClick={onDelete}>
          Eliminar
        </button>
      </div>
      {isOpen ? (
        <div className="mt-4">
          <FormPanel title={title} fields={fields} initialValues={item} onSubmit={onSave} buttonLabel="Guardar cambios" />
        </div>
      ) : null}
    </div>
  )
}
