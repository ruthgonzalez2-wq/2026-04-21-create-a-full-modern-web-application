const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_WRITE_TOKEN = process.env.ADMIN_WRITE_TOKEN
const TABLE_NAME = 'site_content'
const RECORD_KEY = 'main'

function json(response, status = 200) {
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

function getSupabaseHeaders() {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function readContent() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?key=eq.${RECORD_KEY}&select=content&limit=1`, {
    headers: getSupabaseHeaders(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'No se pudo leer el contenido remoto.')
  }

  const rows = await response.json()
  return rows?.[0]?.content ?? null
}

async function writeContent(content) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
    method: 'POST',
    headers: {
      ...getSupabaseHeaders(),
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify([{ key: RECORD_KEY, content }]),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'No se pudo guardar el contenido remoto.')
  }

  return response.json()
}

export default async function handler(request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: 'Supabase no esta configurado todavia.' }, 503)
  }

  if (request.method === 'GET') {
    try {
      const content = await readContent()
      return json({ content })
    } catch (error) {
      return json({ error: error.message || 'No se pudo leer el contenido remoto.' }, 500)
    }
  }

  if (request.method === 'POST') {
    const token = request.headers.get('x-admin-token')
    if (!ADMIN_WRITE_TOKEN || token !== ADMIN_WRITE_TOKEN) {
      return json({ error: 'Clave de publicacion invalida.' }, 401)
    }

    try {
      const body = await request.json()
      const content = body?.content
      await writeContent(content)
      return json({ ok: true })
    } catch (error) {
      return json({ error: error.message || 'No se pudo publicar el contenido remoto.' }, 500)
    }
  }

  return json({ error: 'Metodo no permitido.' }, 405)
}
