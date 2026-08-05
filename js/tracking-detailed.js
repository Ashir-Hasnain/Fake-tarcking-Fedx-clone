  const copyBtn = document.getElementById('copyBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const urlParams = new URLSearchParams(window.location.search);
  const trackingValue = urlParams.get('trackingNumber') || document.getElementById('trackingValue').textContent.trim();

  document.getElementById('trackingValue').textContent = trackingValue;

  const detailLink = document.querySelector('[data-view-more]');
  if (detailLink) {
    const viewMoreUrl = new URL('./View-more-details.html', window.location.href);
    viewMoreUrl.searchParams.set('trackingNumber', trackingValue);
    detailLink.href = viewMoreUrl.toString();
  }

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(trackingValue);
      copyFeedback.classList.add('visible');
      setTimeout(() => copyFeedback.classList.remove('visible'), 1500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  });

  const scanToggle = document.getElementById('scanToggle');
  scanToggle.addEventListener('click', () => {
    const expanded = scanToggle.getAttribute('aria-expanded') === 'true';
    scanToggle.setAttribute('aria-expanded', String(!expanded));
  });

  loadShipmentData(trackingValue);

  async function loadShipmentData(trackNumber) {
    try {
      const response = await fetch('./data/shipments.json');
      const data = await response.json();
      const shipment = data.shipmentFacts;
      const validTrackingNumber = shipment?.overview?.trackingNumber;

      const trackingCard = document.querySelector('.tracking-card');
      const statusLine = document.querySelector('.status-line');
      const timestampEl = document.querySelector('.timestamp');
      const signedForEl = document.querySelector('.signed-for');
      const routeValues = document.querySelectorAll('.route-value');

      if (trackNumber !== validTrackingNumber) {
        if (trackingCard) {
          trackingCard.innerHTML = `
            <div style="padding: 32px; text-align: center;">
              <h2 style="margin-bottom: 12px;">Invalid tracking number</h2>
              <p style="margin: 0; color: #666;">The tracking ID you entered is not recognized. Please check the number and try again.</p>
            </div>
          `;
        }
        alert('The tracking ID you entered is wrong or not found.');
        return;
      }

      if (statusLine) {
        statusLine.innerHTML = `
          <span class="status-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </span>
          In Process
        `;
      }

      if (timestampEl) {
        timestampEl.textContent = `Tracking number: ${trackNumber}`;
      }

      if (signedForEl) {
        signedForEl.innerHTML = `Tracking ID: <strong>${trackNumber}</strong>`;
      }

      if (routeValues.length >= 2) {
        routeValues[0].textContent = 'In transit';
        routeValues[1].textContent = 'Pending delivery';
      }
    } catch (error) {
      console.error('Error loading shipment data:', error);
    }
  }