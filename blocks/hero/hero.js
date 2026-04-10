export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // Wrap content in a content div
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  rows.forEach((row) => {
    while (row.firstElementChild) {
      const child = row.firstElementChild;
      // Move picture elements outside the content flow for absolute positioning
      if (child.querySelector('picture') && child.children.length === 1) {
        const picture = child.querySelector('picture');
        block.append(picture);
      } else {
        // Move all child content to content div
        while (child.firstChild) {
          contentDiv.append(child.firstChild);
        }
      }
      child.remove();
    }
    row.remove();
  });

  block.prepend(contentDiv);
}
