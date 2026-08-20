import { FormEvent, useEffect, useState } from 'react'
import { BarChart3, Building2, CalendarPlus, UsersRound } from 'lucide-react'
import { api } from '../services/api'
import type { Admin, Cliente, Evento, Local } from '../types'

export function AdminPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [locais, setLocais] = useState<Local[]>([])
  const [admins, setAdmins] = useState<Admin[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [mensagem, setMensagem] = useState('')

  const [artista, setArtista] = useState('')
  const [fotoArtista, setFotoArtista] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [acesso, setAcesso] = useState('')
  const [portao, setPortao] = useState('')
  const [idLocal, setIdLocal] = useState('')
  const [idAdmin, setIdAdmin] = useState('')

  const [nomeLocal, setNomeLocal] = useState('')
  const [endereco, setEndereco] = useState('')
  const [numero, setNumero] = useState('')
  const [cidade, setCidade] = useState('')
  const [fotoLocal, setFotoLocal] = useState('')

  async function carregarDados() {
    try {
      const [eventosResponse, locaisResponse, adminsResponse, clientesResponse] =
        await Promise.all([
          api.get<Evento[]>('/eventos'),
          api.get<Local[]>('/locais'),
          api.get<Admin[]>('/admins'),
          api.get<Cliente[]>('/clientes')
        ])

      setEventos(eventosResponse.data)
      setLocais(locaisResponse.data)
      setAdmins(adminsResponse.data)
      setClientes(clientesResponse.data)
    } catch {
      setMensagem('Não foi possível carregar os dados administrativos.')
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  async function criarEvento(event: FormEvent) {
    event.preventDefault()
    setMensagem('')

    try {
      await api.post('/eventos', {
        artista,
        foto_artista: fotoArtista || null,
        data_hora: new Date(dataHora).toISOString(),
        acesso: acesso || null,
        portao: portao || null,
        id_local: Number(idLocal),
        id_admin: Number(idAdmin)
      })

      setArtista('')
      setFotoArtista('')
      setDataHora('')
      setAcesso('')
      setPortao('')
      setIdLocal('')
      setIdAdmin('')
      setMensagem('Evento cadastrado com sucesso!')
      carregarDados()
    } catch {
      setMensagem('Erro ao cadastrar evento. Confira todos os campos.')
    }
  }

  async function criarLocal(event: FormEvent) {
    event.preventDefault()
    setMensagem('')

    try {
      await api.post('/locais', {
        nome: nomeLocal,
        endereco,
        numero,
        cidade,
        foto: fotoLocal || null
      })

      setNomeLocal('')
      setEndereco('')
      setNumero('')
      setCidade('')
      setFotoLocal('')
      setMensagem('Local cadastrado com sucesso!')
      carregarDados()
    } catch {
      setMensagem('Erro ao cadastrar local.')
    }
  }

  return (
    <main className="container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ADMINISTRAÇÃO</span>
          <h1>Painel de controle</h1>
          <p className="page-description">
            Gerencie shows, locais e acompanhe os registros da plataforma.
          </p>
        </div>

        <BarChart3 className="heading-icon" size={42} />
      </div>

      {mensagem && <p className="action-message admin-message">{mensagem}</p>}

      <section className="stats-grid">
        <div className="stat-card">
          <CalendarPlus size={26} />
          <div>
            <strong>{eventos.length}</strong>
            <span>Eventos</span>
          </div>
        </div>

        <div className="stat-card">
          <Building2 size={26} />
          <div>
            <strong>{locais.length}</strong>
            <span>Locais</span>
          </div>
        </div>

        <div className="stat-card">
          <UsersRound size={26} />
          <div>
            <strong>{clientes.length}</strong>
            <span>Clientes</span>
          </div>
        </div>
      </section>

      <section className="admin-grid">
        <form className="form-card admin-form" onSubmit={criarEvento}>
          <h2>Cadastrar evento</h2>

          <label>
            Artista
            <input
              required
              value={artista}
              onChange={(event) => setArtista(event.target.value)}
              placeholder="Ex.: Bruno Mars"
            />
          </label>

          <label>
            Foto do artista (URL)
            <input
              value={fotoArtista}
              onChange={(event) => setFotoArtista(event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            Data e hora
            <input
              required
              type="datetime-local"
              value={dataHora}
              onChange={(event) => setDataHora(event.target.value)}
            />
          </label>

          <label>
            Acesso
            <input
              value={acesso}
              onChange={(event) => setAcesso(event.target.value)}
              placeholder="Ex.: 16 anos"
            />
          </label>

          <label>
            Portão
            <input
              value={portao}
              onChange={(event) => setPortao(event.target.value)}
              placeholder="Ex.: Portão A"
            />
          </label>

          <label>
            Local
            <select
              required
              value={idLocal}
              onChange={(event) => setIdLocal(event.target.value)}
            >
              <option value="">Selecione um local</option>
              {locais.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.nome} — {local.cidade}
                </option>
              ))}
            </select>
          </label>

          <label>
            Administrador responsável
            <select
              required
              value={idAdmin}
              onChange={(event) => setIdAdmin(event.target.value)}
            >
              <option value="">Selecione um administrador</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.nome}
                </option>
              ))}
            </select>
          </label>

          <button className="button button-primary">
            Cadastrar evento
          </button>
        </form>

        <form className="form-card admin-form" onSubmit={criarLocal}>
          <h2>Cadastrar local</h2>

          <label>
            Nome do local
            <input
              required
              value={nomeLocal}
              onChange={(event) => setNomeLocal(event.target.value)}
              placeholder="Ex.: Arena do Grêmio"
            />
          </label>

          <label>
            Endereço
            <input
              required
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
              placeholder="Ex.: Av. Padre Leopoldo Brentano"
            />
          </label>

          <label>
            Número
            <input
              required
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              placeholder="Ex.: 110"
            />
          </label>

          <label>
            Cidade
            <input
              required
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              placeholder="Ex.: Porto Alegre"
            />
          </label>

          <label>
            Foto do local (URL)
            <input
              value={fotoLocal}
              onChange={(event) => setFotoLocal(event.target.value)}
              placeholder="https://..."
            />
          </label>

          <button className="button button-secondary">
            Cadastrar local
          </button>
        </form>
      </section>

      <section className="admin-table-section">
        <h2>Eventos cadastrados</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Artista</th>
                <th>Data</th>
                <th>Local</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.artista}</td>
                  <td>
                    {new Date(evento.data_hora).toLocaleString('pt-BR')}
                  </td>
                  <td>
                    {evento.local?.nome || '-'} / {evento.local?.cidade || '-'}
                  </td>
                  <td>{evento.admin?.nome || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}