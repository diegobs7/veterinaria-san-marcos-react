# Documento de cobertura de pruebas

Proyecto: Veterinaria San Marcos (React + Vite). Herramienta: Vitest con cobertura V8 (`@vitest/coverage-v8`).

Fecha del reporte: 27-11-2026 (actualizado tras conectar el catálogo con el backend).

## Cómo generarlo

```bash
npm run test:cov
```

La configuración está en `vite.config.js` (`test.coverage`). Se mide `src/utils`, `src/components`, `src/services` y `src/context`. Se activó `reportOnFailure: true` para que el reporte se genere aunque falle la prueba intencional `src/utils/categorias.demo.test.js`.

Las pruebas de los servicios que llaman a la API (`api.js`, `authService.js`, `usuarioService.js`, `categoriaService.js`, `servicioService.js`) no necesitan el backend encendido: simulan las respuestas de Axios. Las de los providers simulan los services.
El porcentaje de ramas de `api.js` puede variar levemente según exista o no el archivo `.env` con `VITE_API_URL`, porque cambia qué lado del valor por defecto se ejecuta.

## Resultado de las pruebas

- 109 pruebas en 25 archivos: 108 pasan y 1 falla a propósito (`categorias.demo.test.js`, espera `cirugia mayor` y `crearSlug` devuelve `cirugia-mayor`).
- Respecto del reporte anterior (93 pruebas en 22 archivos):
  - `categoriaService.js` y `servicioService.js` se reescribieron contra la API simulada (8 pruebas cada uno: listar, obtener, 404, crear, 409, actualizar, eliminar y backend sin respuesta).
  - `ServiciosContext.jsx` se reemplazó por `ServiciosProvider.jsx` (6 pruebas) y se agregó `CategoriasProvider.jsx` (4 pruebas): carga, error, crear, actualizar y eliminar.
  - Nuevas pruebas de `utils/ofertas.js` (3), `utils/categorias.js` (2) y `TarjetaServicio.jsx` con y sin descuento (2).
  - `usuarioService.js` suma 2 pruebas (errores 400 del backend en su campo) y `authService.js` 1 (`verificarSesion`).
- Se borró `utils/codigos.js`: el código de los servicios ahora lo genera el backend.

## Cobertura total

| Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- |
| 35.2 % | 25.5 % | 41.2 % | 35.8 % |

Antes: 33.2 % · 24.4 % · 37.5 % · 33.4 %.

## Cobertura por carpeta

| Carpeta | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- |
| `components/atoms` | 5.0 % | 4.9 % | 17.9 % | 5.7 % |
| `components/molecules` | 15.5 % | 8.8 % | 20.0 % | 14.7 % |
| `components/organisms` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `components/templates` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `context` | 94.1 % | 100.0 % | 100.0 % | 93.9 % |
| `services` | 66.2 % | 48.5 % | 68.1 % | 68.5 % |
| `utils` | 58.8 % | 62.7 % | 60.0 % | 59.0 % |
| `utils/validaciones` | 35.1 % | 41.5 % | 41.0 % | 36.0 % |

## Archivos con pruebas

