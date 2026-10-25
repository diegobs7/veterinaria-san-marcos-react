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
En esta versión los datos se guardan en el navegador (localStorage); el backend con Spring Boot y la base de datos son del Parcial 3.

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
├── services/           CRUD en localStorage (servicios, categorías, usuarios, mascotas, citas)
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
- localStorage y sessionStorage como almacenamiento simulado
- Vitest, Testing Library y jsdom (pruebas unitarias y cobertura)
- oxlint (revisión de código)

## Cómo ejecutar el proyecto

Requisito: Node.js (versión LTS).

```
npm install
npm run dev
```

La aplicación queda en la dirección que muestra la terminal (normalmente http://localhost:5173).

Para generar la versión de producción: `npm run build`.

## Cómo probar el proyecto

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta las pruebas y queda vigilando los cambios |
| `npm run test:run` | Ejecuta todas las pruebas una vez |
| `npm run test:cov` | Ejecuta las pruebas y muestra el reporte de cobertura |

Hoy hay 43 pruebas en 10 archivos. Cada archivo `.test.js` o `.test.jsx` está junto al código que prueba.

## Rutas y roles

| Quién | Rutas principales |
| --- | --- |
| Visitante | `/`, `/servicios`, `/servicios/:id`, `/categorias`, `/categorias/:slug`, `/ofertas`, `/nosotros`, `/blogs`, `/blogs/:id`, `/contacto`, `/evaluacion`, `/registro`, `/login` |
| Cliente (con sesión) | `/citas` (Mis citas) y `/perfil`; la solicitud de cita se hace desde el detalle de un servicio |
| Administrador | `/admin`, `/admin/servicios`, `/admin/categorias`, `/admin/usuarios`, `/admin/solicitudes`, `/admin/reportes` |

**Cómo entrar.**

- Cliente: crear una cuenta en `/registro` (el correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com).
- Administrador: usar el usuario de partida de `src/data/usuarios.json`.

## Datos

Los datos de partida están en `src/data` y los cambios quedan en localStorage (claves `servicios`, `categorias`, `usuarios`, `mascotas` y `solicitudes`); la sesión queda en sessionStorage.
Para volver a los datos iniciales, borrar el almacenamiento del sitio desde las herramientas del navegador (Application → Clear site data).

## Trabajo en equipo

Se trabaja con una rama por integrante (`RamaAndres`, `RamaThom`, `RamaDiego`) que se une a `main` con Pull Request.

## Material complementario

Carpeta de Drive con los documentos del semestre (ERS V2, documento de cobertura y otros):
[Carpeta de Drive del equipo](https://drive.google.com/drive/folders/1I1ChF_IqJwgaGxx6EkDyAtpXKsXHXyQX?usp=sharing)
