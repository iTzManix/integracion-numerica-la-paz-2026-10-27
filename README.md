# Integración numérica aplicada a La Paz

Resolución de los ejercicios 19 a 27 de la guía proporcionada, página estática y calculadora numérica reproducible.

## Abrir la página

Abrir `index.html` en un navegador. No necesita instalación, servidor ni conexión a internet. Las descargas, los gráficos y los cálculos usan archivos locales. También puede servirse esta carpeta con cualquier servidor HTTP estático.

## Contenido de la entrega

| Archivo | Contenido |
| --- | --- |
| `resolucion-ejercicios.md` | Desarrollo completo en primera persona, nodos, pesos, sustituciones, errores y tabla final. |
| `resolucion-ejercicios.pdf` | Versión PDF del mismo desarrollo. |
| `informe-tecnico.md` | Texto del informe resumido. |
| `informe-tecnico.pdf` | Informe técnico de dos páginas. |
| `index.html`, `styles.css`, `app.js` | Página estática adaptable a móvil y escritorio. |
| `integration.js` | Métodos numéricos, validaciones y analizador de funciones. |
| `datos-ejercicios.json` | Datos suministrados por la guía y parámetros de funciones. |
| `tests.js`, `pruebas.json`, `evidencia-pruebas.md` | Pruebas automáticas y resultados reales. |
| `verificacion-web.md`, `verificacion-web.json`, `evidencias/` | Pruebas de navegador y capturas de la página. |
| `PUBLICACION.md`, `publicar.ps1` | Estado de publicación e instrucciones reproducibles para GitHub Pages. |

## Probar los algoritmos

Con Node.js instalado, ejecutar:

```sh
node tests.js
```

No se necesitan paquetes externos. Las pruebas usan el mismo módulo que la página. Incluyen x² en [0,2], exactitud cúbica de Simpson, resultados de la guía, conversiones y entradas inválidas. La comparación de n = 4 y n = 8 se aplica a los ejercicios con función; no se inventan nuevos datos tabulados para refinar una tabla original.

## Alcance de los resultados

Los escenarios paceños son adaptaciones didácticas. El ejercicio 21 usa las coordenadas ilustrativas del documento, sin afirmar una digitalización propia. El ejercicio 26 carece de mapa y anchuras: se deja planteado, sin un resultado numérico fabricado. El ejercicio 27 distingue la fórmula simplificada de superficie del área que incorpora la pendiente. La aplicación usa aritmética de doble precisión; en cantidades del orden de 10⁹, el último decimal mostrado puede variar por redondeo numérico.

## GitHub Pages

La raíz de esta carpeta contiene `index.html` y `.nojekyll`, por lo que puede publicarse desde la rama `main`, carpeta `/`. `publicar.ps1` crea un repositorio público nuevo y configura Pages cuando existe una sesión válida de GitHub CLI. Comprueba primero `PUBLICACION.md` para conocer el estado real; la presencia del script no significa que ya se haya publicado.

Documentación oficial: [crear un repositorio](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user), [crear un sitio de Pages](https://docs.github.com/en/rest/pages/pages#create-a-github-pages-site).

Fuente de los ejercicios: `Desafio_Integracion_Numerica_La_Paz_Solucionario.docx`, documento proporcionado para este trabajo. El archivo original no se incluye en el repositorio.
