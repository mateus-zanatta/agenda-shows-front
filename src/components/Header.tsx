import { CalendarDays, LayoutDashboard, Music2, PlusCircle } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export function Header() {
  const clienteId = localStorage.getItem('clienteId')

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="brand">
          <Music2 size={28} />
          <span>ShowTime</span>
        </Link>

        <nav className="navigation">
          <NavLink to="/">Eventos</NavLink>

          {clienteId && (
            <NavLink to="/minha-agenda">
              <CalendarDays size={18} />
              Minha agenda
            </NavLink>
          )}

          <NavLink to="/cadastro">
            <PlusCircle size={18} />
            Cadastro
          </NavLink>

          <NavLink to="/admin">
            <LayoutDashboard size={18} />
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}