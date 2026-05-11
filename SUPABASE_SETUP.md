# Supabase Setup

Usa solo estas variables en Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 1. Bucket de imagenes

Crea un bucket publico llamado:

- `images`

## 2. Tabla posts

Ejecuta este SQL:

```sql
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);
```

## 3. Politicas minimas

Si el proyecto es solo para que publique el admin desde la web, necesitas permitir:

- insertar en `posts`
- leer `posts`
- subir y leer en bucket `images`

## 4. Variables en Vercel

En `Settings -> Environment Variables` agrega:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 5. Volver a desplegar

```powershell
cd "C:\Users\ruthg\Documents\Codex\2026-04-21-create-a-full-modern-web-application"
vercel.cmd --prod
```
