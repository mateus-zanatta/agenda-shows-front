import { useEffect, useState } from 'react'
import { CalendarHeart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import type { Agenda } from '../types'

export function MinhaAgenda() {
  const [agendas, setAgendas] = useState<Agenda[]>([])
  const [mensagem, setMensagem] = useState('')
  const clienteId = localStorage.getItem('clienteId')
  const nomeCliente = localStorage.getItem('clienteNome')

  async function carregarAgenda() {
    if (!clienteId) {
      return
    }

    try {
      const response = await api.get<Agenda[]>(`/agendas/cliente/${clienteId}`)
      setAgendas(response.data)
    } catch {
      setMensagem('Não foi possível carregar sua agenda.')
    }
  }

  useEffect(() => {
    carregarAgenda()
  }, [])

  async function removerEvento(idAgenda: number) {
    try {
      await api.delete(`/agendas/${idAgenda}`)
      setAgendas((agendaAtual) =>
        agendaAtual.filter((agenda) => agenda.id !== idAgenda)
      )
    } catch {
      setMensagem('Não foi possível remover o evento.')
    }
  }

  if (!clienteId) {
    return (
      <main className="container section">
        <p className="feedback">
          Você precisa criar uma conta antes de acessar sua agenda.
        </p>

        <Link className="button button-primary" to="/cadastro">
          Criar minha conta
        </Link>
      </main>
    )
  }

  return (
    <main className="container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">MINHA AGENDA</span>
          <h1>Olá, {nomeCliente || 'cliente'}!</h1>
          <p className="page-description">
            Estes são os shows que você salvou para não perder.
          </p>
        </div>

        <CalendarHeart className="heading-icon" size={42} />
      </div>

      {mensagem && <p className="feedback feedback-error">{mensagem}</p>}

      {agendas.length === 0 && (
        <div className="empty-state">
          <h2>Sua agenda ainda está vazia.</h2>
          <p>Explore os eventos disponíveis e salve seus shows favoritos.</p>
          <Link className="button button-primary" to="/">
            Ver eventos
          </Link>
        </div>
      )}

      <div className="agenda-list">
        {agendas.map((agenda) => {
          const evento = agenda.evento
          const data = evento ? new Date(evento.data_hora) : null

          return (
            <article className="agenda-item" key={agenda.id}>
              <img
                src={
                  evento?.foto_artista ||
                  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80'
                }
                alt={evento?.artista || 'Evento'}
              />

              <div className="agenda-item-content">
                <span className="badge">SALVO NA AGENDA</span>
                <h2>{evento?.artista || 'Evento removido'}</h2>

                {data && (
                  <p>
                    {data.toLocaleDateString('pt-BR')} às{' '}
                    {data.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}

                <p>
                  {evento?.local?.nome || 'Local não informado'} —{' '}
                  {evento?.local?.cidade || 'Cidade não informada'}
                </p>
              </div>

              <button
                className="icon-button danger"
                title="Remover da agenda"
                onClick={() => removerEvento(agenda.id)}
              >
                <Trash2 size={20} />
              </button>
            </article>
          )
        })}
      </div>
    </main>
  )
}