export default function decorate(block) {
  const rows = [...block.children];
  const imageDiv = rows[0]?.children[0];
  const contentDiv = rows[0]?.children[1];

  if (!imageDiv || !contentDiv) return;

  block.innerHTML = '';

  const bannerImage = document.createElement('div');
  bannerImage.className = 'banner-image';
  const img = imageDiv.querySelector('picture') || imageDiv.querySelector('img');
  if (img) bannerImage.append(img);

  const bannerContent = document.createElement('div');
  bannerContent.className = 'banner-content';

  const h2 = contentDiv.querySelector('h2');
  if (h2) bannerContent.append(h2);

  const desc = contentDiv.querySelector('p:not(.button-wrapper)');
  if (desc) bannerContent.append(desc);

  const cta = contentDiv.querySelector('.button-wrapper') || contentDiv.querySelector('p:last-child');
  if (cta) bannerContent.append(cta);

  const accent = document.createElement('div');
  accent.className = 'banner-accent';
  accent.setAttribute('aria-hidden', 'true');

  block.append(bannerImage);
  block.append(bannerContent);
  block.append(accent);
}
