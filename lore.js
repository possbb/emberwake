const cards = [...document.querySelectorAll('.lore-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.getElementById('card-search');
let category = '全部';
function filterCards() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const card of cards) {
    card.hidden = !((category === '全部' || card.dataset.category === category) && (card.querySelector('[data-card-title]')?.dataset.cardTitle || '').toLocaleLowerCase().includes(query));
    if (!card.hidden) count++;
  }
  document.getElementById('card-count').textContent = window.siteLanguage.t(`共 ${count} 张参考故事卡 · 点击卡面可放大`, `${count} reference ${count === 1 ? 'card' : 'cards'} · Select a card to enlarge`);
  document.getElementById('card-empty').hidden = count !== 0;
}
for (const button of filters) button.addEventListener('click', () => {
  category = button.dataset.filter;
  for (const other of filters) other.setAttribute('aria-pressed', String(other === button));
  filterCards();
});
search.addEventListener('input', filterCards);
const viewer = document.getElementById('card-viewer');
for (const link of document.querySelectorAll('[data-card-title]')) link.addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('viewer-title').textContent = link.dataset.cardTitle;
  document.getElementById('viewer-image').src = link.href;
  document.getElementById('viewer-image').alt = window.siteLanguage.t(`${link.dataset.cardTitle}完整参考故事卡`, `${link.dataset.cardTitle} — full reference card`);
  viewer.currentLink = link;
  const original = document.getElementById('viewer-original');
  if (original) original.href = link.href;
  viewer.showModal();
});
document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
document.addEventListener('languagechange', () => {
  filterCards();
  if (viewer.open && viewer.currentLink) {
    document.getElementById('viewer-title').textContent = viewer.currentLink.dataset.cardTitle;
    document.getElementById('viewer-image').alt = window.siteLanguage.t(`${viewer.currentLink.dataset.cardTitle}完整参考故事卡`, `${viewer.currentLink.dataset.cardTitle} — full reference card`);
  }
});
filterCards();
