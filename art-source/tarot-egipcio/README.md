# Imágenes reales de la baraja

Coloca aquí las imágenes cuando las tengas. Después ejecuta:

```bash
npm run art:import
```

## Nombres admitidos

- `01.jpg`, `02.png`, `03.webp`… hasta `78.*`
- También `01-el-mago.jpg`, `02 - La Sacerdotisa.png`, etc.
- Dorso: `dorso.jpg`, `reverso.jpg` o `back.jpg`
- Portada: `portada.jpg`, `tapa.jpg` o `cover.jpg`

Se aceptan JPG, PNG y WebP. Lo ideal es una proporción vertical de **16:25**
(por ejemplo 640 × 1000 px) y un peso inferior a 1,5 MB por carta.

Las cartas que no tengan imagen seguirán mostrando el SVG provisional. Para
volver a los marcadores de posición:

```bash
npm run art:import -- --clean
```

## Aviso

No subas a un repositorio público imágenes de barajas comerciales sin
autorización. Este proyecto no incluye ni distribuye las láminas oficiales.
