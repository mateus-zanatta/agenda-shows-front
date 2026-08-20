export interface Local {
  id: number
  nome: string
  endereco: string
  numero: string
  cidade: string
  foto?: string | null
}

export interface Admin {
  id: number
  nome: string
  email: string
}

export interface Evento {
  id: number
  artista: string
  foto_artista?: string | null
  data_hora: string
  acesso?: string | null
  portao?: string | null
  id_local: number
  id_admin: number
  local?: Local
  admin?: Admin
}

export interface Cliente {
  id: number
  nome: string
  email: string
}

export interface Agenda {
  id: number
  id_cliente: number
  id_evento: number
  data_inclusao: string
  cliente?: Cliente
  evento?: Evento
}