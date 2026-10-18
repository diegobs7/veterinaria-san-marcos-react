import TemplateEvaluacion from '../components/templates/TemplateEvaluacion';
import { useTituloPagina } from '../Hooks/useTituloPagina';

function Evaluacion() {
    useTituloPagina("Evaluar atencion");

    return <TemplateEvaluacion />;
}

export default Evaluacion;