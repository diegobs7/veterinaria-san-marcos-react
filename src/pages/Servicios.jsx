import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Subtitulo from '../components/atoms/Subtitulo'
import Parrafo from '../components/atoms/Parrafo'
import Icono from '../components/atoms/Icono'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'
import { useServicios } from '../context/ServiciosContext'
import { useTituloPagina } from '../Hooks/useTituloPagina'
import { ICONOS_CATEGORIA, obtenerCategorias } from '../utils/categorias'
import { normalizar } from '../utils/texto'
import Enlace from '../components/atoms/Enlace'

function Servicios() {
    useTituloPagina('Servicios');

    const { servicios } = useServicios();
    const [texto, setTexto] = useState('');
    const [categoria, setCategoria] = useState('');

    const categorias = obtenerCategorias(servicios);

    const buscado = normalizar(texto);
    const filtrados = servicios.filter(
        (s) =>
            (normalizar(s.titulo).includes(buscado) || normalizar(s.categoria).includes(buscado)) &&
            (categoria === '' || s.categoria === categoria),
    );

    return (
        <Container className="mt-5">
            <Subtitulo texto="Servicios y precios" clasesExtras="h3 mb-1" />
            <Parrafo clasesExtras="text-muted mb-2">
                Los precios son referenciales y se confirman al agendar tu hora.
            </Parrafo>
             <div className="d-flex gap-3 mb-4">
                <Enlace to="/categorias" texto="Ver por categorías" />
                <Enlace to="/ofertas" texto="Ver ofertas" />
            </div>

            <BuscadorServicios
                texto={texto}
                onTexto={setTexto}
                categoria={categoria}
                onCategoria={setCategoria}
                categorias={categorias}
            />

            {filtrados.length === 0 && (
                <p role="status">No encontramos servicios con esos filtros. Prueba con otra palabra.</p>
            )}

            {categorias.map((nombreCategoria) => {
                const deEstaCategoria = filtrados.filter((s) => s.categoria === nombreCategoria);
                if (deEstaCategoria.length === 0) return null;
                return (
                    <section key={nombreCategoria} className="mb-5">
                        <h3 className="h5 mb-3">
                            <Icono simbolo={ICONOS_CATEGORIA[nombreCategoria] ?? '🐾'} />
                            {nombreCategoria}
                        </h3>
                        <ListaServicios servicios={deEstaCategoria} />
                    </section>
                );
            })}
        </Container>
    );
}

export default Servicios;