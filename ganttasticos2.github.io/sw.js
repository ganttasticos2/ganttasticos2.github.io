/* Este archivo debe estar colocado en la carpeta raíz del sitio. */

const VERSION = "1.33"
const CACHE = "Ganttasticos-v1.12"

const ARCHIVOS = [
  "favicon.ico",
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/analisis.png",
  "img/BALTA.png",
  "img/gyn.png",
  "img/FRENTEGANT.png",
  "img/HECTOR.png",
  "img/ITATI.png",
  "img/iu.png",
  "img/LOGO.png",
  "img/MENDIETA.png",
  "img/PSICO.png",
  "img/psicologos.png",
  "img/pwa.png",
  "img/ROBER.png",
  "img/sync.png",
  "img/Vanne.png",
  "img/web.png",
  "img/Movil.png",
  "img/Escritorio.png",
  "js/lib/registraServiceWorker.js",
  "/"
];
if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    console.log("El service ganttastico se está instalando.");
    evt.waitUntil(llenaElCache());
  });

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  self.addEventListener("activate", () => {
    console.log("El service ganttastico está activo.");
  });
}

async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE);
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  const cache = await caches.open(CACHE);
  // Importante: Si uno de los ARCHIVOS no existe, esto fallará.
  await cache.addAll(ARCHIVOS);
  console.log("Caché cargado con éxito");
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  return response || fetch(evt.request);
}