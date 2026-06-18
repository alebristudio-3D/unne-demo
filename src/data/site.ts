export type ApprovalState = 'approved' | 'pending' | 'conflict';

export interface ManagedValue {
  value: string;
  state: ApprovalState;
  source: string;
  publish: boolean;
}

const approved = (value: string | undefined, flag: boolean): ManagedValue => ({
  value: value?.trim() ?? '',
  state: flag && value ? 'approved' : 'pending',
  source: flag ? 'client-approved environment' : 'pending client validation',
  publish: Boolean(flag && value)
});

const contactApproved = import.meta.env.PUBLIC_CONTACT_APPROVED === 'true';

export const siteMode = import.meta.env.SITE_MODE === 'production' ? 'production' : 'preview';
export const isPreview = siteMode === 'preview';

export const clinicConfig = {
  name: 'UNNE',
  descriptor: 'Unidad de Neurología y Neurofisiología Especializada',
  legacyName: 'UNNE Ciencias Neurológicas',
  legalEntity: {
    value: 'Electrodiagnóstico Cerebral de Puebla, S.C.',
    state: 'pending',
    source: 'aviso de privacidad 2021',
    publish: false
  } satisfies ManagedValue,
  phonePrimary: approved(import.meta.env.PUBLIC_CLINIC_PHONE, contactApproved),
  whatsapp: approved(import.meta.env.PUBLIC_CLINIC_WHATSAPP, contactApproved),
  email: approved(import.meta.env.PUBLIC_CLINIC_EMAIL, contactApproved),
  address: approved(import.meta.env.PUBLIC_CLINIC_ADDRESS, contactApproved),
  mapUrl: approved(import.meta.env.PUBLIC_CLINIC_MAP_URL, contactApproved),
  weekdayHours: approved(import.meta.env.PUBLIC_CLINIC_WEEKDAY_HOURS, contactApproved),
  saturdayHours: approved(import.meta.env.PUBLIC_CLINIC_SATURDAY_HOURS, contactApproved),
  social: {
    instagram: 'https://www.instagram.com/unne_puebla/'
  },
  privacyNoticeVersion: 'BORRADOR-2026-06'
} as const;

export const formEndpoint = import.meta.env.PUBLIC_FORM_ENDPOINT?.trim() ?? '';
export const formEnabled = formEndpoint.startsWith('https://');

export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Padecimientos', href: '/padecimientos/' },
  { label: 'Estudios', href: '/estudios/' },
  { label: 'Especialistas', href: '/especialistas/' },
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Contacto', href: '/contacto/' }
] as const;

export const legacyRedirects: Record<string, string> = {
  '/index.html': '/',
  '/servicios.html': '/padecimientos/',
  '/epilepsia.html': '/padecimientos/epilepsia/',
  '/sueno.html': '/padecimientos/trastornos-del-sueno/',
  '/movimiento.html': '/padecimientos/trastornos-del-movimiento/',
  '/nosotros.html': '/nosotros/',
  '/estudios.html': '/estudios/',
  '/eventos.html': '/recursos/eventos/',
  '/videos.html': '/recursos/videos/',
  '/blog.html': '/recursos/blog/',
  '/contacto.html': '/contacto/',
  '/aviso_de_privacidad.html': '/aviso-de-privacidad/'
};
