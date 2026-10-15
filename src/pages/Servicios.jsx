import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Subtitulo from '../components/atoms/Subtitulo'
import Parrafo from '../components/atoms/Parrafo'
import Icono from '../components/atoms/Icono'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import ListaServicios from '../components/organisms/ListaServicios'
import servicios from '../data/servicios.json'
import { ICONOS_CATEGORIA, obtenerCategorias } from '../utils/categorias'
import { normalizar } from '../utils/texto'

// Página: el catálogo completo, agrupado por categoría y con buscador.
// El estado vive aquí; el buscador solo lo muestra y avisa cambios.
function Servicios() {
    const [texto, setTexto] = useState('');
    const [categoria, setCategoria] = useState('');

    const categorias = obtenerCategorias(servicios);

    // Deben cumplirse AMBOS filtros. El texto puede estar en el nombre o en la categoría.
    const buscado = normalizar(texto);
    const filtrados = servicios.filter(
        (s) =>
            (normalizar(s.nombre).includes(buscado) || normalizar(s.categoria).includes(buscado)) &&
            (categoria === '' || s.categoria === categoria),
    );

    return (
        <Container className="mt-5">
            <Subtitulo texto="Servicios y precios" clasesExtras="h3 mb-1" />
            <Parrafo clasesExtras="text-muted mb-4">
                Los precios son referenciales y se confirman al agendar tu hora.
            </Parrafo>

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