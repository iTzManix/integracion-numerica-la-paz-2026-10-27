# Resolución de integración numérica aplicada a La Paz

Desarrollo de los ejercicios 19 al 27

Trabajo con los datos y las condiciones de **Desafío grupal de Métodos Numéricos — Integración numérica aplicada a problemas de La Paz, Bolivia**. Mi objetivo es plantear cada integral, mostrar cómo sustituyo los datos y comprobar el resultado con la aplicación. Los contextos paceños son adaptaciones didácticas: estas tablas no representan mediciones reales realizadas en Bolivia.

La guía asigna dos ejercicios por grupo. Aquí desarrollo los nueve que aparecen en el documento, para dejar disponible la resolución completa. Mantengo el informe técnico resumido en un archivo aparte de dos páginas; este desarrollo extenso funciona como anexo de cálculo.

## Criterio de cálculo

Primero compruebo que los nodos estén ordenados y separados por la misma distancia. Uso n para el número de subintervalos y n + 1 para el número de nodos. No cambio las tablas originales para forzar la aplicación de un método.

```text
h = (b - a) / n
T = h [f₀/2 + f₁ + ... + fₙ₋₁ + fₙ/2]
S₁/₃ = (h/3) [f₀ + 4f₁ + 2f₂ + ... + 4fₙ₋₁ + fₙ], n par
S₃/₈ = (3h/8) [f₀ + 3f₁ + 3f₂ + 2f₃ + ... + fₙ], n múltiplo de 3
Eₐ = |I_ref - I_num|
E% = 100 Eₐ / |I_ref|, si I_ref ≠ 0
```

Los pesos de las tablas se multiplican por h, h/3 o 3h/8 según el método. En las combinaciones aplico cada fórmula en su tramo y sumo las integrales; el nodo de unión pertenece a ambos tramos. Mantengo todos los decimales en el cálculo y redondeo la presentación a seis decimales. Para energías grandes muestro también notación científica. Las diferencias entre métodos no equivalen al error verdadero cuando falta una referencia independiente.


## Ejercicio 19 Distancia de un vehículo

### Planteamiento y datos

Quiero estimar la distancia recorrida durante los primeros 7 segundos. La velocidad está en mi/h, así que la integral respecto del tiempo en segundos debe dividirse entre 3600. Uso 1 mi = 1609.344 m.

`d = (1/3600) ∫₀⁷ v(t) dt`, con `h = 1 s` y `n = 7`.

| i | xᵢ | fᵢ | Peso T |
| --- | --- | --- | --- |
| 0 | 0.000000 | 0.000000 | 0.5 |
| 1 | 1.000000 | 14.000000 | 1 |
| 2 | 2.000000 | 39.000000 | 1 |
| 3 | 3.000000 | 69.000000 | 1 |
| 4 | 4.000000 | 95.000000 | 1 |
| 5 | 5.000000 | 114.000000 | 1 |
| 6 | 6.000000 | 129.000000 | 1 |
| 7 | 7.000000 | 139.000000 | 0.5 |

### Sustitución y resultado

Por trapecio obtengo:

```text
T = 1[0/2 + 14 + 39 + 69 + 95 + 114 + 129 + 139/2]
  = 529.500000 (mi/h)·s
d_T = 529.5/3600 = 0.147083 mi = 236.707680 m
```

Como 7 no es par ni múltiplo de 3, combino Simpson 1/3 en [0,4] con Simpson 3/8 en [4,7].

```text
S₁/₃[0,4] = (1/3)[0 + 4(14 + 69) + 2(39) + 95]
           = 168.333333 (mi/h)·s
S₃/₈[4,7] = (3/8)[95 + 3(114 + 129) + 139]
           = 361.125000 (mi/h)·s
S = 529.458333 (mi/h)·s
d_S = S/3600 = 0.147072 mi = 236.689053 m
```

Los pesos locales son [1,4,2,4,1] con factor 1/3 y [1,3,3,1] con factor 3/8. La diferencia entre estimaciones es 0.000012 mi, equivalente a 0.018627 m. No calculo error verdadero porque no tengo la velocidad continua ni una distancia exacta. Mi estimación por Simpson combinado es aproximadamente 236.689053 m.

## Ejercicio 20 Trabajo de una banda elástica

