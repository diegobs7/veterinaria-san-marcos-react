import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaServicio from './TarjetaServicio'

function dibujar(servicio) {
  return render(
    <MemoryRouter>
      <TarjetaServicio servicio={servicio} />
    </MemoryRouter>,
  )
}

const servicio = {
  id: 'sv002',
  titulo: 'Consulta urgencia',
  categoria: 'Consultas',
  especie: 'Perro / Gato',
  duracion: '30 min',
  precio: 25000,
  observaciones: 'Fuera de horario +$10.000',
}

describe('TarjetaServicio', () => {
  it('muestra el título, la especie, la duración y el precio formateado', () => {
    dibujar(servicio)

    expect(screen.getByText('Consulta urgencia')).toBeInTheDocument()
    expect(screen.getByText('Perro / Gato')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
    expect(screen.getByText('$25.000')).toBeInTheDocument()
  })

  it('muestra las observaciones solo cuando el servicio las tiene', () => {
    const { unmount } = dibujar(servicio)
    expect(screen.getByText('Fuera de horario +$10.000')).toBeInTheDocument()
    unmount()

    dibujar({ ...servicio, observaciones: null })
    expect(screen.queryByText('Fuera de horario +$10.000')).not.toBeInTheDocument()
  })

  it('enlaza al detalle del servicio', () => {
    dibujar(servicio)

    expect(screen.getByRole('link', { name: /ver detalle de consulta urgencia/i })).toHaveAttribute(
      'href',
      '/servicios/sv002',
    )
  })

    it('muestra el descuento y el precio rebajado si el servicio está en oferta', () => {
    dibujar({ ...servicio, precio: 12000, descuento: 10 })

    expect(screen.getByText('-10%')).toBeInTheDocument()
    expect(screen.getByText('$12.000')).toBeInTheDocument() // precio normal, el que aparece tachado
    expect(screen.getByText('$10.800')).toBeInTheDocument()
  })

  it('no muestra descuento si el backend lo envía como null', () => {
    dibujar({ ...servicio, descuento: null })

    expect(screen.queryByText(/-null%/)).not.toBeInTheDocument()
    expect(screen.getByText('$25.000')).toBeInTheDocument()
  })
})