import { useState } from 'react';
import { useParams } from 'react-router-dom';

import TemplateAdmin from '../components/templates/TemplateAdmin';
import Enlace from '../components/atoms/Enlace';
import Parrafo from '../components/atoms/Parrafo';
import EncabezadoAdmin from '../components/molecules/EncabezadoAdmin';
import FormularioProducto from '../components/organisms/FormularioProducto';
import { useServicios } from '../context/ServiciosContext';
import { useTituloPagina } from '../Hooks/useTituloPagina';
import validarProducto from '../utils/validaciones/ValidarProducto';


const VALORES_INICIALES = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: '',
    categoria: '',
    especie: '',
    duracion: '',
    imagen: '',
};

const texto = (valor) => (valor ?? '').toString();

function aValores(servicio) {
    return {
        nombre: servicio.titulo,
        descripcion: texto(servicio.descripcion),
        precio: texto(servicio.precio),
        stock: texto(servicio.stock),
        stockCritico: texto(servicio.stockCritico),
        categoria: servicio.categoria,
        especie: texto(servicio.especie),
        duracion: texto(servicio.duracion),
        imagen: texto(servicio.imagen),
    };
}

// Sirve para las dos rutas: /nuevo (sin id) y /:id/editar (con id).
function AdminProductoForm() {
    const { id } = useParams();
    const { obtener, crear, actualizar } = useServicios();
    const servicio = id ? obtener(id) : null;

    useTituloPagina(id ? 'Editar producto' : 'Nuevo producto');

    const [valores, setValores] = useState(servicio ? aValores(servicio) : VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');
    // Cambiar la key vuelve a dibujar el formulario y limpia el campo de archivo
    const [version, setVersion] = useState(0);

    if (id && !servicio) {
        return (
            <TemplateAdmin>
                <Parrafo clasesExtras="mb-3">Producto no encontrado.</Parrafo>
                <Enlace to="/admin/productos/listado" texto="← Volver al listado" />
            </TemplateAdmin>
        );
    }

    const manejarCambio = (campo) => (e) => {
        setValores({ ...valores, [campo]: e.target.value });
        setErrores({ ...errores, [campo]: '' });
        setMensaje('');
    };

    const manejarImagen = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) {
            return;
        }

        const mensajeImagen = validarFoto(archivo);
        if (mensajeImagen) {
            setErrores({ ...errores, imagen: mensajeImagen });
            return;
        }

        const lector = new FileReader();
        lector.onload = () => {
            setValores((actuales) => ({ ...actuales, imagen: lector.result }));
            setErrores((actuales) => ({ ...actuales, imagen: '' }));
            setMensaje('');
        };
        lector.readAsDataURL(archivo);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const nuevosErrores = validarProducto(valores);
        if (errores.imagen) {
            nuevosErrores.imagen = errores.imagen;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            setMensaje('');
            return;
        }

        const datos = {
            titulo: valores.nombre.trim(),
            descripcion: valores.descripcion.trim(),
            categoria: valores.categoria,
            especie: valores.especie,
            duracion: valores.duracion.trim(),
            precio: Number(valores.precio),
            stock: Number(valores.stock),
            stockCritico: valores.stockCritico === '' ? null : Number(valores.stockCritico),
            imagen: valores.imagen,
        };

        if (servicio) {
            actualizar(servicio.id, datos);
            setMensaje('Los cambios se guardaron correctamente.');
        } else {
            crear(datos);
            setValores(VALORES_INICIALES);
            setVersion(version + 1);
            setMensaje('El producto se guardó correctamente.');
        }
    };

    return (
        <TemplateAdmin>
            <EncabezadoAdmin
                titulo={servicio ? 'Editar producto' : 'Nuevo producto'}
                descripcion={
                    servicio && (
                        <>
                            Editando: <strong>{servicio.titulo}</strong> (código {servicio.codigo})
                        </>
                    )
                }
            />
            <FormularioProducto
                key={version}
                codigo={servicio?.codigo}
                valores={valores}
                errores={errores}
                onCambio={manejarCambio}
                onCambioImagen={manejarImagen}
                mensaje={mensaje}
                textoBoton={servicio ? 'Guardar cambios' : 'Guardar producto'}
                manejarSubmit={manejarSubmit}
            />
        </TemplateAdmin>
    );
}

export default AdminProductoForm;