### Planteamiento y datos

Para calcular el trabajo integro la fuerza respecto del desplazamiento. Interpreto lb como libra-fuerza, de acuerdo con el trabajo mecánico del ejercicio. Uso 1 lbf·in = 0.1129848290276167 J.

`W = ∫₀²·⁸ F(x) dx`, con `h = 0.4 in` y `n = 7`.

| i | xᵢ | fᵢ | Peso T |
| --- | --- | --- | --- |
| 0 | 0.000000 | 0.000000 | 0.5 |
| 1 | 0.400000 | 0.850000 | 1 |
| 2 | 0.800000 | 1.300000 | 1 |
| 3 | 1.200000 | 1.600000 | 1 |
| 4 | 1.600000 | 1.870000 | 1 |
| 5 | 2.000000 | 2.140000 | 1 |
| 6 | 2.400000 | 2.340000 | 1 |
| 7 | 2.800000 | 2.520000 | 0.5 |

### Sustitución y resultado

```text
T = 0.4[0/2 + 0.85 + 1.30 + 1.60 + 1.87 + 2.14 + 2.34 + 2.52/2]
  = 4.544000 lbf·in
S₁/₃[0,1.6] = (0.4/3)[0 + 4(0.85 + 1.60) + 2(1.30) + 1.87]
             = 1.902666666667 lbf·in
S₃/₈[1.6,2.8] = (3·0.4/8)[1.87 + 3(2.14 + 2.34) + 2.52]
               = 2.674500000000 lbf·in
W_S = 4.577166666667 lbf·in
```

Los pesos locales son [1,4,2,4,1] y [1,3,3,1], con factores 0.4/3 y 3·0.4/8. La combinación cubre los siete subintervalos sin eliminar datos.

Convierto al SI: `W_T = 0.513403 J` y `W_S = 0.517150 J`. La diferencia es 0.033167 lbf·in. No la presento como error verdadero porque no conozco una referencia independiente. El trabajo es positivo y representa energía entregada a la banda durante el estiramiento.

## Ejercicio 21 Área bajo un perfil topográfico

### Planteamiento y procedencia

Uso la tabla ilustrativa de coordenadas que ya aparece en el documento. No afirmo haber digitalizado una gráfica que no está adjunta. Si trabajara desde la figura original, fijaría la escala de ambos ejes y registraría estas parejas antes de integrar. Como no se especifican unidades físicas, expreso el área en u².

`A = ∫₁¹⁰ y(x) dx`, con `h = 1 u` y `n = 9`.

| i | xᵢ | fᵢ | Peso T | Peso S 3/8 |
| --- | --- | --- | --- | --- |
| 0 | 1.000000 | 1.300000 | 0.5 | 1 |
| 1 | 2.000000 | 3.700000 | 1 | 3 |
| 2 | 3.000000 | 4.600000 | 1 | 3 |
| 3 | 4.000000 | 4.400000 | 1 | 2 |
| 4 | 5.000000 | 2.700000 | 1 | 3 |
| 5 | 6.000000 | 2.500000 | 1 | 3 |
| 6 | 7.000000 | 3.600000 | 1 | 2 |
| 7 | 8.000000 | 5.300000 | 1 | 3 |
| 8 | 9.000000 | 6.000000 | 1 | 3 |
| 9 | 10.000000 | 5.900000 | 0.5 | 1 |

### Sustitución y comparación

```text
T = 1[(1.3 + 5.9)/2 + 3.7 + 4.6 + 4.4 + 2.7 + 2.5 + 3.6 + 5.3 + 6.0]
  = 36.400000 u²
S₁/₃[1,9] = (1/3)[1.3 + 6.0 + 4(3.7 + 4.4 + 2.5 + 5.3)
                    + 2(4.6 + 2.7 + 3.6)] = 30.900000 u²
T[9,10] = (1/2)(6.0 + 5.9) = 5.950000 u²
A_combinada = 30.900000 + 5.950000 = 36.850000 u²
```

Así reproduzco el resultado del solucionario. Además, 9 es múltiplo de 3 y puedo usar Simpson 3/8 en todo el intervalo:

```text
S₃/₈ = (3/8)[1.3 + 5.9 + 3(3.7 + 4.6 + 2.7 + 2.5 + 5.3 + 6.0)
                       + 2(4.4 + 3.6)] = 36.600000 u²
```

