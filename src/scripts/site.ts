import type { AnalyticsEvent, AnalyticsPayload } from '../data/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    unneTrack?: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
  }
}

const provider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER ?? 'none';

function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  const cleanPayload = {
    page_path: window.location.pathname,
    page_type: document.body.dataset.pageType ?? 'page',
    ...payload
  };

  if (provider === 'gtag' && typeof window.gtag === 'function') {
    window.gtag('event', event, cleanPayload);
  } else if (provider === 'dataLayer' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...cleanPayload });
  } else if (import.meta.env.DEV) {
    console.info('[UNNE analytics]', event, cleanPayload);
  }
}

window.unneTrack = track;

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const siteNav = document.querySelector<HTMLElement>('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav?.classList.contains('is-open')) {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.focus();
  }
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll<HTMLElement>('[data-track]').forEach((element) => {
  element.addEventListener('click', () => {
    const event = element.dataset.track as AnalyticsEvent;
    track(event, {
      cta_location: element.dataset.location,
      study_name: element.dataset.name,
      condition_name: element.dataset.condition,
      doctor_name: element.dataset.doctor
    });
  });
});

document.querySelectorAll<HTMLDetailsElement>('.faq-list details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      track('form_start', { cta_location: 'faq' });
    }
  });
});

const filterRoot = document.querySelector<HTMLElement>('[data-filter-root]');
if (filterRoot) {
  const items = Array.from(filterRoot.querySelectorAll<HTMLElement>('[data-filter-item]'));
  const chips = Array.from(filterRoot.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const search = filterRoot.querySelector<HTMLInputElement>('[data-filter-search]');
  const empty = filterRoot.querySelector<HTMLElement>('[data-filter-empty]');
  let activeCategory = 'all';

  const updateFilter = () => {
    const query = search?.value.trim().toLowerCase() ?? '';
    let visible = 0;

    items.forEach((item) => {
      const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
      const matchesQuery = !query || (item.dataset.search ?? '').includes(query);
      const show = matchesCategory && matchesQuery;
      item.hidden = !show;
      if (show) visible += 1;
    });

    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeCategory = chip.dataset.filter ?? 'all';
      chips.forEach((current) => current.setAttribute('aria-pressed', String(current === chip)));
      updateFilter();
    });
  });

  search?.addEventListener('input', updateFilter);
}

const errorMessages: Record<string, string> = {
  valueMissing: 'Este campo es obligatorio.',
  typeMismatch: 'Escribe un correo válido.',
  tooShort: 'Escribe al menos 2 caracteres.'
};

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const enabled = form.dataset.enabled === 'true';
  let started = false;

  const setError = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const error = field.closest('.field')?.querySelector<HTMLElement>('.field-error');
    const validityKey = Object.keys(errorMessages).find((key) => field.validity[key as keyof ValidityState]);
    const message = field.validity.valid ? '' : errorMessages[validityKey ?? 'valueMissing'];
    field.setAttribute('aria-invalid', String(!field.validity.valid));
    if (error) error.textContent = message;
    return field.validity.valid;
  };

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((field) => {
    field.addEventListener('focus', () => {
      if (!started) {
        started = true;
        track('form_start', { cta_location: form.querySelector<HTMLInputElement>('[name="context"]')?.value });
      }
    }, { once: true });
    field.addEventListener('blur', () => setError(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') setError(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!enabled) {
      if (status) {
        status.textContent = 'El envío está deshabilitado hasta configurar un endpoint seguro.';
        status.className = 'form-status error';
      }
      return;
    }

    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea'))
      .filter((field) => field.name !== 'website');
    const valid = fields.every(setError);
    if (!valid) {
      fields.find((field) => !field.validity.valid)?.focus();
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) return;

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.consentTimestamp = new Date().toISOString();
    track('form_submit', { cta_location: String(payload.context ?? 'contact') });

    try {
      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Enviando…';
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Request failed');

      form.reset();
      if (status) {
        status.textContent = 'Recibimos tu solicitud. El equipo de UNNE se pondrá en contacto contigo.';
        status.className = 'form-status success';
      }
      track('form_success', { cta_location: String(payload.context ?? 'contact') });
    } catch {
      if (status) {
        status.textContent = 'No fue posible enviar la solicitud. Intenta nuevamente o utiliza otro canal confirmado.';
        status.className = 'form-status error';
      }
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Enviar solicitud';
      }
    }
  });
});
