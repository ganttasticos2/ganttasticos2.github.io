const VERSION = "1.52";
const CACHE = "Ganttasticos-v1.52";

const ARCHIVOS = [
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/LOGO.png",
  "img/Movil.png",
  "img/Escritorio.png",
  "img/oficina.png",
  "img/analisis.png",
  "img/BALTA.png",
  "img/gyn.png",
  "img/HECTOR.png",
  "img/ITATI.png",
  "img/MENDIETA.png",
  "img/ROBER.png",
  "img/Vanne.png",
  "js/lib/registraServiceWorker.js",
  "./"
];

// Instalación: Carga lo que pueda, si algo falla lo ignora pero NO rompe el proceso
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then((cache) => {
      return Promise.allSettled(
        ARCHIVOS.map((url) => cache.add(url))
      ).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.method === "GET") {
    evt.respondWith(
      caches.match(evt.request).then((res) => res || fetch(evt.request))
    );
  }
});