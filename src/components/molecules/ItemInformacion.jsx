import Icono from '../atoms/Icono';
import Parrafo from '../atoms/Parrafo';

function ItemInformacion(props) {
    return(
        <div className="d-flex align-items-center mb-2">
            <Icono simbolo = {props.icono}/>
            <Parrafo clasesExtra="mb-0 text-muted">
                {props.texto}
            </Parrafo>
        </div>
    );
}

export default ItemInformacion;