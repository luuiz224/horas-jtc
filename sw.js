// Service worker do Horas JTC: guarda só a "casca" do site (página, manifesto e ícones) para abrir rápido
// e funcionar como app. NUNCA intercepta outros domínios: a planilha (script.google.com), fontes e sprites
// passam direto pela rede, então os dados sempre vêm frescos.
const CACHE = 'horas-jtc-v1';
const CASCA = ['./', './index.html', './manifest.webmanifest', './icones/icon-192.png', './icones/icon-512.png', './icones/favicon-32.png'];

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Página: rede primeiro (sempre a versão mais nova); sem internet, usa a cópia guardada.
  if (req.mode === 'navigate') {
    ev.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Ícones e manifesto: cache primeiro.
  ev.respondWith(caches.match(req).then(r => r || fetch(req)));
});
