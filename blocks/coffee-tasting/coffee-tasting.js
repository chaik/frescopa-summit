function getAvailability(zipCode) {
  // Mock data - in the future, this will make an API call to a remote booking service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        zipCode,
        locations: [
          {
            name: 'Frescopa Midtown',
            address: '123 Main St, New York, NY 10001',
            distance: '0.3 mi',
            timeSlots: ['3:30 PM'],
          },
          {
            name: 'Frescopa Gramercy',
            address: '456 Park Ave S, New York, NY 10003',
            distance: '1.2 mi',
            timeSlots: ['4:00 PM'],
          },
          {
            name: 'Frescopa SoHo',
            address: '789 Broadway, New York, NY 10012',
            distance: '2.1 mi',
            timeSlots: ['2:00 PM', '5:30 PM'],
          },
        ],
      });
    }, 500);
  });
}

function showConfirmation(overlay, location, time) {
  const modal = overlay.querySelector('.coffee-tasting-modal');
  modal.innerHTML = '';

  const icon = document.createElement('div');
  icon.className = 'coffee-tasting-confirm-icon';
  icon.textContent = '\u2713';

  const title = document.createElement('h3');
  title.className = 'coffee-tasting-confirm-title';
  title.textContent = 'Reservation Confirmed!';

  const details = document.createElement('div');
  details.className = 'coffee-tasting-confirm-details';

  const msgP = document.createElement('p');
  msgP.textContent = 'Your coffee bean tasting experience has been booked.';
  const locP = document.createElement('p');
  locP.innerHTML = `<strong>Location:</strong> ${location.name}`;
  const addrP = document.createElement('p');
  addrP.innerHTML = `<strong>Address:</strong> ${location.address}`;
  const timeP = document.createElement('p');
  timeP.innerHTML = `<strong>Time:</strong> ${time}`;
  details.append(msgP, locP, addrP, timeP);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'coffee-tasting-done-btn';
  doneBtn.textContent = 'Done';
  doneBtn.addEventListener('click', () => overlay.remove());

  modal.append(icon, title, details, doneBtn);
}

function createModal(data) {
  const overlay = document.createElement('div');
  overlay.className = 'coffee-tasting-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Nearby Frescopa Locations');

  const modal = document.createElement('div');
  modal.className = 'coffee-tasting-modal';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'coffee-tasting-modal-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => overlay.remove());

  const title = document.createElement('h3');
  title.className = 'coffee-tasting-modal-title';
  title.textContent = 'Nearby Frescopa Locations';

  const subtitle = document.createElement('p');
  subtitle.className = 'coffee-tasting-modal-subtitle';
  subtitle.textContent = `Showing results for zip code ${data.zipCode}`;

  const results = document.createElement('div');
  results.className = 'coffee-tasting-results';

  const actions = document.createElement('div');
  actions.className = 'coffee-tasting-modal-actions';

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'coffee-tasting-confirm-btn';
  confirmBtn.textContent = 'Confirm Reservation';
  confirmBtn.disabled = true;

  let selectedLocation = null;
  let selectedTime = null;
  let selectedCard = null;
  let selectedTimeBtn = null;

  confirmBtn.addEventListener('click', () => {
    if (selectedLocation && selectedTime) {
      showConfirmation(overlay, selectedLocation, selectedTime);
    }
  });

  data.locations.forEach((loc) => {
    const card = document.createElement('div');
    card.className = 'coffee-tasting-location-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'coffee-tasting-location-header';

    const nameEl = document.createElement('h4');
    nameEl.className = 'coffee-tasting-location-name';
    nameEl.textContent = loc.name;

    const distEl = document.createElement('span');
    distEl.className = 'coffee-tasting-location-distance';
    distEl.textContent = loc.distance;

    cardHeader.append(nameEl, distEl);

    const addressEl = document.createElement('p');
    addressEl.className = 'coffee-tasting-location-address';
    addressEl.textContent = loc.address;

    const timesDiv = document.createElement('div');
    timesDiv.className = 'coffee-tasting-time-slots';

    loc.timeSlots.forEach((time) => {
      const timeBtn = document.createElement('button');
      timeBtn.className = 'coffee-tasting-time-btn';
      timeBtn.textContent = time;
      timeBtn.addEventListener('click', () => {
        if (selectedTimeBtn) selectedTimeBtn.classList.remove('selected');
        if (selectedCard) selectedCard.classList.remove('selected');
        timeBtn.classList.add('selected');
        card.classList.add('selected');
        selectedTimeBtn = timeBtn;
        selectedCard = card;
        selectedLocation = loc;
        selectedTime = time;
        confirmBtn.disabled = false;
      });
      timesDiv.append(timeBtn);
    });

    card.append(cardHeader, addressEl, timesDiv);
    results.append(card);
  });

  actions.append(confirmBtn);
  modal.append(closeBtn, title, subtitle, results, actions);
  overlay.append(modal);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Close on Escape
  const escHandler = (ev) => {
    if (ev.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  return overlay;
}

export default function decorate(block) {
  const rows = [...block.children];
  const leftCol = rows[0]?.children[0];
  const rightCol = rows[0]?.children[1];

  block.innerHTML = '';

  // Left panel
  const panel = document.createElement('div');
  panel.className = 'coffee-tasting-panel';

  const heading = leftCol?.querySelector('h2');
  if (heading) {
    heading.className = 'coffee-tasting-title';
    panel.append(heading);
  }

  const labelP = leftCol?.querySelector('p');
  if (labelP) {
    labelP.className = 'coffee-tasting-label';
    panel.append(labelP);
  }

  const searchDiv = document.createElement('div');
  searchDiv.className = 'coffee-tasting-search';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'coffee-tasting-input';
  input.placeholder = 'Zip code';
  input.setAttribute('aria-label', 'Enter zip code');
  input.maxLength = 10;

  const searchBtn = document.createElement('button');
  searchBtn.type = 'button';
  searchBtn.className = 'coffee-tasting-search-btn';
  searchBtn.textContent = 'Search';

  searchDiv.append(input, searchBtn);
  panel.append(searchDiv);

  // Right panel (map placeholder)
  const mapDiv = document.createElement('div');
  mapDiv.className = 'coffee-tasting-map';

  if (rightCol) {
    const img = rightCol.querySelector('img') || rightCol.querySelector('picture');
    if (img) {
      mapDiv.append(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'coffee-tasting-map-placeholder';
      placeholder.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
        <span>Map View</span>`;
      mapDiv.append(placeholder);
    }
  }

  block.append(panel, mapDiv);

  // Event listeners
  async function handleSearch() {
    const zip = input.value.trim();
    if (!zip) {
      input.focus();
      return;
    }
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
    try {
      const data = await getAvailability(zip);
      const modalEl = createModal(data);
      document.body.append(modalEl);
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = 'Search';
    }
  }

  searchBtn.addEventListener('click', handleSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}
