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
  // "Base de datos" falsa en memoria: los mocks la leen y la modifican,
  // así la prueba revisa lo que hace el Context y no un valor fijado de antemano
  let baseDatos

  beforeEach(() => {
    vi.clearAllMocks()
    baseDatos = [...SERVICIOS_MOCK]

    mockListar.mockImplementation(() => [...baseDatos])
    mockCrear.mockImplementation((datos) => {
      const nuevo = { id: 'sv-nuevo', ...datos }
      baseDatos = [...baseDatos, nuevo]
      return nuevo
    })
    mockActualizar.mockImplementation((id, cambios) => {
      baseDatos = baseDatos.map((s) => (s.id === id ? { ...s, ...cambios } : s))
      return baseDatos.find((s) => s.id === id)
    })
    mockEliminar.mockImplementation((id) => {
      baseDatos = baseDatos.filter((s) => s.id !== id)
      return true
    })
    mockRestablecer.mockImplementation(() => {
      baseDatos = [...SERVICIOS_MOCK]
    })
  })

  // Comprueba que el Context volvió a leer la lista DESPUÉS de llamar al service
  function releyoDespuesDe(mockAccion) {
    const ordenAccion = mockAccion.mock.invocationCallOrder[0]
    const ordenUltimaLectura = mockListar.mock.invocationCallOrder.at(-1)
    return ordenUltimaLectura > ordenAccion
  }

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

  it('obtener busca por id dentro de la lista del Context', () => {
    function ConsumidorObtener() {
      const { obtener } = useServicios()
      return (
        <div>
          <p data-testid="existe">{obtener('sv001')?.titulo ?? 'no-encontrado'}</p>
          <p data-testid="no-existe">{obtener('sv999')?.titulo ?? 'no-encontrado'}</p>
        </div>
      )
    }

    render(
      <ServiciosProvider>
        <ConsumidorObtener />
      </ServiciosProvider>,
    )

    expect(screen.getByTestId('existe').textContent).toBe('Consulta general')
    expect(screen.getByTestId('no-existe').textContent).toBe('no-encontrado')
    // obtener no vuelve a llamar al service: usa la lista que ya tiene el Context
    expect(mockListar).toHaveBeenCalledTimes(1)
  })

  it('crear envía los datos al service y vuelve a leer la lista', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('crear').click()
    })

    expect(mockCrear).toHaveBeenCalledTimes(1)
    expect(mockCrear).toHaveBeenCalledWith({ titulo: 'Nuevo' })
    expect(releyoDespuesDe(mockCrear)).toBe(true)
    expect(screen.getByTestId('total').textContent).toBe('2')
  })

  it('actualizar envía el id correcto y los cambios, y vuelve a leer la lista', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('actualizar').click()
    })

    expect(mockActualizar).toHaveBeenCalledTimes(1)
    expect(mockActualizar).toHaveBeenCalledWith('sv001', { titulo: 'Editado' })
    expect(releyoDespuesDe(mockActualizar)).toBe(true)
    expect(screen.getByTestId('primero').textContent).toBe('Editado')
  })

  it('eliminar envía el id correcto y vuelve a leer la lista', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('eliminar').click()
    })

    expect(mockEliminar).toHaveBeenCalledTimes(1)
    expect(mockEliminar).toHaveBeenCalledWith('sv001')
    expect(releyoDespuesDe(mockEliminar)).toBe(true)
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('restablecer llama al service y vuelve a leer la lista', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )

    act(() => {
      screen.getByText('eliminar').click()
    })
    expect(screen.getByTestId('total').textContent).toBe('0')

    act(() => {
      screen.getByText('restablecer').click()
    })

    expect(mockRestablecer).toHaveBeenCalledTimes(1)
    expect(releyoDespuesDe(mockRestablecer)).toBe(true)
    expect(screen.getByTestId('total').textContent).toBe('1')
  })

  it('useServicios fuera del provider lanza error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Consumidor />)).toThrow(
      /useServicios debe usarse dentro de un ServiciosProvider/,
    )

    spy.mockRestore()
  })
})