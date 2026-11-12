const K = 'nismcaa-tutor-v4';
const ASSETS = [
  './',
  'manifest.webmanifest',
  'brand/nismtutor-logo.png',
  'brand/nismtutor-mark.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'favicon-32.png',
  'favicon-16.png',
  'apple-touch-icon.png',
  'icon.svg'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(K).then(cache => Promise.all(ASSETS.map(url =>
    fetch(new Request(url, {cache: 'reload'})).then(res => {
      if (!res.ok) throw new Error(url);
      return cache.put(url, res);
    })
  ))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== K).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
