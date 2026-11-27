import { useEffect, useState } from 'react'
import { CategoriasContexto } from './categoriasContexto'
import * as categoriaService from '../services/categoriaService'

// Carga las categorías desde el backend y las comparte con toda la app
export function CategoriasProvider(props) {
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    async function recargar() {
        try {
            setCategorias(await categoriaService.listarCategorias())
            setError('')
        } catch (e) {
            setError(e.message)
        } finally {
            setCargando(false)
        }
    }

    // Carga inicial. Los setState van dentro de .then/.catch, cuando responde el backend
    useEffect(() => {
        categoriaService.listarCategorias()
            .then((lista) => setCategorias(lista))
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false))
    }, [])

    async function crear(valores) {
        const nueva = await categoriaService.crearCategoria(valores)
        await recargar()
        return nueva
    }

    async function actualizar(id, valores) {
        const actualizada = await categoriaService.actualizarCategoria(id, valores)
        await recargar()
        return actualizada
    }

    async function eliminar(id) {
        await categoriaService.eliminarCategoria(id)
        await recargar()
    }

    function obtener(id) {
        return categorias.find((c) => c.id === String(id)) ?? null
    }

    return (
        <CategoriasContexto.Provider
            value={{ categorias, cargando, error, obtener, crear, actualizar, eliminar, recargar }}
        >
            {props.children}
        </CategoriasContexto.Provider>
    )
}