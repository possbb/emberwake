(() => {
  const dictionary = window.siteEnglish;
  const texts = [];
  const attributes = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, .language-switch, #card-count, #viewer-title')) continue;
    const key = node.textContent.trim();
    if (dictionary[key]) texts.push({ node, original: node.textContent, key });
  }
  for (const node of document.querySelectorAll('*')) {
    for (const name of ['alt', 'aria-label', 'placeholder', 'content', 'data-card-title']) {
      const original = node.getAttribute(name);
      if (dictionary[original]) attributes.push({ node, name, original });
    }
  }
  let language = 'zh';
  window.siteLanguage = {
    get current() { return language; },
    t(zh, en) { return language === 'en' ? en : zh; }
  };
  function setLanguage(value, updateUrl = false) {
    language = value === 'en' ? 'en' : 'zh';
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    for (const { node, original, key } of texts) {
      const spacing = node.nextSibling?.nodeName === 'EM' ? ' ' : '';
      node.textContent = language === 'en' ? original.replace(key, dictionary[key] + spacing) : original;
    }
    for (const { node, name, original } of attributes) {
      node.setAttribute(name, language === 'en' ? dictionary[original] : original);
    }
    for (const button of document.querySelectorAll('[data-language]')) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    }
    const gameplay = document.getElementById('gameplay');
    if (gameplay) {
      const path = `media/gameplay-${language}.mp4${language === 'en' ? '?v=goldmark-1' : ''}`;
      const source = gameplay.querySelector('source');
      if (source.getAttribute('src') !== path) {
        gameplay.pause();
        source.src = path;
        gameplay.load();
      }
      gameplay.querySelector('a').href = path;
    }
    const hero = document.getElementById('hero-video');
    if (hero) {
      const path = 'media/paisley-cinematic-clean-30s-20261011.mp4';
      const source = hero.querySelector('source');
      if (source.getAttribute('src') !== path) { source.src = path; hero.load(); }
      if (!hero.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches) hero.play().catch(() => { hero.hidden = true; });
      document.querySelector('.art-note').textContent = language === 'en' ? 'AI cinematic · Not gameplay footage' : 'AI 动画宣传片 · 非实机画面';
    }
    try { localStorage.setItem('paisley-language', language); } catch { /* Switching also works without storage. */ }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    }
    document.dispatchEvent(new CustomEvent('languagechange'));
  }
  for (const button of document.querySelectorAll('[data-language]')) {
    button.addEventListener('click', () => setLanguage(button.dataset.language, true));
  }
  let saved = 'zh';
  try { saved = localStorage.getItem('paisley-language') || 'zh'; } catch { /* Default to Chinese. */ }
  setLanguage(new URLSearchParams(location.search).get('lang') || saved);
})();
