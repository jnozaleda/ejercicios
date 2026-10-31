# Volver a ti. — Recuperación posparto

Miniweb interactiva, móvil y de escritorio, para acompañar las 12 primeras semanas tras un parto vaginal sin puntos ni complicaciones.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `volver-a-ti`.
2. Sube a la **raíz** del repositorio `index.html`, `rutina.html`, `app.js`, `compartido.css`, `datos-posparto.js` y `datos-rutina.js`.
3. En **Settings → Pages**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`. Guarda.
4. GitHub mostrará el enlace de tu web, normalmente `https://TU_USUARIO.github.io/volver-a-ti/`.
5. Comparte esa URL por WhatsApp.

No necesitas Node, instalación de dependencias, servidor, base de datos ni clave de API. Para probarlo en local, sirve la carpeta con un servidor sencillo (`python3 -m http.server`) y abre la página en el navegador.

## Estructura

- `index.html` + `datos-posparto.js`: programa posparto.
- `rutina.html` + `datos-rutina.js`: rutina de 15 minutos en casa, sin material.
- `app.js` + `compartido.css`: navegación, pantallas, ficha de ejercicio y progreso comunes a ambos.

El contenido de cada programa vive en su archivo de datos. Cada uno tiene su enlace y guarda su progreso por separado.

## Funciones

- Semana actual calculada automáticamente según la fecha del parto (editable en **Cuidados**).
- Checklist diaria (sin metas obligatorias).
- Plan semana a semana y biblioteca de ejercicios con explicaciones.
- Alertas de seguridad, revisión posparto y fuentes clínicas enlazadas.
- Progreso guardado en `localStorage` del navegador, sin cuentas ni analítica.
- Exportación e importación manual de la checklist (`.json`).
- Adaptada a móvil con navegación inferior.

**Importante:** cada navegador/dispositivo guarda su propio progreso. Compartir la URL no comparte la checklist; para transferir datos utiliza **Cuidados → Descargar progreso / Importar progreso**. Borrar los datos del navegador elimina la checklist local.

## Limitaciones médicas

Es una orientación general para parto vaginal no complicado, no una prescripción ni un sustituto de la valoración médica. No se deben forzar los ejercicios. Si hay dolor, pérdidas de orina, pesadez vaginal, aumento del sangrado o fatiga marcada, hay que reducir la actividad y consultar. Los síntomas graves descritos en la app requieren atención urgente. La vuelta al impacto no se decide solo por el número de semanas transcurridas.

Fuentes: [ACOG](https://www.acog.org/womens-health/faqs/exercise-after-pregnancy), [NHS](https://www.nhs.uk/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/), [UCLH](https://www.uclh.nhs.uk/patients-and-visitors/patient-information-pages/advice-and-exercise-following-childbirth).
