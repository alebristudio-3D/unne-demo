# UNNE Puebla — rediseño web

Sitio estático para UNNE, Unidad de Neurología y Neurofisiología Especializada. Está construido con Astro, TypeScript estricto, colecciones de contenido y CSS propio.

La primera entrega funciona en modo `preview`: es navegable, pero bloquea la indexación y no muestra como definitivos los datos que UNNE todavía debe confirmar.

## Requisitos

- Node.js 20.19 o superior.
- npm 9 o superior.

## Instalación y ejecución

```bash
npm install
cp .env.example .env
npm run dev
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
npm run dev
```

Comandos:

- `npm run dev`: servidor local.
- `npm run check`: validación de Astro y TypeScript.
- `npm run build`: valida el modo de publicación y genera `dist/`.
- `npm run preview`: sirve el build generado.
- `npm run test:links`: revisa enlaces internos dentro de `dist/`.

## Modos de publicación

### Preview

```env
SITE_MODE=preview
```

- Agrega `noindex, nofollow`.
- `robots.txt` bloquea el rastreo.
- Permite revisar borradores y campos pendientes.
- El formulario se muestra deshabilitado si no hay endpoint.

### Production

```env
SITE_MODE=production
```

Antes de compilar, `scripts/validate-production.mjs` exige:

- dominio HTTPS definitivo;
- contacto y ubicación aprobados;
- endpoint HTTPS para formulario;
- al menos un perfil médico publicado;
- perfiles y aviso legal aprobados;
- eliminación de marcas de borrador en el aviso de privacidad.

El build falla de forma intencional si falta alguno.

## Organización

```text
src/
  components/       UI reutilizable
  content/          padecimientos, estudios, especialistas y recursos
  data/             configuración, navegación, iconos y analítica
  layouts/          documento base, SEO y datos estructurados
  pages/            rutas Astro
  scripts/          interacciones del navegador
  styles/           sistema visual global
public/
  images/           recursos públicos
  .htaccess         reglas Apache, redirecciones y seguridad
scripts/
  validate-production.mjs
  check-links.mjs
```

## Edición de contenidos

Las colecciones se validan en `src/content.config.ts`.

- `src/content/conditions`: padecimientos.
- `src/content/studies`: estudios.
- `src/content/doctors`: especialistas.
- `src/content/resources`: artículos, videos y eventos.

Cada entrada usa `status: published` o `status: draft`. Un borrador genera una ruta para revisión, pero recibe `noindex` y no entra al sitemap público.

Los datos de contacto no deben escribirse dentro de componentes. Se suministran mediante variables de entorno y se exponen desde `src/data/site.ts`.

## Formulario

Sin `PUBLIC_FORM_ENDPOINT`, el botón permanece deshabilitado y el sitio explica que no se enviará información.

El endpoint debe aceptar:

```json
{
  "context": "appointment | contact | study",
  "study": "slug opcional",
  "name": "Nombre",
  "phone": "Teléfono",
  "email": "Correo opcional",
  "reason": "consulta | estudio | resultados | general",
  "message": "Mensaje breve",
  "consent": "on",
  "privacyNoticeVersion": "versión",
  "consentTimestamp": "ISO-8601",
  "website": ""
}
```

Respuesta esperada:

```json
{ "ok": true, "requestId": "identificador-opcional" }
```

La protección real debe incluir validación y sanitización en servidor, límite de frecuencia, comprobación del honeypot, registro de consentimiento y una solución antispam que no exponga secretos.

Si el endpoint vive en otro dominio, se deben configurar CORS y actualizar `connect-src` en `public/.htaccess` y `public/_headers`.

## Analítica

`src/scripts/site.ts` centraliza los eventos. No se incluye ningún ID ficticio.

- `PUBLIC_ANALYTICS_PROVIDER=none`: no transmite datos.
- `dataLayer`: envía eventos a un contenedor previamente cargado.
- `gtag`: utiliza una función `gtag` previamente configurada.

Antes de activar proveedores no esenciales, revisar consentimiento y aviso de privacidad.

## Despliegue

El resultado de `npm run build` es estático y queda en `dist/`.

### Demo en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` valida y despliega automáticamente la rama `main` en:

`https://alebristudio-3d.github.io/unne-demo/`

La demo usa:

```env
SITE_MODE=preview
PUBLIC_SITE_URL=https://alebristudio-3d.github.io
PUBLIC_BASE_PATH=/unne-demo
```

Esto mantiene la demo bloqueada para buscadores y hace que navegación, assets, canonical y sitemap respeten la subruta del repositorio. Para un dominio definitivo, sustituir `PUBLIC_SITE_URL`, dejar `PUBLIC_BASE_PATH=/` y completar las validaciones de producción.

Para Apache:

1. Desplegar en infraestructura limpia.
2. Confirmar que `mod_rewrite` y `mod_headers` estén activos.
3. Permitir `.htaccess`.
4. Verificar redirecciones antiguas y respuesta `410` para `?u=`.
5. Ajustar la CSP si se configura un endpoint o proveedor externo.

No desplegar sobre el servidor anterior sin completar [SECURITY-MIGRATION.md](SECURITY-MIGRATION.md).

## Material visual

El sitio usa ilustración abstracta y placeholders explícitos. No atribuye fotografías de stock a UNNE. Sustituirlos con:

- retratos profesionales con proporción 4:5;
- fotografía horizontal de instalaciones de al menos 1800×1200;
- imágenes de equipo y atención con autorización escrita;
- logo vectorial oficial.
