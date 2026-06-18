export type IconName =
  | 'arrow'
  | 'brain'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'close'
  | 'document'
  | 'heart'
  | 'location'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'muscle'
  | 'phone'
  | 'search'
  | 'shield'
  | 'spark'
  | 'whatsapp';

export const icons: Record<IconName, string> = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  brain: '<path d="M9.5 4.5A3 3 0 0 0 4 6v1.2A3.5 3.5 0 0 0 3 14a3 3 0 0 0 3 4h3.5m5-13.5A3 3 0 0 1 20 6v1.2a3.5 3.5 0 0 1 1 6.8 3 3 0 0 1-3 4h-3.5M9.5 4.5V20m5-15.5V20M7 9h2.5m5 0H17M7 14h2.5m5 0H17"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  location: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
  muscle: '<path d="M5 13c2-1 3-4 3-7 3 0 4 2 4 4h3c4 0 6 2 6 5s-3 5-7 5H8c-3 0-5-2-5-4 0-1 .7-2 2-3Z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/>',
  spark: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3ZM5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z"/>',
  whatsapp: '<path d="M20.5 3.5A11 11 0 0 0 3.2 16.8L2 22l5.3-1.2A11 11 0 1 0 20.5 3.5Z"/><path d="M8.2 7.8c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5l.8 2c.1.3.1.5-.1.7l-.7.9c-.2.2-.3.4-.1.7.4.8 1 1.5 1.7 2.1.7.6 1.5 1 2.3 1.3.3.1.5 0 .7-.2l.9-1.1c.2-.3.5-.3.8-.2l2 .9c.3.1.5.2.5.4v.6c-.1.8-.5 1.5-1.1 2-1 .8-2.3.8-3.4.5-1.5-.4-3.4-1.2-5.3-2.9-1.5-1.3-2.7-3-3.3-4.6-.6-1.4-.1-2.7.5-3.4l.9-.7Z"/>'
};
