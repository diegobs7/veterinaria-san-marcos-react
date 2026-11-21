import Subtitulo from '../atoms/Subtitulo';
import EtiquetaEspecie from '../atoms/EtiquetaEspecie';
import DatoResumen from './DatoResumen';

function TarjetaMascota(props) {
    const textoEsterilizada = props.mascota.esterilizada === 'si' ? 'Sí' : 'No';

    return (
        <div className="card h-100 border rounded shadow-sm bg-white">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <Subtitulo 
                        nivel="h3" 
                        texto={props.mascota.nombre} 
                        clasesExtras="h5 fw-bold text-primary m-0" 
                    />
                    <EtiquetaEspecie especie={props.mascota.especie} />
                </div>

                <DatoResumen etiqueta="Raza:" valor={props.mascota.raza || "No especificada"} />
                <DatoResumen etiqueta="Sexo:" valor={props.mascota.sexo} />
                <DatoResumen etiqueta="Fecha de nacimiento:" valor={props.mascota.fechaNacimiento} />
                <DatoResumen etiqueta="Esterilizada:" valor={textoEsterilizada} />
                
                {props.mascota.comentario && (
                    <DatoResumen 
                        etiqueta="Comentario:" 
                        valor={props.mascota.comentario} 
                        clasesExtras="mt-2 text-secondary" 
                    />
                )}
            </div>
        </div>
    );
}

export default TarjetaMascota;