Obtengo tres estimaciones compatibles con una curva digitalizada. La diferencia 36.85 - 36.40 = 0.45 u² no mide el error verdadero. La incertidumbre de lectura de la gráfica y la interpolación entre nodos limita la precisión, aunque muestre seis decimales.

## Ejercicio 22 Longitud de una catenaria

### Modelo y referencia analítica

La curva es `y = 24 cosh(x/24)`, con x e y en ft. Derivo: `y′ = sinh(x/24)`. Al usar `cosh²(u) - sinh²(u) = 1`, la raíz de la fórmula de longitud se simplifica a cosh(x/24), que es positiva.

```text
L = ∫₋₁₂²⁶ √(1 + sinh²(x/24)) dx = ∫₋₁₂²⁶ cosh(x/24) dx
L_ref = 24[sinh(x/24)]₋₁₂²⁶ = 43.898840555674 ft
```

Tomo a = 24 ft como parámetro de la catenaria y como altura mínima del modelo, tal como lo define la guía. Los límites son -12 ft y 26 ft. La longitud es mayor que la separación horizontal de 38 ft, lo que tiene sentido geométrico. Este modelo simplificado no constituye un diseño del teleférico.

### Desarrollo con ocho subintervalos

Uso `n = 8`, `h = 4.750000` y los siguientes nodos. Los valores de f que muestro están redondeados; para las sumas conservo su precisión completa.

| i | xᵢ | fᵢ | Peso T | Peso S 1/3 |
| --- | --- | --- | --- | --- |
| 0 | -12.000000 | 1.127626 | 0.5 | 1 |
| 1 | -7.250000 | 1.045975 | 1 | 4 |
| 2 | -2.500000 | 1.005430 | 1 | 2 |
| 3 | 2.250000 | 1.004398 | 1 | 4 |
| 4 | 7.000000 | 1.042837 | 1 | 2 |
| 5 | 11.750000 | 1.122259 | 1 | 4 |
| 6 | 16.500000 | 1.245785 | 1 | 2 |
| 7 | 21.250000 | 1.418268 | 1 | 4 |
| 8 | 26.000000 | 1.646488 | 0.5 | 1 |

### Sustitución numérica

```text
Σ fᵢ interiores = 7.884952
Σ fᵢ impares = 4.590900
Σ fᵢ pares interiores = 3.294052
T₈ = (4.75)[(1.127626 + 1.646488)/2 + 7.884952]
   = 44.042044 ft
S₈ = (4.75/3)[1.127626 + 1.646488 + 4(4.590900) + 2(3.294052)]
   = 43.899213 ft
```

Comparo con `I_ref = 43.898841 ft`: el error absoluto del trapecio es 0.143203 ft (0.326212 %) y el de Simpson 1/3 es 0.000372 ft (0.000848 %).

### Comparación de n igual a cuatro y ocho

| n | Método | Integral (ft) | Eₐ (ft) | E% |
| --- | --- | --- | --- | --- |
| 4 | Trapecio | 44.470537 | 0.571696 | 1.302303 |
| 4 | Simpson 1/3 | 43.904718 | 0.005877 | 0.013389 |
| 8 | Trapecio | 44.042044 | 0.143203 | 0.326212 |
| 8 | Simpson 1/3 | 43.899213 | 0.000372 | 0.000848 |

En ambos métodos el error disminuye al duplicar n en este caso. Simpson 1/3 se acerca más a la referencia con el mismo número de subintervalos.

### Comprobación adicional con Simpson tres octavos

No aplico Simpson 3/8 con n = 4 u 8, porque ninguno es múltiplo de 3. Para comprobarlo uso n = 6 y n = 12, con pesos [1,3,3,2,…,3,3,1] y factor 3h/8.

| n | h | S 3/8 (ft) | Eₐ (ft) | E% |
| --- | --- | --- | --- | --- |
| 6 | 6.333333 | 43.901458 | 0.002618 | 0.005963 |
| 12 | 3.166667 | 43.899006 | 0.000166 | 0.000377 |

## Ejercicio 23 Caudal de una tubería circular

### Modelo y referencia analítica

