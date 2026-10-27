# Estado de publicación

Publicación completada y comprobada el 27 de octubre de 2026.

Repositorio: https://github.com/iTzManix/integracion-numerica-la-paz-2026-10-27

Página: https://itzmanix.github.io/integracion-numerica-la-paz-2026-10-27/

GitHub Pages se configuró desde la rama `main`, carpeta `/`, y confirmó el primer despliegue con estado `built`. La URL respondió HTTP 200. Las 21 comprobaciones de navegador se ejecutaron sobre la página pública, incluidas la calculadora, las descargas y los anchos de pantalla de 375, 768, 1024 y 1440 px. El módulo numérico aprobó sus 47 pruebas. No se registraron fallos en estas comprobaciones.

Los detalles están en `verificacion-web.md`, `verificacion-web.json`, `evidencia-pruebas.md` y `pruebas.json`. Las capturas se guardan en `evidencias/`. El informe técnico tiene dos páginas; la resolución completa, dieciséis.

Para actualizaciones posteriores, desde esta carpeta:

```powershell
git add .
git commit -m 'Actualizar resolución y página'
git push origin main
```

Los enlaces ya están incorporados a la resolución, al informe técnico y a la página. El script `publicar.ps1` sirve para una publicación inicial en un repositorio nuevo; no se debe volver a ejecutar sobre el repositorio ya creado.
