/* Este archivo debe estar colocado en la carpeta raíz del sitio. */

const VERSION = "1.47"
const CACHE = "Ganttasticos-v1.47" // Nueva versión para forzar limpieza

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
  "img/oficina.png", // La mantenemos para intentar cargarla
  "img/Escritorio.png",
  "js/lib/registraServiceWorker.js",
  "./" 
];

if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    console.log("Instalando versión:", VERSION);
    evt.waitUntil(llenaElCache());
  });

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  self.addEventListener("activate", (evt) => {
    console.log("Service Worker activo v:", VERSION);
    // Eliminar cachés antiguos
    evt.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
        );
      })
    );
    evt.waitUntil(self.clients.claim());
  });
}

// ESTA FUNCIÓN ES LA QUE SOLUCIONA TU PROBLEMA
async function llenaElCache() {
  const cache = await caches.open(CACHE);
  console.log("Intentando cargar archivos individualmente...");
  
  // En lugar de addAll, usamos promesas individuales
  const promesas = ARCHIVOS.map(async (url) => {
    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error(`Fallo al buscar ${url}`);
      await cache.put(url, respuesta);
    } catch (error) {
      console.warn("No se pudo guardar en caché (se saltará):", url);
    }
  });

  await Promise.all(promesas);
  console.log("Caché cargado (archivos faltantes fueron ignorados)");
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  return response || fetch(evt.request);
}