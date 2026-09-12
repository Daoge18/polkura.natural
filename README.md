# Polkura Natural

Sitio web estático listo para publicar en GitHub Pages o en cualquier hosting.

## Estructura

- `index.html`: contenido principal.
- `styles.css`: diseño adaptable a celular y computador.
- `app.js`: interacciones, bitácora local y generación del código QR.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube los cuatro archivos de esta carpeta a la raíz del repositorio.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama **main**, la carpeta **/(root)** y presiona **Save**.
6. Espera unos minutos y GitHub mostrará la dirección pública.

El código QR de la página detecta automáticamente esa dirección, por lo que no es necesario modificar el código después de publicarlo.

## Otro hosting

Sube los archivos a la carpeta pública o raíz del sitio. No requiere instalación, servidor, base de datos ni proceso de compilación.

## Nota sobre la bitácora

Los hallazgos se guardan en el almacenamiento local del navegador. Cada dispositivo conserva sus propios registros; no se comparten automáticamente entre teléfonos o computadores.
