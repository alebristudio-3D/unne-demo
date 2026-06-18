/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_MODE?: 'preview' | 'production';
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_BASE_PATH?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: 'none' | 'gtag' | 'dataLayer';
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_CLINIC_PHONE?: string;
  readonly PUBLIC_CLINIC_WHATSAPP?: string;
  readonly PUBLIC_CLINIC_EMAIL?: string;
  readonly PUBLIC_CLINIC_ADDRESS?: string;
  readonly PUBLIC_CLINIC_MAP_URL?: string;
  readonly PUBLIC_CLINIC_WEEKDAY_HOURS?: string;
  readonly PUBLIC_CLINIC_SATURDAY_HOURS?: string;
  readonly PUBLIC_CONTACT_APPROVED?: string;
  readonly PUBLIC_DOCTOR_PROFILES_APPROVED?: string;
  readonly PUBLIC_PRIVACY_NOTICE_APPROVED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
