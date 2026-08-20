import { useEffect, useState } from 'react'
import {
  CalendarDays,
  DoorOpen,
  MapPin,
  ShieldCheck,
  Ticket,
  UserRound
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { Evento } from '../types'

export function DetalhesEvento() {
  const { id } = useParams()
  const [evento, setEvento] = useState<Evento | null>(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarEvento() {
      try {
        const response = await api.get<Evento>(`/eventos/${id}`)
        setEvento(response.data)
      } catch {
        setErro('Evento não encontrado.')
      }
    }

    buscarEvento()
  }, [id])

  async function adicionarAgenda() {
    const clienteId = localStorage.getItem('clienteId')

    if (!clienteId) {
      setMensagem('Cadastre um cliente antes de adicionar eventos à agenda.')
      return
    }

    try {
      await api.post('/agendas', {
        id_cliente: Number(clienteId),
        id_evento: Number(id)
      })

      setMensagem('Evento adicionado à sua agenda com sucesso!')
    } catch {
      setMensagem('Não foi possível adicionar o evento à agenda.')
    }
  }

  if (erro) {
    return (
      <main className="container section">
        <p className="feedback feedback-error">{erro}</p>
        <Link className="button button-primary" to="/">
          Voltar aos eventos
        </Link>
      </main>
    )
  }

  if (!evento) {
    return (
      <main className="container section">
        <p className="feedback">Carregando detalhes do evento...</p>
      </main>
    )
  }

  const data = new Date(evento.data_hora)

  return (
    <main className="container section">
      <div className="event-details">
        <img
          className="event-details-image"
          src={
            evento.foto_artista ||
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
          }
          alt={`Show de ${evento.artista}`}
        />

        <div className="event-details-content">
          <span className="badge">EVENTO CONFIRMADO</span>
          <h1>{evento.artista}</h1>

          <div className="details-list">
            <p>
              <CalendarDays size={21} />
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

            <p>
              <MapPin size={21} />
              {evento.local?.nome}, {evento.local?.endereco},{' '}
              {evento.local?.numero} — {evento.local?.cidade}
            </p>

            <p>
              <Ticket size={21} />
              Acesso: {evento.acesso || 'Não informado'}
            </p>

            <p>
              <DoorOpen size={21} />
              Portão: {evento.portao || 'Não informado'}
            </p>

            <p>
              <UserRound size={21} />
              Organizado por: {evento.admin?.nome || 'Admin não informado'}
            </p>

            <p>
              <ShieldCheck size={21} />
              Informações atualizadas pela administração do evento.
            </p>
          </div>

          <button className="button button-primary button-large" onClick={adicionarAgenda}>
            Adicionar à minha agenda
          </button>

          {mensagem && <p className="action-message">{mensagem}</p>}
        </div>
      </div>
    </main>
  )
}