# Supabase Setup

## 1. Crea la tabla

Ejecuta este SQL en Supabase:

```sql
create table if not exists public.site_content (
  key text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_content (key, content)
values ('main', '{}'::jsonb)
on conflict (key) do nothing;
```

## 2. Toma estos valores

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- una clave privada tuya para `ADMIN_WRITE_TOKEN`

## 3. Ponlos en Vercel

En tu proyecto de Vercel:

- `Settings`
- `Environment Variables`

Agrega:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_WRITE_TOKEN`

## 4. Publicar desde el panel

En `/admin`, pega la misma clave de `ADMIN_WRITE_TOKEN` en:

- `Clave de publicacion en la nube`

Cuando esa clave este puesta:

- tus cambios se publican para todos
- los visitantes ven el contenido nuevo

Si no la pones:

- los cambios solo se guardan en tu navegador
