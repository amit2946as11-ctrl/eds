const fields = [
  {
    id: 'company-name',
    label: 'Company Name*',
    type: 'text',
    required: true,
  },
  {
    id: 'experience',
    label: 'Experience in the field*',
    type: 'select',
    required: true,
    options: [
      { value: '', text: 'Enter Details*' },
      { value: '0-1', text: '0-1 years' },
      { value: '1-3', text: '1-3 years' },
      { value: '3-5', text: '3-5 years' },
      { value: '5-plus', text: '5+ years' },
    ],
  },
  {
    id: 'buyer-type',
    label: 'Type of Buyer*',
    type: 'text',
    required: true,
  },
];

function createField(field) {
  const row = document.createElement('div');
  row.className = 'company-form-row';

  const label = document.createElement('label');
  label.setAttribute('for', field.id);
  label.textContent = field.label;

  let control;
  if (field.type === 'select') {
    control = document.createElement('select');
    field.options.forEach((option) => {
      const optionEl = document.createElement('option');
      optionEl.value = option.value;
      optionEl.textContent = option.text;
      control.append(optionEl);
    });
  } else {
    control = document.createElement('input');
    control.type = field.type;
    control.placeholder = 'Enter Details*';
  }

  control.id = field.id;
  control.name = field.id;
  control.required = field.required;
  control.setAttribute('aria-label', field.label.replace('*', ''));

  row.append(label, control);
  return row;
}

function createSectionTitle(text) {
  const title = document.createElement('h2');
  title.className = 'company-form-title';
  title.textContent = text;
  return title;
}

function createAddressRow() {
  const row = document.createElement('div');
  row.className = 'company-form-row company-form-address-row';

  const label = document.createElement('label');
  label.setAttribute('for', 'company-address');
  label.textContent = 'Enter company address';

  const input = document.createElement('input');
  input.id = 'company-address';
  input.name = 'company-address';
  input.type = 'text';
  input.required = true;
  input.placeholder = 'Enter Details*';
  input.setAttribute('aria-label', 'Company address');

  row.append(label, input);
  return row;
}

function createConsent() {
  const consent = document.createElement('label');
  consent.className = 'company-form-consent';
  consent.setAttribute('for', 'company-form-consent');

  const checkbox = document.createElement('input');
  checkbox.id = 'company-form-consent';
  checkbox.name = 'consent';
  checkbox.type = 'checkbox';
  checkbox.checked = true;
  checkbox.required = true;

  const box = document.createElement('span');
  box.className = 'company-form-checkbox';
  box.setAttribute('aria-hidden', 'true');

  const copy = document.createElement('span');
  copy.textContent = "I agree that by clicking the 'Submit' button below, I am explicitly soliciting a call and message via whatsapp or any other medium from Maruti Suzuki India Ltd or its partners on my Mobile'.";

  consent.append(checkbox, box, copy);
  return consent;
}

function createActions() {
  const actions = document.createElement('div');
  actions.className = 'company-form-actions';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Register';

  actions.append(button);
  return actions;
}

/**
 * Decorates a company form block.
 * @param {Element} block The company-form block element
 */
export default function decorate(block) {
  const form = document.createElement('form');
  form.className = 'company-form-panel';
  form.noValidate = false;

  form.append(createSectionTitle('Company Details'));
  fields.forEach((field) => form.append(createField(field)));

  const divider = document.createElement('hr');
  divider.className = 'company-form-divider';
  form.append(divider);

  form.append(createSectionTitle('Address'));
  form.append(createAddressRow());
  form.append(createConsent());
  form.append(createActions());

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reportValidity();
  });

  block.replaceChildren(form);
}
