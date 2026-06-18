# Validación requerida por UNNE

No cambiar `SITE_MODE` a `production` hasta completar esta lista.

## Prioridad crítica

- [ ] Nombre comercial y descriptor.
- [ ] Razón social responsable.
- [ ] Teléfono principal.
- [ ] WhatsApp.
- [ ] Teléfono secundario, si se publicará.
- [ ] Horarios vigentes.
- [ ] Correo de citas.
- [ ] Correo administrativo y ARCO.
- [ ] Dirección estandarizada.
- [ ] URL oficial de Google Maps.
- [ ] Lista de médicos activos.
- [ ] Cédulas y certificaciones vigentes.
- [ ] Estudios y servicios activos.
- [ ] Preparación y duración de cada estudio.
- [ ] Edades atendidas.
- [ ] Requisitos de orden y acompañante.
- [ ] Entrega de resultados.
- [ ] Métodos de pago, facturación y convenios.
- [ ] Política de consulta en línea.
- [ ] Aviso de privacidad revisado y aprobado.

## Integraciones

- [ ] Endpoint seguro del formulario.
- [ ] Responsable y proceso para responder solicitudes.
- [ ] Protección antispam y límite de frecuencia.
- [ ] Cuenta y configuración de analítica, si se utilizará.
- [ ] Search Console y Google Business Profile.
- [ ] Dominio, DNS y hosting limpios.

## Material visual

- [ ] Logo vectorial original y manual de marca.
- [ ] Fotografías profesionales de especialistas.
- [ ] Fotografías de instalaciones y equipo.
- [ ] Autorizaciones de imagen.
- [ ] Canal oficial y derechos de videos.

## Activación técnica

1. Completar variables en `.env`.
2. Marcar contenidos aprobados con `status: published`.
3. Sustituir el borrador legal por el texto aprobado.
4. Establecer las tres banderas `PUBLIC_*_APPROVED=true`.
5. Ejecutar `npm run check`.
6. Ejecutar `npm run build`.
7. Ejecutar `npm run test:links`.
8. Revisar visualmente el build antes de desplegar.
