# Evidencia de pruebas de integración numérica

Ejecución automática del código real de la página con Node.js.

Fecha UTC: 2026-10-27T15:43:34.173Z. Runtime: v24.22.1. Aprobadas: 47. Fallidas: 0.

Reproducción: ejecutar `node tests.js` en esta carpeta. No requiere paquetes externos.

| Prueba | Estado | Evidencia |
| --- | --- | --- |
| x² en [0,2], trapecio n=4 | APROBADA | Resultado 2.750000000000; exacto 8/3; error 0.083333333333. |
| x² en [0,2], Simpson 1/3 n=4 | APROBADA | Resultado 2.666666666667; referencia 2.666666666667. |
| x² en [0,2], trapecio n=8 | APROBADA | Resultado 2.687500000000; exacto 8/3; error 0.020833333333. |
| x² en [0,2], Simpson 1/3 n=8 | APROBADA | Resultado 2.666666666667; referencia 2.666666666667. |
| x² en [0,2], Simpson 3/8 n=6 | APROBADA | Coincide con el valor esperado. |
| x² en [0,2], Simpson 3/8 n=12 | APROBADA | Coincide con el valor esperado. |
| Exactitud cúbica S13, n=4 | APROBADA | Coincide con el valor esperado. |
| Exactitud cúbica S38, n=6 | APROBADA | Coincide con el valor esperado. |
| Exactitud cúbica M7, n=7 | APROBADA | Coincide con el valor esperado. |
| Exactitud cúbica MIX, n=11 | APROBADA | Coincide con el valor esperado. |
| Trapecio exacto para función lineal | APROBADA | Coincide con el valor esperado. |
| Ejercicio 19: distancia y conversión | APROBADA | Coincide con el valor esperado. |
| Ejercicio 20: trabajo combinado | APROBADA | Coincide con el valor esperado. |
| Ejercicio 21: perfil y dos formas de Simpson | APROBADA | Coincide con el valor esperado. |
| Ejercicio 22: función, n=8 y errores | APROBADA | T=44.042044; S=43.899213; referencia=43.898841; E% de Simpson=0.000848. |
| Ejercicio 23: función, n=8 y errores | APROBADA | T=11.681778; S=12.151244; referencia=12.828170; E% de Simpson=5.276870. |
| Ejercicio 24: función, n=8 y errores | APROBADA | T=78.969264; S=80.010767; referencia=80.000000; E% de Simpson=0.013458. |
| Ejercicio 25: función, n=8 y errores | APROBADA | T=3486620079.985219; S=3486236899.848311; referencia=3486236787.058988; E% de Simpson=0.000003. |
| Ejercicio 27: volumen y superficie simplificada | APROBADA | Coincide con el valor esperado. |
| n=11, combinación 8+3 sobre datos SINTÉTICOS | APROBADA | Función constante artificial para probar pesos; no representa anchuras del lago. |
| Coeficientes combinados: el nodo de unión suma ambos tramos | APROBADA | Coincide con el valor esperado. |
| Errores sin referencia no se inventan | APROBADA | Coincide con el valor esperado. |
| Referencia cero: error porcentual no definido | APROBADA | Coincide con el valor esperado. |
| Rechazo de listas desiguales | APROBADA | Coincide con el valor esperado. |
| Rechazo de x no creciente | APROBADA | Coincide con el valor esperado. |
| Rechazo de x repetido | APROBADA | Coincide con el valor esperado. |
| Rechazo de paso no uniforme | APROBADA | Coincide con el valor esperado. |
| Rechazo de dato no numérico | APROBADA | Coincide con el valor esperado. |
| Rechazo de dato infinito | APROBADA | Coincide con el valor esperado. |
| Rechazo de pareja incompleta | APROBADA | Coincide con el valor esperado. |
| Rechazo de texto en pareja | APROBADA | Coincide con el valor esperado. |
| Rechazo de lista con valor vacío | APROBADA | Coincide con el valor esperado. |
| Rechazo de n no entero | APROBADA | Coincide con el valor esperado. |
| Rechazo de n cero | APROBADA | Coincide con el valor esperado. |
| Rechazo de n negativo | APROBADA | Coincide con el valor esperado. |
| Rechazo de n excesivo | APROBADA | Coincide con el valor esperado. |
| Rechazo de límites invertidos | APROBADA | Coincide con el valor esperado. |
| Rechazo de n impar para 1/3 | APROBADA | Coincide con el valor esperado. |
| Rechazo de n=4 para 3/8 | APROBADA | Coincide con el valor esperado. |
| Rechazo de n=8 para 3/8 | APROBADA | Coincide con el valor esperado. |
| Rechazo de combinación 4+3 con n distinto de 7 | APROBADA | Coincide con el valor esperado. |
| Rechazo de función fuera de dominio | APROBADA | Coincide con el valor esperado. |
| Rechazo de expresión con acceso a código | APROBADA | Coincide con el valor esperado. |
| Rechazo de símbolo de función desconocido | APROBADA | Coincide con el valor esperado. |
| Rechazo de paréntesis sin cerrar | APROBADA | Coincide con el valor esperado. |
| Parser: precedencia, potencia y radianes | APROBADA | Coincide con el valor esperado. |
| Parser: gramática de las funciones de la guía | APROBADA | Coincide con el valor esperado. |

La verificación visual y de interacción del navegador se documenta por separado en `verificacion-web.md`. No se ejecuta un área numérica del ejercicio 26 porque faltan los datos originales.