Integro anillos concéntricos: cada anillo tiene área diferencial `dA = 2πr dr`. El perfil `v(r) = 80(1-r/R)^(1/7)` está en in/s y `R = 0.25 in`. La función que debo integrar incluye el factor r; integrar solo la velocidad no daría el caudal.

```text
Q = ∫₀⁰·²⁵ 160πr(1-r/0.25)^(1/7) dr
u = r/R  →  Q = 160πR² ∫₀¹ u(1-u)^(1/7) du
∫₀¹ u(1-u)^(1/7) du = 7/8 - 7/15 = 49/120
Q_ref = 10π·49/120 = 49π/12 = 12.828170002158 in³/s
```

El integrando vale cero tanto en el centro como en la pared. Su derivada presenta una singularidad en la pared, de modo que el perfil converge lentamente y no corresponde aplicar sin más una cota de error que suponga derivadas acotadas en todo el intervalo.

### Desarrollo con ocho subintervalos

Uso `n = 8`, `h = 0.031250` y los siguientes nodos. Los valores de f que muestro están redondeados; para las sumas conservo su precisión completa.

| i | xᵢ | fᵢ | Peso T | Peso S 1/3 |
| --- | --- | --- | --- | --- |
| 0 | 0.000000 | 0.000000 | 0.5 | 1 |
| 1 | 0.031250 | 15.411159 | 1 | 4 |
| 2 | 0.062500 | 30.150983 | 1 | 2 |
| 3 | 0.093750 | 44.063717 | 1 | 4 |
| 4 | 0.125000 | 56.908296 | 1 | 2 |
| 5 | 0.156250 | 68.271148 | 1 | 4 |
| 6 | 0.187500 | 77.314786 | 1 | 2 |
| 7 | 0.218750 | 81.696803 | 1 | 4 |
| 8 | 0.250000 | 0.000000 | 0.5 | 1 |

### Sustitución numérica

```text
Σ fᵢ interiores = 373.816893
Σ fᵢ impares = 209.442828
Σ fᵢ pares interiores = 164.374065
T₈ = (0.03125)[(0.000000 + 0.000000)/2 + 373.816893]
   = 11.681778 in³/s
S₈ = (0.03125/3)[0.000000 + 0.000000 + 4(209.442828) + 2(164.374065)]
   = 12.151244 in³/s
```

Comparo con `I_ref = 12.828170 in³/s`: el error absoluto del trapecio es 1.146392 in³/s (8.936521 %) y el de Simpson 1/3 es 0.676926 in³/s (5.276870 %).

### Comparación de n igual a cuatro y ocho

| n | Método | Integral (in³/s) | Eₐ (in³/s) | E% |
| --- | --- | --- | --- | --- |
| 4 | Trapecio | 10.273379 | 2.554791 | 19.915474 |
| 4 | Simpson 1/3 | 11.326660 | 1.501510 | 11.704789 |
| 8 | Trapecio | 11.681778 | 1.146392 | 8.936521 |
| 8 | Simpson 1/3 | 12.151244 | 0.676926 | 5.276870 |

En ambos métodos el error disminuye al duplicar n en este caso. Simpson 1/3 se acerca más a la referencia con el mismo número de subintervalos.

### Comprobación adicional con Simpson tres octavos

No aplico Simpson 3/8 con n = 4 u 8, porque ninguno es múltiplo de 3. Para comprobarlo uso n = 6 y n = 12, con pesos [1,3,3,2,…,3,3,1] y factor 3h/8.

| n | h | S 3/8 (in³/s) | Eₐ (in³/s) | E% |
| --- | --- | --- | --- | --- |
| 6 | 0.041667 | 11.744677 | 1.083493 | 8.446197 |
| 12 | 0.020833 | 12.339272 | 0.488898 | 3.811127 |

## Ejercicio 24 Longitud de una cardioide

### Modelo y referencia analítica

Con `b = 5`, la curva paramétrica es `x(t) = 10 cos(t) - 5 cos(2t)` y `y(t) = 10 sin(t) - 5 sin(2t)`. Tomo t en radianes. La guía no especifica una unidad de longitud, así que uso u.

