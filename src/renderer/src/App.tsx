import { QueryClientProvider } from '@tanstack/react-query'
import { queryCliente } from './lib/react-query'

import { Routes } from './Routes'

import './styles/global.css'

export function App() {
  return (
    <QueryClientProvider client={queryCliente}>
      <Routes />
    </QueryClientProvider>
  )
}
