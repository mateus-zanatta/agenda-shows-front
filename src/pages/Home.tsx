import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { EventCard } from '../components/EventCard'
import { api } from '../services/api'
import type { Evento } from '../types'

export function Home() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarEventos() {
      try {
        const response = await api.get<Evento[]>('/eventos')

        const eventosOrdenados = response.data.sort(
          (a, b) =>
            new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()
        )

        setEventos(eventosOrdenados)
      } catch {
        setErro(
          'Não foi possível carregar os eventos. Confirme se o backend está rodando na porta 3000.'
        )
      } finally {
        setCarregando(false)
      }
    }

    buscarEventos()
  }, [])

  const eventosFiltrados = eventos.filter((evento) => {
    const termo = busca.toLowerCase()

    return (
      evento.artista.toLowerCase().includes(termo) ||
      evento.local?.nome.toLowerCase().includes(termo) ||
      evento.local?.cidade.toLowerCase().includes(termo)
    )
  })

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-label">AGENDA DE SHOWS</span>
          <h1>Viva a música. Marque presença.</h1>
          <p>
            Descubra artistas, acompanhe os próximos eventos e organize a sua
            agenda de shows em um só lugar.
          </p>

          <div className="search-box">
            <Search size={21} />
            <input
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Busque por artista, local ou cidade..."
            />
          </div>
        </div>
      </section>

      <main className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PRÓXIMOS SHOWS</span>
            <h2>Eventos em destaque</h2>
          </div>

          <span className="event-count">
            {eventosFiltrados.length} evento(s)
          </span>
        </div>

        {carregando && <p className="feedback">Carregando eventos...</p>}

        {erro && <p className="feedback feedback-error">{erro}</p>}

        {!carregando && !erro && eventosFiltrados.length === 0 && (
          <p className="feedback">
            Nenhum evento foi encontrado. Cadastre um evento no painel admin.
          </p>
        )}

        <div className="events-grid">
          {eventosFiltrados.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      </main>
    </>
  )
}