import Subtitulo from '../atoms/Subtitulo';
import EtiquetaEspecie from '../atoms/EtiquetaEspecie';
import DatoResumen from './DatoResumen';

function TarjetaMascota({ mascota }) {
    const textoEsterilizada = mascota.esterilizada === 'si' ? 'Sí' : 'No';

    return (
        <div className="card h-100 border rounded shadow-sm bg-white">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <Subtitulo 
                        nivel="h3" 
                        texto={mascota.nombre} 
                        clasesExtras="h5 fw-bold text-primary m-0" 
                    />
                    <EtiquetaEspecie especie={mascota.especie} />
                </div>

                <DatoResumen etiqueta="Raza:" valor={mascota.raza || "No especificada"} />
                <DatoResumen etiqueta="Sexo:" valor={mascota.sexo} />
                <DatoResumen etiqueta="Fecha de nacimiento:" valor={mascota.fechaNacimiento} />
                <DatoResumen etiqueta="Esterilizada:" valor={textoEsterilizada} />
                
                {mascota.comentario && (
                    <DatoResumen 
                        etiqueta="Comentario:" 
                        valor={mascota.comentario} 
                        clasesExtras="mt-2 text-secondary" 
                    />
                )}
            </div>
        </div>
    );
}

export default TarjetaMascota;