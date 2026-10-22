import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BuscadorServicios from './BuscadorServicios'

describe('BuscadorServicios', () => {

  function dibujar() {
    const onTexto = vi.fn()
    const onCategoria = vi.fn()
    render(
      <BuscadorServicios
        texto=""
        onTexto={onTexto}
        categoria=""
        onCategoria={onCategoria}
        categorias={['Consultas', 'Cirugía']}
      />,
    )
    return { onTexto, onCategoria }
  }

  it('avisa al padre el texto que escribe la persona', async () => {
    const { onTexto } = dibujar()

    await userEvent.type(screen.getByLabelText('Buscar servicio por nombre'), 'v')

    expect(onTexto).toHaveBeenCalledWith('v')
  })

  it('ofrece una opción por categoría y avisa la que se elige', async () => {
    const { onCategoria } = dibujar()
    const selector = screen.getByLabelText('Filtrar por categoría')

    expect(screen.getAllByRole('option')).toHaveLength(3)

    await userEvent.selectOptions(selector, 'Cirugía')

    expect(onCategoria).toHaveBeenCalledWith('Cirugía')
  })
})