```text
x′(t) = -10 sin(t) + 10 sin(2t)
y′(t) =  10 cos(t) - 10 cos(2t)
(x′)² + (y′)² = 200(1-cos t) = 400 sin²(t/2)
√((x′)²+(y′)²) = 20|sin(t/2)| = 20 sin(t/2), 0 ≤ t ≤ 2π
L = ∫₀²π 20 sin(t/2) dt
L_ref = [-40 cos(t/2)]₀²π = 80 u
```

La representación paramétrica tiene una cúspide en (5,0), alcanza (-15,0) para t = π y cierra al llegar a 2π. La página incluye su trazado y, en la calculadora, el gráfico del integrando de longitud.

### Desarrollo con ocho subintervalos

Uso `n = 8`, `h = 0.785398` y los siguientes nodos. Los valores de f que muestro están redondeados; para las sumas conservo su precisión completa.

| i | xᵢ | fᵢ | Peso T | Peso S 1/3 |
| --- | --- | --- | --- | --- |
| 0 | 0.000000 | 0.000000 | 0.5 | 1 |
| 1 | 0.785398 | 7.653669 | 1 | 4 |
| 2 | 1.570796 | 14.142136 | 1 | 2 |
| 3 | 2.356194 | 18.477591 | 1 | 4 |
| 4 | 3.141593 | 20.000000 | 1 | 2 |
| 5 | 3.926991 | 18.477591 | 1 | 4 |
| 6 | 4.712389 | 14.142136 | 1 | 2 |
| 7 | 5.497787 | 7.653669 | 1 | 4 |
| 8 | 6.283185 | 0.000000 | 0.5 | 1 |

### Sustitución numérica

```text
Σ fᵢ interiores = 100.546790
Σ fᵢ impares = 52.262519
Σ fᵢ pares interiores = 48.284271
T₈ = (0.785398163397)[(0.000000 + 0.000000)/2 + 100.546790]
   = 78.969264 u
S₈ = (0.785398163397/3)[0.000000 + 0.000000 + 4(52.262519) + 2(48.284271)]
   = 80.010767 u
```

Comparo con `I_ref = 80.000000 u`: el error absoluto del trapecio es 1.030736 u (1.288420 %) y el de Simpson 1/3 es 0.010767 u (0.013458 %).

### Comparación de n igual a cuatro y ocho

| n | Método | Integral (u) | Eₐ (u) | E% |
| --- | --- | --- | --- | --- |
| 4 | Trapecio | 75.844756 | 4.155244 | 5.194055 |
| 4 | Simpson 1/3 | 80.182390 | 0.182390 | 0.227988 |
| 8 | Trapecio | 78.969264 | 1.030736 | 1.288420 |
| 8 | Simpson 1/3 | 80.010767 | 0.010767 | 0.013458 |

En ambos métodos el error disminuye al duplicar n en este caso. Simpson 1/3 se acerca más a la referencia con el mismo número de subintervalos.

### Comprobación adicional con Simpson tres octavos

No aplico Simpson 3/8 con n = 4 u 8, porque ninguno es múltiplo de 3. Para comprobarlo uso n = 6 y n = 12, con pesos [1,3,3,2,…,3,3,1] y factor 3h/8.

| n | h | S 3/8 (u) | Eₐ (u) | E% |
| --- | --- | --- | --- | --- |
| 6 | 1.047198 | 80.080394 | 0.080394 | 0.100492 |
| 12 | 0.523599 | 80.004775 | 0.004775 | 0.005969 |

## Ejercicio 25 Variación de energía potencial

### Modelo y referencia analítica

Uso `m = 500 kg`, `g₀ = 9.81 m/s²`, `R = 6 371 000 m` y `h_final = 800 000 m`. Llamo Δy al paso numérico para no confundirlo con la altura final. Supongo el modelo gravitatorio radial indicado y calculo el aumento de energía potencial, sin añadir energía cinética orbital.

```text
g(y) = g₀R²/(R+y)²
ΔU = mg₀ ∫₀⁸⁰⁰⁰⁰⁰ R²/(R+y)² dy
   = mg₀R²[-1/(R+y)]₀⁸⁰⁰⁰⁰⁰
   = mg₀Rh_final/(R+h_final)
ΔU_ref = 3 486 236 787.058988 J ≈ 3.486236787 × 10⁹ J
```

La energía es positiva porque elevo el satélite. Si mantuviera g constante obtendría 3 924 000 000 J, un valor mayor; aquí considero la disminución de g con la altura.

