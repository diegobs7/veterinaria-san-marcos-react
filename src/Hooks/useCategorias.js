import { useContext } from 'react'
import { CategoriasContexto } from '../context/categoriasContexto'

export function useCategorias() {
    const contexto = useContext(CategoriasContexto)
    if (!contexto) {
        throw new Error('useCategorias debe usarse dentro de un CategoriasProvider')
    }
    return contexto
}