import Enlace from '../atoms/Enlace';

function TablaAdmin(props) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle bg-white tabla-admin">
                <caption className="caption-top fw-bold text-body">{props.titulo}</caption>
                <thead>
                    <tr>
                        {props.columnas.map((columna) => (
                            <th scope="col" key={columna}>{columna}</th>
                        ))}
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.filas.length === 0 && (
                        <tr>
                            <td colSpan={props.columnas.length + 1} className="text-center text-muted">
                                No hay registros para mostrar.
                            </td>
                        </tr>
                    )}

                    {props.filas.map((fila) => (
                        <tr key={fila.id}>
                            {fila.celdas.map((celda, indice) => (
                                <td key={indice}>{celda}</td>
                            ))}
                            <td>
                                <Enlace to={fila.to} texto="Editar" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaAdmin;
