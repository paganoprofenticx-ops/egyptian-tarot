# Imágenes del Rider-Waite-Smith

Coloca aquí las láminas cuando las tengas. Después ejecuta:

```bash
npm run art:import:rider-waite
```

## Nombres admitidos

- `00.jpg`, `01.png`, `02.webp`… hasta `77.*`
- También `00-el-loco.jpg`, `22-as-de-bastos.png`, `36 - As de Copas.jpg`, etc.
- Dorso: `dorso.jpg`, `reverso.jpg` o `back.jpg`
- Portada: `portada.jpg`, `tapa.jpg` o `cover.jpg`

La numeración de esta biblioteca es: mayores `00–21`; menores `22–77`
(Bastos `22–35`, Copas `36–49`, Espadas `50–63`, Oros `64–77`).

Se aceptan JPG, PNG y WebP. Lo ideal es una proporción vertical de **16:25**
(por ejemplo 640 × 1000 px) y un peso inferior a 1,5 MB por carta.

Las cartas que no tengan imagen seguirán mostrando el marcador neutro
`public/images/cards/rider-waite/placeholder.svg`. Para volver a los marcadores:

```bash
npm run art:import:rider-waite -- --clean
```

## Aviso

No subas a un repositorio público imágenes de barajas comerciales sin
autorización. Este proyecto no incluye ni distribuye las láminas oficiales del
Rider-Waite-Smith.