| Archivo | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- |
| `components/atoms/EtiquetaEspecie.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `components/atoms/Icono.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `components/atoms/Input.jsx` | 100.0 % | 83.3 % | 100.0 % | 100.0 % |
| `components/atoms/Parrafo.jsx` | 100.0 % | 50.0 % | 100.0 % | 100.0 % |
| `components/atoms/Selector.jsx` | 100.0 % | 66.7 % | 100.0 % | 100.0 % |
| `components/atoms/Subtitulo.jsx` | 100.0 % | 50.0 % | 100.0 % | 100.0 % |
| `components/molecules/BuscadorServicios.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `components/molecules/DatoResumen.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `components/molecules/TarjetaResumenAdmin.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `components/molecules/TarjetaServicio.jsx` | 100.0 % | 87.5 % | 100.0 % | 100.0 % |
| `context/CategoriasProvider.jsx` | 91.7 % | 100.0 % | 100.0 % | 91.3 % |
| `context/ServiciosProvider.jsx` | 96.0 % | 100.0 % | 100.0 % | 95.8 % |
| `services/api.js` | 100.0 % | 84.6 % | 100.0 % | 100.0 % |
| `services/apiErrores.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/authService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/categoriaService.js` | 83.3 % | 50.0 % | 100.0 % | 86.4 % |
| `services/citasService.js` | 92.8 % | 83.3 % | 100.0 % | 91.3 % |
| `services/contactoService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/evaluacionService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/servicioService.js` | 82.6 % | 50.0 % | 100.0 % | 85.7 % |
| `services/usuarioService.js` | 42.9 % | 27.8 % | 36.0 % | 45.2 % |
| `utils/categoriaMapper.js` | 100.0 % | 85.7 % | 100.0 % | 100.0 % |
| `utils/categorias.js` | 85.7 % | 100.0 % | 80.0 % | 91.7 % |
| `utils/duracion.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/ofertas.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/precios.js` | 88.9 % | 90.0 % | 100.0 % | 88.9 % |
| `utils/roles.js` | 100.0 % | 50.0 % | 100.0 % | 100.0 % |
| `utils/rut.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/servicioMapper.js` | 100.0 % | 68.2 % | 100.0 % | 100.0 % |
| `utils/sesionAdmin.js` | 94.1 % | 90.0 % | 100.0 % | 93.8 % |
| `utils/solicitudes.js` | 23.5 % | 5.9 % | 33.3 % | 25.0 % |
| `utils/texto.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/usuarioMapper.js` | 100.0 % | 77.3 % | 100.0 % | 100.0 % |
| `utils/validaciones/ValidarLogin_Registro.js` | 32.9 % | 31.1 % | 27.8 % | 34.2 % |
| `utils/validaciones/ValidarServicio.js` | 86.4 % | 82.8 % | 100.0 % | 94.1 % |
| `utils/validaciones/ValidarUsuario.js` | 90.9 % | 78.3 % | 100.0 % | 90.0 % |

`usuarioService.js` queda en 45.2 % de líneas porque sus funciones que llaman al backend sí tienen pruebas, pero las funciones antiguas que leen localStorage (`buscarUsuarioPorCorreo`, `buscarUsuarioPorRut`, `actualizarUsuario`) no. De ellas, solo `buscarUsuarioPorCorreo` se sigue usando (barra de navegación y reserva de citas); las otras dos se pueden borrar cuando todo pase al backend.

En `categoriaService.js` y `servicioService.js` las ramas quedan en 50 % porque no se prueba cada `catch` de crear, actualizar y eliminar por separado: el manejo de errores es el mismo (`crearErrorDeApi`) y se prueba con el 409 de crear y de eliminar.

## Archivos sin pruebas automáticas

- `services/mascotaService.js` (0 %).
- Las páginas, organismos y plantillas (`components/organisms`, `components/templates`) y la mayoría de los átomos y moléculas.

## Análisis

- **Lo mejor cubierto:** la lógica de datos.
  - Los providers del catálogo (`CategoriasProvider` y `ServiciosProvider`) superan el 91 % de líneas, con pruebas de carga, error del backend y recarga después de crear, actualizar y eliminar.
  - La conexión con el backend (`api.js`, `apiErrores.js`, `authService.js`) está al 100 % de líneas, y los services del catálogo superan el 85 %.
  - Las utilidades del catálogo y de usuarios (`ofertas.js`, los tres mappers, `roles.js`, `rut.js`) están al 100 % de líneas.
- **Lo menos cubierto:** las páginas, organismos y plantillas. Se revisaron con pruebas manuales en el navegador contra el backend:
  - Catálogo público: listado, filtros, categoría, detalle, ofertas y mensaje de error con el backend apagado.
  - CRUD de servicios y categorías del administrador, con sus 409.
  - CRUD de usuarios.

  Por eso el total general es bajo: la medición incluye todos los componentes visuales.
- **Siguientes pruebas recomendadas:** `mascotaService.js`, `ValidarLogin_Registro.js` (login y registro), `utils/solicitudes.js` y una prueba de página para `DetalleServicio.jsx` (carga, no encontrado y precio en oferta).