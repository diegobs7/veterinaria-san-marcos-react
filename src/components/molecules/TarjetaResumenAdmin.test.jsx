import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TarjetaResumenAdmin from './TarjetaResumenAdmin'

describe('TarjetaResumenAdmin', () => {
  it('muestra título, datos y un acceso al módulo', () => {
    render(
      <MemoryRouter>
        <TarjetaResumenAdmin
          titulo="Catálogo"
          descripcion="Gestiona el catálogo."
          datos={[{ etiqueta: 'Servicios publicados:', valor: 12 }]}
          to="/admin/productos"
          textoEnlace="Ir a Producto"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Catálogo')).toBeInTheDocument()
    expect(screen.getByText('Servicios publicados:')).toBeInTheDocument()
    expect(screen.getByText('12', { exact: false })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ir a Producto' })).toHaveAttribute('href', '/admin/productos')
  })
})
