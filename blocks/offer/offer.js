export default function decorate(block) {
  const rows = [...block.children];
  // Expected content model:
  // Row 0: background image
  // Row 1: pre-title text
  // Row 2: detail text
  // Row 3: headline text
  // Row 4: CTA link

  block.classList.add('offer-block');

  const bgRow = rows[0];
  const picture = bgRow?.querySelector('picture');

  const preTitle = rows[1]?.textContent?.trim() || '';
  const detail = rows[2]?.textContent?.trim() || '';
  const headline = rows[3]?.textContent?.trim() || '';
  const ctaRow = rows[4];
  const ctaLink = ctaRow?.querySelector('a');
  const ctaText = ctaLink?.textContent || ctaRow?.textContent?.trim() || '';

  block.innerHTML = '';

  if (picture) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'offer-background';
    bgDiv.append(picture);
    block.append(bgDiv);
  }

  const overlay = document.createElement('div');
  overlay.className = 'offer-overlay';

  if (preTitle) {
    const pre = document.createElement('p');
    pre.className = 'offer-pretitle';
    pre.textContent = preTitle;
    overlay.append(pre);
  }

  if (detail) {
    const det = document.createElement('p');
    det.className = 'offer-detail';
    det.textContent = detail;
    overlay.append(det);
  }

  if (headline) {
    const h = document.createElement('h2');
    h.className = 'offer-headline';
    h.textContent = headline;
    overlay.append(h);
  }

  if (ctaText) {
    const ctaP = document.createElement('p');
    ctaP.className = 'offer-cta';
    if (ctaLink) {
      ctaLink.className = 'button primary';
      ctaP.append(ctaLink);
    } else {
      const btn = document.createElement('a');
      btn.href = '#';
      btn.className = 'button primary';
      btn.textContent = ctaText;
      ctaP.append(btn);
    }
    overlay.append(ctaP);
  }

  block.append(overlay);
}
