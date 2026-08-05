document.addEventListener("DOMContentLoaded", () => {
  fetchTrackingData();
});

async function fetchTrackingData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingNumber = urlParams.get('trackingNumber') || '';

    const response = await fetch('./data/shipments.json');
    const data = await response.json();

    if (trackingNumber && data.shipmentFacts?.overview?.trackingNumber !== trackingNumber) {
      console.warn('Tracking number does not match the loaded shipment data.');
    }

    renderTimeline(data.travelHistory || []);
    renderTables(data.shipmentFacts);
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
}

function renderTimeline(history) {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = history.map(group => `
    <div class="timeline-group">
      <div class="date-row">${group.date}</div>
      ${group.events.map(event => `
        <div class="timeline-item">
          <div class="time">${event.time}</div>
          <div class="status-dot-container">
            <div class="dot ${event.isDelivered ? 'delivered' : ''}"></div>
          </div>
          <div class="status-desc">${event.isDelivered ? `<strong>${event.status}</strong>` : event.status}</div>
          <div class="location">${event.location}</div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function renderTables(facts) {
  const overviewTable = document.getElementById('table-overview');
  const servicesTable = document.getElementById('table-services');
  const packageTable = document.getElementById('table-package');

  if (overviewTable) {
    overviewTable.innerHTML = `
      <tr><td class="label">TRACKING NUMBER</td><td class="value">${facts.overview.trackingNumber}</td></tr>
      <tr><td class="label">SHIP DATE <span class="info-icon">?</span></td><td class="value">${facts.overview.shipDate}</td></tr>
      <tr><td class="label">STANDARD TRANSIT <span class="info-icon">?</span></td><td class="value">${facts.overview.standardTransit}</td></tr>
      <tr><td class="label">DELIVERED <span class="info-icon">?</span></td><td class="value">${facts.overview.delivered}</td></tr>
    `;
  }

  if (servicesTable) {
    servicesTable.innerHTML = `
      <tr><td class="label">SERVICE</td><td class="value">${facts.services.service}</td></tr>
      <tr><td class="label">TERMS</td><td class="value">${facts.services.terms}</td></tr>
    `;
  }

  if (packageTable) {
    packageTable.innerHTML = `
      <tr><td class="label">WEIGHT</td><td class="value">${facts.packageDetails.weight}</td></tr>
      <tr><td class="label">DIMENSIONS</td><td class="value">${facts.packageDetails.dimensions}</td></tr>
      <tr><td class="label">TOTAL PIECES</td><td class="value">${facts.packageDetails.totalPieces}</td></tr>
      <tr><td class="label">PACKAGING</td><td class="value">${facts.packageDetails.packaging}</td></tr>
    `;
  }
}