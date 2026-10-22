# Aprende Arquitectura Monolítica

Sitio educativo estático para conocer la arquitectura monolítica mediante explicaciones, diagramas, una comparación de estilos, un glosario y un cuestionario interactivo.

## Tecnologías

- HTML5 semántico, CSS3 y JavaScript puro.
- Bootstrap 5 y Bootstrap Icons desde CDN.
- Python 3 para servir los archivos localmente en Codespaces (sin backend).

## Estructura

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── img/
│   │   ├── arquitectura-monolitica.svg
│   │   └── arquitectura-microservicios.svg
├── video/
│   └── video.mp4
└── README.md
```

## Ejecutar en GitHub Codespaces

Desde la terminal integrada, en la carpeta del proyecto, ejecuta:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Abre la pestaña **Ports** de Codespaces y selecciona el puerto `8000` para abrir la página. Si no aparece automáticamente, usa **Add Port** y escribe `8000`. También puedes abrir `index.html` directamente, aunque el servidor local reproduce mejor el comportamiento esperado.

## Video complementario

El video está en `video/video.mp4` y se reproduce en la sección **Video**, accesible desde el menú superior. Para cambiarlo, reemplaza ese archivo manteniendo el mismo nombre o actualiza la ruta del elemento `<source>` en `index.html`.

## Imágenes

Las ilustraciones SVG de arquitectura están en `assets/img/` y se muestran en la sección de comparación. Puedes reemplazarlas conservando esos nombres de archivo o actualizar las rutas en `index.html`.

## Modificar las preguntas

Las 10 preguntas, sus cuatro alternativas, el índice de la respuesta correcta y la explicación se encuentran en el arreglo `questions` de `js/script.js`. Para agregar o modificar una pregunta, conserva esta estructura:

```js
{
    question: "Texto de la pregunta",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    answer: 0,
    explanation: "Explicación de la respuesta correcta."
}
```

`answer` es un índice desde `0` hasta `3`. El puntaje se calcula con las respuestas elegidas durante la evaluación.

## Visualizar desde un teléfono u otro dispositivo

La interfaz es responsiva y funciona en pantallas pequeñas. Con el servidor iniciado, abre en el dispositivo la URL de Codespaces que se muestra al hacer clic en el puerto `8000` (la URL pública/reenviada del puerto). Si se ejecuta localmente fuera de Codespaces, conecta ambos dispositivos a la misma red y abre `http://<IP-del-equipo>:8000`; permite el acceso al puerto en la red si el sistema lo solicita.
