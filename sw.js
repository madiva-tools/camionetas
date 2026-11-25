// Service Worker — MADIVA Control Camionetas
const CACHE = "madiva-cam-v1";
const ASSETS = ["./index.html", "./manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Para el POST al script no cachear nada
  if (e.request.method === "POST") return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
