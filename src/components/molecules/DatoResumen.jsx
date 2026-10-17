import Parrafo from '../atoms/Parrafo';

function DatoResumen(props) {
    return (
        <Parrafo clasesExtras={`mb-1 ${props.clasesExtras || ''}`}>
            <strong>{props.etiqueta}</strong> {props.valor}
        </Parrafo>
    );
}

export default DatoResumen;