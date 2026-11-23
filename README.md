# Equipo TDA · Veterinaria San Marcos (React)

## Integrantes

- Andres Marin · andr.marin@duocuc.cl
- Thomas Araya · thom.araya@duocuc.cl
- Diego Bergeret · di.bergeret@duocuc.cl

## Caso

Veterinaria San Marcos (Forma A) · curso DSY1104 Desarrollo Fullstack II · Parcial 2

## Descripción del caso

Veterinaria San Marcos es una clínica de Rancagua que atiende perros, gatos, conejos y aves, y hoy gestiona sus citas en una agenda de papel.
La aplicación muestra los servicios de la clínica (consultas, vacunación, cirugía, desparasitación, exámenes y otros) y permite a los dueños registrarse, inscribir a sus mascotas y solicitar citas en línea.
El administrador gestiona servicios, categorías, usuarios y solicitudes desde un panel propio.
Las cuentas de usuario (registro, inicio de sesión y CRUD de usuarios del administrador) se guardan en el backend con Spring Boot y MySQL: https://github.com/diegobs7/veterinaria-san-marcos-backend
El resto de los datos (servicios, categorías, mascotas, citas, evaluaciones y mensajes) todavía se guarda en el navegador (localStorage); se pasarán al backend más adelante.
El mismo backend lo usa la app Android PocketTrack Kaiju; cada app solo ve sus propios usuarios.

## Estructura del proyecto

Los componentes están ordenados por Atomic Design; la lógica de datos vive fuera de `components`.

```
src/
├── components/
│   ├── atoms/          piezas mínimas (botón, campo, etiqueta, ícono...)
│   ├── molecules/      pocos átomos juntos (tarjeta de servicio, buscador...)
│   ├── organisms/      bloques de pantalla (barra de navegación, formularios, listas...)
│   └── templates/      esqueletos de página, sin datos
├── pages/              una por ruta
│   └── Admin/          páginas del panel de administración
├── services/           llamadas a la API (api.js, authService, usuarioService) y CRUD en localStorage (servicios, categorías, mascotas, citas)
├── dto/                cuerpos que se envían a la API (login y registro)
├── context/            estado compartido de los servicios (ServiciosContext)
├── data/               datos de partida (JSON) y opciones de formularios
├── utils/              funciones puras (precios, textos, códigos, reglas de solicitud)
│   └── validaciones/   validadores que devuelven el mensaje de error
├── Hooks/              hooks propios (por ejemplo, el título de cada página)
└── setupTests.js       configuración de las pruebas
```

## Tecnologías utilizadas

- React 19 y Vite
- React Router (rutas) y Bootstrap con React Bootstrap (diseño responsivo)
- Axios para llamar a la API del backend (token JWT en cada solicitud)
- localStorage para los datos que aún no pasan al backend; sessionStorage para la sesión
- Vitest, Testing Library y jsdom (pruebas unitarias y cobertura)
- oxlint (revisión de código)

## Cómo ejecutar el proyecto

Requisitos: Node.js (versión LTS) y el backend corriendo (ver su README).

1. Crear el archivo `.env` a partir de `.env.example` con la dirección de la API. No se sube a GitHub.
   ```
   VITE_API_URL=http://localhost:8080/api/v1
   ```
   La dirección debe ser accesible desde el **navegador** de quien usa la página: en la EC2 va la IP pública del backend.
2. Instalar y ejecutar:
   ```
   npm install
   npm run dev
   ```

Vite solo lee el `.env` al arrancar: si se cambia, hay que detener y volver a ejecutar `npm run dev`.
El backend debe permitir el origen de la página en `CORS_ORIGENES` (por defecto `http://localhost:5173`).

La aplicación queda en la dirección que muestra la terminal (normalmente http://localhost:5173).

Para generar la versión de producción: `npm run build`.

## Cómo probar el proyecto

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta las pruebas y queda vigilando los cambios |
| `npm run test:run` | Ejecuta todas las pruebas una vez |
| `npm run test:cov` | Ejecuta las pruebas y muestra el reporte de cobertura |

Hoy hay 93 pruebas en 22 archivos: 92 pasan y 1 falla a propósito (`src/utils/categorias.demo.test.js`). Cada archivo `.test.js` o `.test.jsx` está junto al código que prueba.

El documento de cobertura está en [`docs/COBERTURA.md`](docs/COBERTURA.md).

## Rutas y roles

| Quién | Rutas principales |
| --- | --- |
| Visitante | `/`, `/servicios`, `/servicios/:id`, `/categorias`, `/categorias/:slug`, `/ofertas`, `/nosotros`, `/blogs`, `/blogs/:id`, `/contacto`, `/evaluacion`, `/registro`, `/login` |
| Cliente (con sesión) | `/citas` (Mis citas) y `/perfil`; la solicitud de cita se hace desde el detalle de un servicio |
| Administrador | `/admin`, `/admin/servicios`, `/admin/categorias`, `/admin/usuarios`, `/admin/solicitudes`, `/admin/reportes` |

**Cómo entrar.**

- Cliente: crear una cuenta en `/registro` (el correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com; contraseña de al menos 8 caracteres). El backend le asigna el rol Cliente (`DUENO`).
- Administrador: el backend lo crea al arrancar con `ADMIN_EMAIL` y `ADMIN_PASSWORD` de su `.env`.

## Gestión de usuarios (administrador)

Desde `/admin/usuarios` el administrador gestiona las cuentas de la veterinaria a través del backend:

| Acción | Llamada a la API |
| --- | --- |
| Listar | `GET /usuarios` |
| Ver / editar | `GET /usuarios/{id}` y `PUT /usuarios/{id}` |
| Crear con rol | `POST /usuarios` |
| Cambiar rol | `PATCH /usuarios/{id}/rol` |
| Desactivar | `DELETE /usuarios/{id}` (la cuenta queda inactiva y no puede iniciar sesión) |
| Reactivar | `PATCH /usuarios/{id}/activar` |
| Eliminar | `DELETE /usuarios/{id}/eliminar` (solo para cuentas ya desactivadas) |

Roles en la página: Administrador (`ADMINISTRADOR`), Recepcionista (`RECEPCIONISTA`) y Cliente (`DUENO`).
Los nombres de la página se traducen a los del backend en `src/utils/usuarioMapper.js` y `src/utils/roles.js` (por ejemplo, `correo` ↔ `email` y `tipo` ↔ `rol`).
Los errores del backend (correo o RUT repetido, rol no permitido) se muestran bajo el campo que corresponde.

## Datos

Las cuentas de usuario están en la base de datos del backend. Los demás datos de partida están en `src/data` y los cambios quedan en localStorage (claves `servicios`, `categorias`, `mascotas`, `solicitudes`, `evaluaciones` y `mensajesContacto`); la sesión (token JWT y datos del usuario) queda en sessionStorage.
Para volver a los datos iniciales, borrar el almacenamiento del sitio desde las herramientas del navegador (Application → Clear site data).

## Trabajo en equipo

Se trabaja con una rama por integrante (`RamaAndres`, `RamaThom`, `RamaDiego`) que se une a `main` con Pull Request.

## Material complementario

Carpeta de Drive con los documentos del semestre (ERS V2, documento de cobertura y otros):
https://drive.google.com/drive/folders/134xFPeqdPwCJd2sjJ30z7a-os8IIasWA?usp=sharing
