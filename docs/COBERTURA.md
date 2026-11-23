# Documento de cobertura de pruebas

Proyecto: Veterinaria San Marcos (React + Vite). Herramienta: Vitest con cobertura V8 (`@vitest/coverage-v8`).

Fecha del reporte: 22-11-2026 (actualizado tras conectar los usuarios con el backend).

## Cómo generarlo

```bash
npm run test:cov
```

La configuración está en `vite.config.js` (`test.coverage`). Se mide `src/utils`, `src/components`, `src/services` y `src/context`. Se activó `reportOnFailure: true` para que el reporte se genere aunque falle la prueba intencional `src/utils/categorias.demo.test.js`.

Las pruebas de los servicios que llaman a la API (`api.js`, `authService.js`, `usuarioService.js`) no necesitan el backend encendido: simulan las respuestas de Axios.
El porcentaje de ramas de `api.js` puede variar levemente según exista o no el archivo `.env` con `VITE_API_URL`, porque cambia qué lado del valor por defecto se ejecuta.

## Resultado de las pruebas

- 93 pruebas en 22 archivos: 92 pasan y 1 falla a propósito (`categorias.demo.test.js`, espera `cirugia mayor` y `crearSlug` devuelve `cirugia-mayor`).
- Respecto del reporte anterior (63 pruebas en 16 archivos) se sumaron las pruebas de `api.js`, `apiErrores.js`, `authService.js`, `sesionAdmin.js`, de los DTO de autenticación (`src/dto/auth.dto.test.js`) y de `usuarioService.js` (9 pruebas del CRUD de usuarios contra la API simulada).

## Cobertura total

| Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- |
| 33.2 % | 24.4 % | 37.5 % | 33.4 % |

Antes: 26.7 % · 20.8 % · 32.4 % · 26.6 %.

## Cobertura por carpeta

| Carpeta | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- |
| `components/atoms` | 5.0 % | 4.9 % | 17.9 % | 5.7 % |
| `components/molecules` | 16.7 % | 7.1 % | 20.5 % | 15.9 % |
| `components/organisms` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `components/templates` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `context` | 95.2 % | 100.0 % | 90.0 % | 94.7 % |
| `services` | 65.7 % | 50.3 % | 71.9 % | 67.5 % |
| `utils` | 37.2 % | 42.6 % | 34.4 % | 38.3 % |
| `utils/validaciones` | 35.1 % | 41.4 % | 41.0 % | 36.0 % |

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
| `components/molecules/TarjetaServicio.jsx` | 100.0 % | 62.5 % | 100.0 % | 100.0 % |
| `context/ServiciosContext.jsx` | 95.2 % | 100.0 % | 90.0 % | 94.7 % |
| `services/api.js` | 100.0 % | 84.6 % | 100.0 % | 100.0 % |
| `services/apiErrores.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/authService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/categoriaService.js` | 70.1 % | 54.8 % | 84.0 % | 71.2 % |
| `services/citasService.js` | 92.8 % | 83.3 % | 100.0 % | 91.3 % |
| `services/contactoService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/evaluacionService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/servicioService.js` | 90.9 % | 64.3 % | 100.0 % | 92.8 % |
| `services/usuarioService.js` | 38.1 % | 17.3 % | 36.0 % | 40.7 % |
| `utils/categorias.js` | 9.5 % | 0.0 % | 10.0 % | 11.8 % |
| `utils/duracion.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/precios.js` | 66.7 % | 60.0 % | 66.7 % | 66.7 % |
| `utils/roles.js` | 100.0 % | 50.0 % | 100.0 % | 100.0 % |
| `utils/rut.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/sesionAdmin.js` | 94.1 % | 90.0 % | 100.0 % | 93.8 % |
| `utils/solicitudes.js` | 23.5 % | 5.9 % | 33.3 % | 25.0 % |
| `utils/texto.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/usuarioMapper.js` | 100.0 % | 77.3 % | 100.0 % | 100.0 % |
| `utils/validaciones/ValidarLogin_Registro.js` | 32.9 % | 31.1 % | 27.8 % | 34.2 % |
| `utils/validaciones/ValidarServicio.js` | 86.4 % | 82.8 % | 100.0 % | 94.1 % |
| `utils/validaciones/ValidarUsuario.js` | 90.9 % | 81.0 % | 100.0 % | 90.0 % |

`usuarioService.js` queda en 40.7 % de líneas porque sus funciones que llaman al backend (listar, buscar, crear, editar, cambiar rol, desactivar, reactivar y eliminar) sí tienen pruebas, pero las funciones antiguas que leen localStorage (`buscarUsuarioPorCorreo`, `buscarUsuarioPorRut`, `actualizarUsuario`) no. De ellas, solo `buscarUsuarioPorCorreo` se sigue usando (barra de navegación y reserva de citas); las otras dos se pueden borrar cuando todo pase al backend.

## Archivos sin pruebas automáticas

- `services/mascotaService.js` (0 %).
- Las páginas, organismos y plantillas (`components/organisms`, `components/templates`) y la mayoría de los átomos y moléculas.

## Análisis

- **Lo mejor cubierto:** la lógica de datos. El Context de servicios supera el 94 %; los services de citas, servicios, evaluaciones y contacto superan el 90 % de líneas; la conexión con el backend (`api.js`, `apiErrores.js`, `authService.js`) y la sesión (`sesionAdmin.js`) están sobre el 93 % de líneas; y el CRUD de usuarios de `usuarioService.js` tiene pruebas de cada llamada a la API y de los errores 409 (correo, RUT y rol propio). Las utilidades de usuarios (`roles.js`, `rut.js` y `usuarioMapper.js`) están al 100 % de líneas.
- **Lo menos cubierto:** las páginas, organismos y plantillas, que se revisaron con pruebas manuales en el navegador contra el backend (listar, crear, editar, cambiar rol, desactivar, reactivar y eliminar usuarios; registro con RUT repetido). Por eso el total general es bajo: la medición incluye todos los componentes visuales.
- **Siguientes pruebas recomendadas:** `mascotaService.js`, la función `recargar` del Context, `ValidarLogin_Registro.js` (login y registro), `utils/solicitudes.js` y `utils/categorias.js`.