### Desarrollo con ocho subintervalos

Uso `n = 8`, `h = 100000.000000` y los siguientes nodos. Los valores de f que muestro están redondeados; para las sumas conservo su precisión completa.

| i | xᵢ | fᵢ | Peso T | Peso S 1/3 |
| --- | --- | --- | --- | --- |
| 0 | 0.000000 | 4905.000000 | 0.5 | 1 |
| 1 | 100000.000000 | 4754.571932 | 1 | 4 |
| 2 | 200000.000000 | 4610.959286 | 1 | 2 |
| 3 | 300000.000000 | 4473.756481 | 1 | 4 |
| 4 | 400000.000000 | 4342.587664 | 1 | 2 |
| 5 | 500000.000000 | 4217.104129 | 1 | 4 |
| 6 | 600000.000000 | 4096.982005 | 1 | 2 |
| 7 | 700000.000000 | 3981.920155 | 1 | 4 |
| 8 | 800000.000000 | 3871.638295 | 0.5 | 1 |

### Sustitución numérica

```text
Σ fᵢ interiores = 30477.881652
Σ fᵢ impares = 17427.352698
Σ fᵢ pares interiores = 13050.528955
T₈ = (100000)[(4905.000000 + 3871.638295)/2 + 30477.881652]
   = 3486620079.985220 J
S₈ = (100000/3)[4905.000000 + 3871.638295 + 4(17427.352698) + 2(13050.528955)]
   = 3486236899.848311 J
```

Comparo con `I_ref = 3486236787.058988 J`: el error absoluto del trapecio es 383292.926232 J (0.010994 %) y el de Simpson 1/3 es 112.789323 J (0.000003 %).

### Comparación de n igual a cuatro y ocho

| n | Método | Integral (J) | Eₐ (J) | E% |
| --- | --- | --- | --- | --- |
| 4 | Trapecio | 3487769620.395947 | 1532833.336959 | 0.043968 |
| 4 | Simpson 1/3 | 3486238585.723833 | 1798.664845 | 0.000052 |
| 8 | Trapecio | 3486620079.985220 | 383292.926232 | 0.010994 |
| 8 | Simpson 1/3 | 3486236899.848311 | 112.789323 | 0.000003 |

En ambos métodos el error disminuye al duplicar n en este caso. Simpson 1/3 se acerca más a la referencia con el mismo número de subintervalos.

### Comprobación adicional con Simpson tres octavos

No aplico Simpson 3/8 con n = 4 u 8, porque ninguno es múltiplo de 3. Para comprobarlo uso n = 6 y n = 12, con pesos [1,3,3,2,…,3,3,1] y factor 3h/8.

| n | h | S 3/8 (J) | Eₐ (J) | E% |
| --- | --- | --- | --- | --- |
| 6 | 133333.333333 | 3486237586.858176 | 799.799189 | 0.000023 |
| 12 | 66666.666667 | 3486236837.193750 | 50.134762 | 0.000001 |

## Ejercicio 26 Superficie de un lago

### Modelo y datos disponibles

El ejercicio se refiere al lago Erie y entrega el área de referencia `A_ref = 9940 mi²`. Planteo `A = ∫₄₀²⁶⁰ w(x) dx`, con x y el ancho w en millas. Me piden medir cada 20 mi, así que `h = 20 mi` y `n = (260-40)/20 = 11`.

Los nodos serían x = 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240 y 260 mi. El archivo no incluye la figura del mapa ni una tabla de anchuras. Sin esas doce anchuras no puedo obtener un área numérica reproducible y no relleno los datos con valores supuestos.

### Procedimiento listo para sustituir

Denomino w₀,…,w₁₁ a las anchuras que faltan. La expresión del trapecio queda:

```text
A_T = 20[(w₀+w₁₁)/2 + w₁+w₂+w₃+w₄+w₅+w₆+w₇+w₈+w₉+w₁₀]
```

Para Simpson, 11 no es par ni múltiplo de 3. Uso ocho subintervalos con Simpson 1/3 y tres con Simpson 3/8:

