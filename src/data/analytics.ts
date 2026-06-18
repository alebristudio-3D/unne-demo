export const analyticsEvents = [
  'click_whatsapp',
  'click_call',
  'click_email',
  'click_directions',
  'request_appointment',
  'request_study_info',
  'form_start',
  'form_submit',
  'form_success',
  'view_study',
  'view_condition',
  'view_specialist'
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export type AnalyticsPayload = {
  page_path?: string;
  page_type?: string;
  study_name?: string;
  condition_name?: string;
  doctor_name?: string;
  cta_location?: string;
  contact_method?: string;
};
