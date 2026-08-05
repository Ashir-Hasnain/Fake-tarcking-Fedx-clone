const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// Wire up validation + submit per panel (any required text input/select empty => disabled)
document.querySelectorAll('.track-form').forEach(form => {
  const requiredFields = form.querySelectorAll('input[type="text"], select');
  const btn = form.querySelector('.track-btn');

  function validate() {
    const allFilled = Array.from(requiredFields).every(f => f.value.trim() !== '');
    btn.disabled = !allFilled;
    btn.classList.toggle('enabled', allFilled);
  }

  requiredFields.forEach(f => {
    f.addEventListener('input', validate);
    f.addEventListener('change', validate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!btn.disabled) {
      const trackingValue = Array.from(requiredFields)
        .map(f => f.value.trim())
        .find(value => value !== '');

      if (!trackingValue) return;

      const detailUrl = new URL('fedex-tracking-detailed.html', window.location.href);
      detailUrl.searchParams.set('trackingNumber', trackingValue);
      window.location.href = detailUrl.toString();
    }
  });
});