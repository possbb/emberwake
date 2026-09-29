const heroVideo = document.getElementById('hero-video');
const finishHero = () => {
  heroVideo.pause();
  heroVideo.hidden = true;
};
heroVideo.addEventListener('ended', finishHero, { once: true });
heroVideo.addEventListener('error', finishHero, { once: true });
heroVideo.muted = true;
heroVideo.play().catch(finishHero);

const videos = [...document.querySelectorAll('.film video')];
for (const video of videos) {
  video.addEventListener('play', () => {
    finishHero();
    for (const other of videos) if (other !== video) other.pause();
  });
}
for (const link of document.querySelectorAll('[data-watch]')) {
  link.addEventListener('click', (event) => {
    const video = document.getElementById(link.dataset.watch);
    if (!video) return;
    event.preventDefault();
    video.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    video.focus({ preventScroll: true });
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  });
}
