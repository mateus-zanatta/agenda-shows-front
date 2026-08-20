import { FormEvent, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import type { Cliente } from '../types'

export function Cadastro() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function cadastrar(event: FormEvent) {
    event.preventDefault()
    setEnviando(true)
    setMensagem('')

    try {
      const response = await api.post<Cliente>('/clientes', {
        nome,
        email,
        senha
      })

      localStorage.setItem('clienteId', String(response.data.id))
      localStorage.setItem('clienteNome', response.data.nome)

      setMensagem('Cadastro realizado! Você já pode montar sua agenda.')

      setTimeout(() => {
        navigate('/')
      }, 1200)
    } catch {
      setMensagem('Não foi possível concluir o cadastro. Verifique o e-mail informado.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="container section">
      <div className="form-page">
        <div className="form-intro">
          <span className="eyebrow">SEU PERFIL</span>
          <h1>Crie sua conta</h1>
          <p>
            Cadastre-se para salvar shows, acompanhar sua agenda e não perder
            os próximos eventos.
          </p>
        </div>

        <form className="form-card" onSubmit={cadastrar}>
          <div className="form-icon">
            <UserPlus size={28} />
          </div>

          <label>
            Nome completo
            <input
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Elian Silva"
            />
          </label>

          <label>
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
            />
          </label>

          <label>
            Senha
            <input
              required
              minLength={4}
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Mínimo de 4 caracteres"
            />
          </label>

          <button className="button button-primary" disabled={enviando}>
            {enviando ? 'Criando conta...' : 'Criar conta'}
          </button>

          {mensagem && <p className="action-message">{mensagem}</p>}
        </form>
      </div>
    </main>
  )
}