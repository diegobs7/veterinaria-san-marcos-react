import { useState } from 'react';
import Subtitulo from '../atoms/Subtitulo';
import Boton from '../atoms/Boton';
import Parrafo from '../atoms/Parrafo';
import CampoCalificacion from '../molecules/CampoCalificacion';
import CampoTextArea from '../molecules/CampoTextArea';
import ValidarEvaluacion from '../../utils/validaciones/ValidarEvaluacion';
import { ETIQUETAS_CALIFICACION } from '../../data/OpcionesEvaluacion';

const VALORES_INICIALES = {
    calificacion: 0,
    comentario: ''
};

function FormularioEvaluacion() {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [mensajeEvaluacion, setMensajeEvaluacion] = useState('');

    const cambiarValor = (campo, valor) => {
        setValores({ ...valores, [campo]: valor });
        setErrores({ ...errores, [campo]: '' });
        setMensajeEvaluacion('');
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const erroresValidacion = ValidarEvaluacion(valores);
        setErrores(erroresValidacion);

        if (Object.keys(erroresValidacion).length === 0) {
            setMensajeEvaluacion("¡Gracias por evaluar nuestra atención!");
            setValores(VALORES_INICIALES);
        } else {
            setMensajeEvaluacion('');
        }
    };

    return (
        <form
            className="p-4 border rounded shadow-sm bg-light"
            onSubmit={manejarSubmit}
            noValidate
        >
            <Subtitulo nivel="h2" texto="Evalúa nuestra atención" clasesExtras="h4 mb-4" />

            <CampoCalificacion
                textoLabel="¿Cómo fue tu atención?"
                value={valores.calificacion}
                onChange={(n) => cambiarValor('calificacion', n)}
                etiquetas={ETIQUETAS_CALIFICACION}
                mensajeError={errores.calificacion}
            />

            <CampoTextArea
                id="comentario"
                textoLabel="Comentario(opcional)"
                placeholder="Cuéntanos cómo fue tu experiencia en la clínica"
                rows={4}
                value={valores.comentario}
                onChange={(e) => cambiarValor('comentario', e.target.value)}
                error={errores.comentario}
                mensajeError={errores.comentario}
            />

            <Boton texto="Enviar evaluación" tipoBoton="submit" />

            {mensajeEvaluacion && (
                <Parrafo clasesExtras="text-success fw-bold mt-3">
                    {mensajeEvaluacion}
                </Parrafo>
            )}
        </form>
    );
}

export default FormularioEvaluacion;