```text
A₁ = (20/3)[w₀+w₈ + 4(w₁+w₃+w₅+w₇) + 2(w₂+w₄+w₆)]
A₂ = (3·20/8)[w₈+3w₉+3w₁₀+w₁₁]
A_S = A₁+A₂
Eₐ = |A_num-9940| mi²
E% = 100|A_num-9940|/9940
```

El nodo w₈, en x = 200 mi, une ambos tramos. Hasta disponer de la tabla común dejo A_T, A_S y sus errores como **no determinados por falta de datos**. La aplicación permite introducir los doce anchos y usar esta combinación con n = 11.

### Adaptación propuesta al Titicaca

Para adaptar el ejercicio usaría un contorno geográfico fechado y con procedencia verificable, por ejemplo de una autoridad cartográfica. Lo proyectaría a un sistema métrico adecuado y definiría secciones paralelas a intervalos iguales. Mediría en cada sección la suma de los segmentos de agua, descontando islas y separaciones. Registraría coordenadas, resolución, fecha, proyección y unidades; después integraría esos anchos y compararía con un área de referencia del mismo contorno y fecha. Esta es una propuesta de trabajo: no afirmo haber obtenido ni medido un mapa del Titicaca.

## Ejercicio 27 Volumen y superficie de un objeto alargado

### Datos y modelo de volumen

El diámetro no es el radio: primero calculo `r = d/2`. Integro las áreas circulares `πr²` a lo largo del eje z. Las coordenadas y los diámetros están en in; el volumen estará en in³.

`V = π∫₀¹² r(z)² dz`, con `h = 1 in` y `n = 12`.

| z (in) | d (in) | r (in) | r² (in²) | Peso T | Peso 1/3 | Peso 3/8 |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 0.000000 | 0.000000 | 0.000000 | 0.5 | 1 | 1 |
| 1 | 2.600000 | 1.300000 | 1.690000 | 1 | 4 | 3 |
| 2 | 3.200000 | 1.600000 | 2.560000 | 1 | 2 | 3 |
| 3 | 4.800000 | 2.400000 | 5.760000 | 1 | 4 | 2 |
| 4 | 5.600000 | 2.800000 | 7.840000 | 1 | 2 | 3 |
| 5 | 6.000000 | 3.000000 | 9.000000 | 1 | 4 | 3 |
| 6 | 6.200000 | 3.100000 | 9.610000 | 1 | 2 | 2 |
| 7 | 6.000000 | 3.000000 | 9.000000 | 1 | 4 | 3 |
| 8 | 5.600000 | 2.800000 | 7.840000 | 1 | 2 | 3 |
| 9 | 4.800000 | 2.400000 | 5.760000 | 1 | 4 | 2 |
| 10 | 3.300000 | 1.650000 | 2.722500 | 1 | 2 | 3 |
| 11 | 2.600000 | 1.300000 | 1.690000 | 1 | 4 | 3 |
| 12 | 0.000000 | 0.000000 | 0.000000 | 0.5 | 1 | 1 |

### Sustitución para volumen

```text
Σ rᵢ² interiores = 63.472500
Σ rᵢ² impares = 32.900000
Σ rᵢ² pares interiores = 30.572500
V_T = π·1[0/2 + 63.4725 + 0/2] = 199.404740 in³
V_S = π(1/3)[0 + 0 + 4(32.9) + 2(30.5725)] = 201.842092 in³
V_3/8 = 199.437137 in³
```

Simpson 1/3 produce un volumen 2.437352 in³ mayor que trapecio. No conozco el volumen exacto del objeto, así que no puedo atribuirle un error verdadero.

### Fórmula simplificada de superficie

El enunciado propone `S_simplificada = 2π∫₀¹² r(z) dz`. La evalúo para reproducir la guía, pero esa expresión no incorpora la inclinación del perfil.

```text
Σ rᵢ interiores = 25.350000
Σ rᵢ impares = 13.400000
Σ rᵢ pares interiores = 11.950000
S_T = 2π·1[25.35] = 159.278748 in²
S_S = 2π(1/3)[4(13.4)+2(11.95)] = 162.315620 in²
S_3/8 = 160.574655 in²
```

### Diferencia con la superficie de revolución

Para la superficie geométrica necesito `S = 2π∫ r(z)√(1+[r′(z)]²) dz`. La tabla por sí sola no fija una derivada única: debo elegir cómo interpolo el perfil.

