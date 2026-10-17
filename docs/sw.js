// Service worker de El Gamblingficador.
// - Páginas (navegación): primero red, y si no hay conexión, la última copia guardada.
// - Imágenes, JS, CSS: se sirven de la copia guardada y se actualizan por detrás.
// - Audio (mp3): siempre por red (el navegador ya los cachea y evita problemas con el streaming).
// Para forzar que todos descarguen una versión nueva, cambia el número de CACHE.
const CACHE = 'gamblingficador-v1';
const PRECARGA = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECARGA)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;              // Analytics y externos: sin tocar
  if (req.headers.has('range') || /\.(mp3|ogg|wav|m4a)$/i.test(url.pathname)) return; // audio

  // Páginas: red primero (así los cambios nuevos llegan al momento)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put('/', copia));
          return res;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Resto: copia guardada al instante y actualización por detrás
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const guardado = await cache.match(req);
      const red = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => guardado || Response.error());
      return guardado || red;
    })
  );
});
