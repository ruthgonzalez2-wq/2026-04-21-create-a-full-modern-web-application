const communityBase = {
  Inicio: { followers: 1284, rating: 4.9 },
  Studio: { followers: 842, rating: 4.8 },
  Recursos: { followers: 963, rating: 4.9 },
  Helps: { followers: 716, rating: 4.7 },
  eBooks: { followers: 534, rating: 4.8 },
  Cursos: { followers: 689, rating: 4.8 },
  Trabajos: { followers: 478, rating: 4.7 },
}

function renderStars(rating) {
  const fullStars = Math.round(rating)
  return Array.from({ length: 5 }, (_, index) => (index < fullStars ? '★' : '☆')).join(' ')
}

export function UniverseCommunityBar({ section }) {
  const data = communityBase[section] || { followers: 500, rating: 4.8 }

  return (
    <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] px-4 py-3 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-white/80 px-3 py-1 font-semibold text-slate-700">{data.followers.toLocaleString()} seguidores</span>
        <span className="rounded-full bg-white/80 px-3 py-1 font-semibold text-amber-500">{renderStars(data.rating)}</span>
        <span className="text-slate-500">{data.rating.toFixed(1)} de valoracion</span>
      </div>
      <button className="rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-purple))] px-4 py-2 text-sm font-semibold text-white" type="button">
        Seguir pagina
      </button>
    </div>
  )
}
