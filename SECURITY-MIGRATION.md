# Seguridad y migración

El rediseño no corrige por sí mismo la posible infección o inyección SEO del servidor anterior. Debe desplegarse únicamente después de una limpieza verificable.

## 1. Contención

- Suspender cambios no esenciales en el hosting anterior.
- Crear respaldo forense de archivos, bases de datos, DNS y registros.
- Inventariar panel, FTP/SFTP, SSH, correos, base de datos, CDN y proveedores.
- Rotar contraseñas, llaves, tokens y usuarios administrativos desde equipos confiables.
- Activar autenticación multifactor donde exista.

## 2. Investigación y limpieza

- Revisar archivos recientes, código ofuscado, tareas programadas, usuarios y procesos.
- Inspeccionar `.htaccess`, reglas de servidor, plugins, temas y scripts públicos.
- Buscar puertas traseras, redirecciones condicionales y contenido inyectado.
- Revisar base de datos y plantillas por enlaces o productos ajenos.
- Eliminar software sin soporte y dependencias desconocidas.
- No copiar plugins, scripts ni reglas del servidor comprometido al nuevo entorno.

## 3. Dominio y buscadores

- Exportar de Search Console las URLs contaminadas, especialmente `?u=`.
- Las reglas incluidas devuelven `410 Gone` cuando existe el parámetro `u`.
- Confirmar que otras URLs eliminadas respondan `404` o `410` reales.
- Mantener canonical sin parámetros y `X-Robots-Tag: noindex` para URLs con consulta.
- Enviar el sitemap limpio después del lanzamiento.
- Solicitar retirada o reindexación de URLs afectadas.
- Vigilar nuevas páginas, consultas extrañas y cambios de cobertura.

## 4. Infraestructura nueva

- Utilizar una cuenta o servidor limpio y actualizado.
- Forzar HTTPS.
- Activar HSTS sólo después de confirmar HTTPS en todos los subdominios.
- Restringir permisos de archivos y acceso administrativo.
- Configurar copias automáticas, recuperación probada y monitoreo de cambios.
- Separar secretos del repositorio.
- Revisar la CSP al agregar endpoint, analítica, mapas o videos.

`public/.htaccess` y `public/_headers` incluyen una base de encabezados. Deben verificarse contra el proveedor final.

## 5. Formularios

- Validar y sanitizar todos los campos en servidor.
- Rechazar el honeypot `website` si contiene un valor.
- Aplicar rate limiting por origen y huella técnica apropiada.
- No registrar mensajes completos en servicios de observabilidad públicos.
- Cifrar transporte y almacenamiento.
- Definir retención, acceso y borrado.
- Registrar versión y fecha del consentimiento.
- No enviar información clínica sensible por correo sin controles adecuados.

## 6. Subdominios

Auditar por separado:

- `cnd.unnepuebla.mx`
- `sistema.unnepuebla.mx`

No activar HSTS con `includeSubDomains` ni enlazarlos desde el sitio público hasta confirmar propiedad, vigencia, HTTPS y seguridad.

## 7. Verificación previa al lanzamiento

- [ ] Escaneo de archivos y base de datos sin hallazgos activos.
- [ ] Credenciales rotadas y usuarios mínimos.
- [ ] DNS revisado.
- [ ] Backups y restauración probados.
- [ ] HTTPS y encabezados verificados.
- [ ] `?u=` responde 410.
- [ ] URLs antiguas redirigen una sola vez.
- [ ] Sitemap y robots corresponden a producción.
- [ ] Search Console bajo control de UNNE.
- [ ] Monitoreo de uptime y cambios activado.
