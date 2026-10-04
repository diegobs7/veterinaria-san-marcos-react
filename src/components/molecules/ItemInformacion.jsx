import Icono from '../atoms/Icono';
import Parrafo from '../atoms/Parrafo';

function ItemInformacion(props) {
    return(
        <div className="mb-2">
            <Parrafo clasesExtra="mb-0">
                <span className="d-inline-block me-2">
                    <Icono simbolo = {props.icono}/>
                </span>
                {props.texto}
            </Parrafo>
        </div>
    );
}

export default ItemInformacion;