Como estimación adicional explícita, conecto los radios por segmentos rectos. Cada tramo genera un tronco de cono y su área lateral es `π(rᵢ+rᵢ₊₁)√((Δz)²+(Δr)²)`. Con Δz = 1 in obtengo:

`S_lineal = Σ π(rᵢ+rᵢ₊₁)√(1+(rᵢ₊₁-rᵢ)²) = 175.596779 in²`.

Este valor es exacto para el perfil lineal por tramos que acabo de definir, no para una superficie real desconocida. Es mayor que la fórmula simplificada porque incorpora la pendiente. No añado tapas: ambos radios extremos son cero.

## Comprobación mínima del código

Uso `f(x) = x²` en [0,2], cuyo valor exacto es `8/3 = 2.666666666667`. Con n = 4, trapecio da 2.750000 y Simpson 1/3 da 2.666667; con n = 8, trapecio da 2.687500 y Simpson 1/3 da 2.666667. Simpson 3/8 da 2.666667 con n = 6 y con n = 12. No lo aplico con n = 4 ni n = 8.

También compruebo el rechazo de listas desiguales, valores no numéricos, nodos desordenados, separación no uniforme y n incompatible. Las pruebas concretas y su estado se guardan en `evidencia-pruebas.md` y `pruebas.json`; no confundo una prueba pendiente con una aprobada.

## Correspondencia con la rúbrica

| Criterio | Puntos | Dónde lo desarrollo |
| --- | --- | --- |
| Interpretación y contexto | 10 | Contexto y objetivo de cada ejercicio; escenarios didácticos identificados. |
| Modelo, unidades y límites | 10 | Integral, variables, límites, conversiones y unidades en cada desarrollo. |
| Cálculo manual | 20 | Tablas, pesos, sustituciones y combinaciones por tramos. |
| Resultados y errores | 15 | Referencias analíticas en 22–25; errores verdaderos solo donde corresponden. |
| Aplicación web | 25 | Ingreso de tablas o función, validaciones, pesos, unidades, comparación y gráficos. |
| Informe y conclusiones | 15 | Informe técnico separado de dos páginas y limitaciones explícitas. |
| Repositorio y evidencias | 5 | Código, evidencias de pruebas, repositorio GitHub y enlace de la aplicación. |

La rúbrica suma 100 puntos. Esta correspondencia describe la cobertura del trabajo; la calificación corresponde al docente. Los enlaces de la aplicación y del repositorio aparecen a continuación.

## Conclusiones

Con las tablas de 19 y 20 combino Simpson para utilizar todos los datos. En el perfil del ejercicio 21 reproduzco la combinación de la guía y añado Simpson 3/8, que sí es válido para sus nueve subintervalos. En los ejercicios con referencia analítica compruebo que el refinamiento de n = 4 a n = 8 reduce el error; el perfil de caudal converge más despacio cerca de la pared.

En el ejercicio 26 el resultado numérico queda pendiente de las anchuras originales. En el 27 distingo volumen, superficie simplificada y superficie de un perfil lineal por tramos. Mostrar más decimales no elimina la incertidumbre del modelo ni la de los datos digitalizados.

## Fuente y alcance

Fuente de los enunciados, tablas, parámetros y referencias: `Desafio_Integracion_Numerica_La_Paz_Solucionario.docx`, secciones 1 a 10, archivo proporcionado para este trabajo. La guía no adjunta la gráfica original del perfil ni el mapa con anchuras del lago. Los resultados se recalcularon a partir de los datos suministrados. No uso supuestas mediciones locales ni fuentes geográficas no consultadas.


## Aplicación y repositorio

Puedo repetir los cálculos en [la aplicación publicada](https://itzmanix.github.io/integracion-numerica-la-paz-2026-10-27/) y consultar el código y las pruebas en [el repositorio de GitHub](https://github.com/iTzManix/integracion-numerica-la-paz-2026-10-27).


## Tabla final de resultados

| Ejercicio | Trapecio | Simpson 1/3 o combinado | Unidad | Referencia o limitación |
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

En 21, Simpson 3/8 da 36.600000 u². En 27, la superficie simplificada da 159.278748 in² por trapecio y 162.315620 in² por Simpson 1/3; el perfil lineal por tramos da 175.596779 in².
