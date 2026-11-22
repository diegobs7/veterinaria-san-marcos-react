# Documento de cobertura de pruebas

Proyecto: Veterinaria San Marcos (React + Vite). Herramienta: Vitest con cobertura V8 (`@vitest/coverage-v8`).

Fecha del reporte: 22-11-2026.

## Cómo generarlo

```bash
npm run test:cov
```

La configuración está en `vite.config.js` (`test.coverage`). Se mide `src/utils`, `src/components`, `src/services` y `src/context`. Se activó `reportOnFailure: true` para que el reporte se genere aunque falle la prueba intencional `src/utils/categorias.demo.test.js`.

## Resultado de las pruebas

- 57 pruebas en 14 archivos: 56 pasan y 1 falla a propósito (`categorias.demo.test.js`, espera `cirugia mayor` y `crearSlug` devuelve `cirugia-mayor`).

## Cobertura total

| Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- |
| 26.2 % | 19.3 % | 31.1 % | 26.1 % |

## Cobertura por carpeta

| Carpeta | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- |
| `components/atoms` | 5.0 % | 4.9 % | 17.9 % | 5.7 % |
| `components/molecules` | 16.7 % | 7.1 % | 20.5 % | 15.9 % |
| `components/organisms` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `components/templates` | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| `context` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services` | 55.3 % | 39.6 % | 63.9 % | 56.2 % |
| `utils` | 17.6 % | 20.0 % | 14.0 % | 18.6 % |
| `utils/validaciones` | 34.8 % | 42.0 % | 41.0 % | 35.7 % |

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
| `context/ServiciosContext.jsx` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/categoriaService.js` | 70.1 % | 54.8 % | 84.0 % | 71.2 % |
| `services/citasService.js` | 92.8 % | 83.3 % | 100.0 % | 91.3 % |
| `services/contactoService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/evaluacionService.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `services/servicioService.js` | 90.9 % | 64.3 % | 100.0 % | 92.8 % |
| `utils/categorias.js` | 9.5 % | 0.0 % | 10.0 % | 11.8 % |
| `utils/duracion.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/precios.js` | 66.7 % | 60.0 % | 66.7 % | 66.7 % |
| `utils/solicitudes.js` | 23.5 % | 5.9 % | 33.3 % | 25.0 % |
| `utils/texto.js` | 100.0 % | 100.0 % | 100.0 % | 100.0 % |
| `utils/validaciones/ValidarLogin_Registro.js` | 32.5 % | 32.2 % | 27.8 % | 33.8 % |
| `utils/validaciones/ValidarServicio.js` | 86.4 % | 82.8 % | 100.0 % | 94.1 % |
| `utils/validaciones/ValidarUsuario.js` | 90.9 % | 81.0 % | 100.0 % | 90.0 % |

## Análisis

- **Lo mejor cubierto:** la lógica de datos. El Context de servicios llega al 100 %, y los services de citas, servicios, evaluaciones y contacto superan el 90 % de líneas. Las validaciones de servicio y usuario superan el 90 %.
- **Lo menos cubierto:** las páginas, organismos y plantillas (`components/organisms`, `components/templates`), que se revisaron con pruebas manuales en el navegador. Por eso el total general es bajo: la medición incluye todos los componentes visuales.
- **Siguientes pruebas recomendadas:** `ValidarLogin_Registro.js` (login y registro), `utils/solicitudes.js` y `utils/categorias.js`, que tienen lógica y hoy están bajo el 35 %.
