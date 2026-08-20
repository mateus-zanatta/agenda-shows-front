import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './src/components/Header'
import { AdminPage } from './src/pages/Admin'
import { Cadastro } from './src/pages/Cadastro'
import { DetalhesEvento } from './src/pages/DetalhesEvento'
import { Home } from './src/pages/Home'
import { MinhaAgenda } from './src/pages/MinhaAgenda'

export function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos/:id" element={<DetalhesEvento />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/minha-agenda" element={<MinhaAgenda />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}