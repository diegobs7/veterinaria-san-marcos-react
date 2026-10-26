import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ServiciosProvider, useServicios } from './ServiciosContext'

const mockListar = vi.fn()
const mockCrear = vi.fn()
const mockActualizar = vi.fn()
const mockEliminar = vi.fn()
const mockRestablecer = vi.fn()

vi.mock('../services/servicioService', () => ({
  listarServicios: (...args) => mockListar(...args),
  crearServicio: (...args) => mockCrear(...args),
  actualizarServicio: (...args) => mockActualizar(...args),
  eliminarServicio: (...args) => mockEliminar(...args),
  restablecerServicios: (...args) => mockRestablecer(...args),
}))

const SERVICIOS_MOCK = [
  {
    id: 'sv001',
    codigo: 'SV001',
    titulo: 'Consulta general',
    categoria: 'Consultas',
    precio: 15000,
  },
]


function Consumidor() {
  const { servicios, obtener, crear, actualizar, eliminar, restablecer } = useServicios()

  return (
    <div>
      <p data-testid="total">{servicios.length}</p>
      <p data-testid="primero">{servicios[0]?.titulo ?? 'ninguno'}</p>
      <p data-testid="obtener">{obtener('sv001')?.titulo ?? 'no-encontrado'}</p>
      <button type="button" onClick={() => crear({ titulo: 'Nuevo' })}>
        crear
      </button>
      <button type="button" onClick={() => actualizar('sv001', { titulo: 'Editado' })}>
        actualizar
      </button>
      <button type="button" onClick={() => eliminar('sv001')}>
        eliminar
      </button>
      <button type="button" onClick={() => restablecer()}>
        restablecer
      </button>
    </div>
  )
}

describe('ServiciosContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockListar.mockReturnValue([...SERVICIOS_MOCK])
    mockCrear.mockImplementation((datos) => ({ id: 'sv-nuevo', ...datos }))
    mockActualizar.mockImplementation((id, cambios) => ({ id, ...cambios }))
    mockEliminar.mockReturnValue(true)
    mockRestablecer.mockImplementation(() => {})
  })

  it('provee la lista inicial de servicios desde el service', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    expect(mockListar).toHaveBeenCalled()
    expect(screen.getByTestId('total').textContent).toBe('1')
    expect(screen.getByTestId('primero').textContent).toBe('Consulta general')
  })

  it('obtener devuelve el servicio por id', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    expect(screen.getByTestId('obtener').textContent).toBe('Consulta general')
  })

  it('crear llama al service y refresca la lista', () => {
    mockListar
      .mockReturnValueOnce([...SERVICIOS_MOCK])
      .mockReturnValueOnce([
        ...SERVICIOS_MOCK,
        { id: 'sv-nuevo', titulo: 'Nuevo' },
      ])

    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('crear').click()
    })

    expect(mockCrear).toHaveBeenCalledWith({ titulo: 'Nuevo' })
    expect(mockListar.mock.calls.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByTestId('total').textContent).toBe('2')
  })

  it('actualizar llama al service y refresca la lista', () => {
    mockListar
      .mockReturnValueOnce([...SERVICIOS_MOCK])
      .mockReturnValueOnce([{ ...SERVICIOS_MOCK[0], titulo: 'Editado' }])

    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('actualizar').click()
    })

    expect(mockActualizar).toHaveBeenCalledWith('sv001', { titulo: 'Editado' })
    expect(screen.getByTestId('primero').textContent).toBe('Editado')
  })

  it('eliminar llama al service y refresca la lista', () => {
    mockListar
      .mockReturnValueOnce([...SERVICIOS_MOCK])
      .mockReturnValueOnce([])

    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('eliminar').click()
    })

    expect(mockEliminar).toHaveBeenCalledWith('sv001')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('restablecer llama al service y refresca la lista', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('restablecer').click()
    })

    expect(mockRestablecer).toHaveBeenCalled()
    expect(mockListar.mock.calls.length).toBeGreaterThanOrEqual(2)
  })

  it('useServicios fuera del provider lanza error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Consumidor />)).toThrow(
      /useServicios debe usarse dentro de un ServiciosProvider/,
    )

    spy.mockRestore()
  })
})