# Verificación de la página estática

Fecha UTC: 2026-10-27T15:47:36.890Z. Navegador: Microsoft Edge headless / Playwright.

URL comprobada: https://itzmanix.github.io/integracion-numerica-la-paz-2026-10-27/

| Comprobación | Estado | Evidencia |
| --- | --- | --- |
| Carga inicial del ejercicio 19 | APROBADA | Simpson combinado: 0.147072 mi. |
| Prueba x² desde la interfaz | APROBADA | Simpson 1/3; referencia 8/3. |
| Comparación n=4 y n=8 visible | APROBADA | n	Método	Resultado (u³)	Eₐ	E%; 4	Trapecio compuesto	2.750000	0.083333	3.125000 %; 4	Simpson 1/3	2.666667	0.000000	0.000000 %; 8	Trapecio compuesto	2.687500	0.020833	0.781250 %; 8	Simpson 1/3	2.666667	0.000000	0.000000 % |
| Rechazo de Simpson 3/8 con n=4 | APROBADA | Mensaje visible; resultado anterior oculto. |
| Simpson 3/8 con n=6 | APROBADA | Resultado exacto con seis subintervalos. |
| Función del caudal desde el selector | APROBADA | S₈ = 12.151244 in³/s. |
| Listas desiguales desde interfaz | APROBADA | Mensaje de error específico. |
| Ejercicio 26 no calcula datos ausentes | APROBADA | No se inventan anchuras. |
| Combinación 8+3 desde interfaz | APROBADA | Prueba con anchura constante SINTÉTICA de 1 mi; no es un resultado del lago. |
| Volumen del ejercicio 27 por 3/8 | APROBADA | Coincide con el recálculo independiente. |
| Tabla de coeficientes accesible | APROBADA | 13 nodos de z=0 a z=12. |
| Sin desbordamiento horizontal a 375 px | APROBADA | La página se ajusta al ancho; las tablas tienen desplazamiento propio. |
| Sin desbordamiento horizontal a 768 px | APROBADA | La página se ajusta al ancho; las tablas tienen desplazamiento propio. |
| Sin desbordamiento horizontal a 1024 px | APROBADA | La página se ajusta al ancho; las tablas tienen desplazamiento propio. |
| Sin desbordamiento horizontal a 1440 px | APROBADA | La página se ajusta al ancho; las tablas tienen desplazamiento propio. |
| Archivo enlazado resolucion-ejercicios.pdf | APROBADA | HTTP 200 |
| Archivo enlazado resolucion-ejercicios.md | APROBADA | HTTP 200 |
| Archivo enlazado informe-tecnico.pdf | APROBADA | HTTP 200 |
| Archivo enlazado evidencia-pruebas.md | APROBADA | HTTP 200 |
| Enlaces internos válidos | APROBADA | Todos los destinos existen. |
| Sin errores de JavaScript en el navegador | APROBADA | No se registraron excepciones. |

Las capturas de escritorio, móvil, calculadora y tabla final se incluyen en la carpeta `evidencias`.
