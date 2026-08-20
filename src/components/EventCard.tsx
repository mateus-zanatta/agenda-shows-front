import { CalendarDays, MapPin, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Evento } from '../types'

interface EventCardProps {
  evento: Evento
}

export function EventCard({ evento }: EventCardProps) {
  const data = new Date(evento.data_hora)

  return (
    <article className="event-card">
      <img
        className="event-image"
        src={
          evento.foto_artista ||
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80'
        }
        alt={`Show de ${evento.artista}`}
      />

      <div className="event-card-content">
        <span className="badge">Show ao vivo</span>

        <h2>{evento.artista}</h2>

        <p className="event-info">
          <CalendarDays size={18} />
          {data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}{' '}
          às{' '}
          {data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>

        <p className="event-info">
          <MapPin size={18} />
          {evento.local?.nome || 'Local não informado'} —{' '}
          {evento.local?.cidade || 'Cidade não informada'}
        </p>

        <p className="event-info">
          <Ticket size={18} />
          {evento.acesso || 'Classificação não informada'}
        </p>

        <Link className="button button-primary" to={`/eventos/${evento.id}`}>
          Ver detalhes
        </Link>
      </div>
    </article>
  )
}