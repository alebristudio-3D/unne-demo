import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const mode = process.env.SITE_MODE || 'preview';
if (mode !== 'production') {
  console.log('Production gate: preview mode, publication requirements are not enforced.');
  process.exit(0);
}

const errors = [];
const requiredTrue = [
  ['PUBLIC_CONTACT_APPROVED', 'Los datos de contacto no están aprobados.'],
  ['PUBLIC_DOCTOR_PROFILES_APPROVED', 'Los perfiles médicos no están aprobados.'],
  ['PUBLIC_PRIVACY_NOTICE_APPROVED', 'El aviso de privacidad no está aprobado.']
];

for (const [name, message] of requiredTrue) {
  if (process.env[name] !== 'true') errors.push(`${name}: ${message}`);
}

if (!process.env.PUBLIC_SITE_URL?.startsWith('https://')) {
  errors.push('PUBLIC_SITE_URL debe ser una URL HTTPS definitiva.');
}

const contact = [
  process.env.PUBLIC_CLINIC_PHONE,
  process.env.PUBLIC_CLINIC_EMAIL,
  process.env.PUBLIC_CLINIC_WHATSAPP
].filter(Boolean);
if (contact.length === 0) errors.push('Se requiere al menos un canal de contacto aprobado.');

if (!process.env.PUBLIC_CLINIC_ADDRESS || !process.env.PUBLIC_CLINIC_MAP_URL) {
  errors.push('La dirección y URL del mapa deben estar confirmadas.');
}

if (!process.env.PUBLIC_FORM_ENDPOINT?.startsWith('https://')) {
  errors.push('PUBLIC_FORM_ENDPOINT debe ser un endpoint HTTPS real.');
}

const doctorDir = path.resolve('src/content/doctors');
const doctorFiles = (await readdir(doctorDir)).filter((file) => file.endsWith('.md'));
const doctorBodies = await Promise.all(doctorFiles.map((file) => readFile(path.join(doctorDir, file), 'utf8')));
if (!doctorBodies.some((body) => /^status:\s*published\s*$/m.test(body))) {
  errors.push('Debe existir al menos un perfil médico con status: published.');
}

const privacy = await readFile(path.resolve('src/pages/aviso-de-privacidad/index.astro'), 'utf8');
if (/Borrador|pendiente de revisión|no constituye todavía/i.test(privacy)) {
  errors.push('El archivo del aviso de privacidad todavía contiene marcas de borrador.');
}

if (errors.length) {
  console.error('\nEl build de producción fue bloqueado:\n');
  for (const error of errors) console.error(`- ${error}`);
  console.error('\nConsulta CLIENT-VALIDATION.md antes de publicar.\n');
  process.exit(1);
}

console.log('Production gate: required publication data is present.');
