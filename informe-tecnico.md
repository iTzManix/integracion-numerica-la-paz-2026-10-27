# Informe técnico de integración numérica

## Problema y modelo

Resuelvo los ejercicios 19 al 27 de la guía. Integro velocidad para hallar distancia, fuerza para obtener trabajo, altura para estimar área, longitud de curvas, caudal radial, energía gravitatoria y secciones de un sólido. Los contextos de La Paz son adaptaciones didácticas y las tablas no son mediciones locales. El desarrollo completo queda en el anexo de resolución.

## Datos y procedimientos

Tomo las tablas y parámetros del documento proporcionado. Compruebo n + 1 nodos, orden creciente y paso uniforme h = (b-a)/n. Aplico trapecio compuesto; Simpson 1/3 exige n par y Simpson 3/8 exige n múltiplo de 3. En 19 y 20 uso 1/3 en cuatro subintervalos y 3/8 en tres. En 21 reproduzco 1/3 en ocho más trapecio en uno; también obtengo 36.600000 u² por 3/8 en nueve. En 26 la combinación sería ocho más tres, pero faltan las anchuras.

Convierto segundos a horas en 19 y distingo diámetro de radio en 27. Calculo las sumas sin redondeos intermedios y muestro seis decimales. Para 22 a 25 comparo n = 4 y n = 8 con trapecio y Simpson 1/3. Verifico 3/8 con n = 6 y n = 12; no fuerzo n = 4 u 8. Los nodos, pesos y sustituciones están en el anexo y en la página.

## Resultados

| Ej. | Trapecio | Simpson o mixto | Unidad | Referencia o límite |
| --- | --- | --- | --- | --- |
| 19 | 0.147083 | 0.147072 | mi | Sin referencia exacta |
| 20 | 4.544000 | 4.577167 | lbf·in | Sin referencia exacta |
| 21 | 36.400000 | 36.850000 (mixto) | u² | 3/8: 36.600000; sin exacto |
| 22 | 44.042044 | 43.899213 | ft | Exacto: 43.898841 |
| 23 | 11.681778 | 12.151244 | in³/s | Exacto: 12.828170 |
| 24 | 78.969264 | 80.010767 | u | Exacto: 80.000000 |
| 25 | 3486620079.985220 | 3486236899.848311 | J | Exacto: 3486236787.058988 |
| 26 | No determinado | No determinado | mi² | Faltan 12 anchuras; ref. 9940 |
| 27 | 199.404740 | 201.842092 | in³ | Sin referencia exacta |

En 27, la fórmula simplificada de superficie da 159.278748 in² con trapecio y 162.315620 in² con Simpson 1/3. La superficie de revolución requiere la pendiente del perfil; no identifico estas cifras con su área exacta.


---

## Errores y comparación

Uso Eₐ = |I_ref-I_num| y E% = 100Eₐ/|I_ref|. Las referencias analíticas son 43.898840555674 ft en 22; 49π/12 in³/s en 23; 80 u en 24; y 3.486236787059 × 10⁹ J en 25.

| Ej. | Método | Error absoluto | Error porcentual |
| --- | --- | --- | --- |
| 22 | T₈ | 0.143203 ft | 0.326212 % |
| 22 | S₈ | 0.000372 ft | 0.000848 % |
| 23 | T₈ | 1.146392 in³/s | 8.936521 % |
| 23 | S₈ | 0.676926 in³/s | 5.276870 % |
| 24 | T₈ | 1.030736 u | 1.288420 % |
| 24 | S₈ | 0.010767 u | 0.013458 % |
| 25 | T₈ | 383292.926232 J | 0.010994 % |
| 25 | S₈ | 112.789323 J | 0.000003 % |

Al pasar de n = 4 a n = 8, el error del trapecio baja de 0.571696 a 0.143203 ft en 22, de 2.554791 a 1.146392 in³/s en 23, de 4.155244 a 1.030736 u en 24 y de 1532833.336959 a 383292.926232 J en 25. Simpson 1/3 también mejora en los cuatro casos. En 23, la derivada cerca de la pared limita la rapidez de convergencia. En las tablas sin referencia exacta comparo métodos sin denominar error verdadero a su diferencia.

## Aplicación y verificación

La página permite introducir parejas x,y, listas separadas o una función con a, b y n; seleccionar métodos; comprobar espaciado y compatibilidad; ver factores, unidades, errores y gráficos. Incluye la cardioide paramétrica, los desarrollos y la tabla final. Verifico f(x) = x² en [0,2]: T₄ = 2.750000, T₈ = 2.687500 y Simpson 1/3 = 2.666667 en ambos casos; 3/8 también reproduce 8/3 con n = 6 y 12. El registro de pruebas conserva resultados y validaciones. El código y la aplicación quedan enlazados al final del informe.

## Conclusiones y limitaciones

Obtengo resultados coherentes con el solucionario y las referencias analíticas. En 26 no puedo calcular un área sin las doce anchuras: dejo el modelo listo y propongo adaptar el Titicaca con cartografía fechada, proyección métrica y mediciones verificables. En 27, el perfil lineal por tramos permite estimar la superficie incluyendo pendiente, sin afirmar que representa el objeto real exacto. Las coordenadas ilustrativas de 21 y el modelo elegido condicionan la precisión.

Fuente de datos y consignas: Desafio_Integracion_Numerica_La_Paz_Solucionario.docx, secciones 1 a 10. El anexo extenso, la aplicación y las evidencias complementan estas dos páginas.


Aplicación: https://itzmanix.github.io/integracion-numerica-la-paz-2026-10-27/

Repositorio: https://github.com/iTzManix/integracion-numerica-la-paz-2026-10-27
