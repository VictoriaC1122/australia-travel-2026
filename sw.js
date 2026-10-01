const CACHE_NAME = "australia-guide-v20261002-r2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20261002-r2",
  "./script.js?v=20261002-r2",
  "./manifest.webmanifest",
  "./assets/app-icon.svg",
  "./assets/opera-house-hero.svg",
  "./assets/opera-house-harbour.jpg",
  "./assets/melbourne-degraves.jpg",
  "./assets/twelve-apostles.jpg",
  "./assets/day1-melbourne-skyline.jpg",
  "./assets/day3-phillip-island-sunset.jpg",
  "./assets/day4-darling-harbour.jpg",
  "./assets/day6-qvb-sydney.jpg",
  "./assets/airline-ci-badge.svg",
  "./assets/airline-jetstar-badge.svg",
  "./assets/corolla-rental-card.svg",
  "./assets/souvenir-aesop-card.svg",
  "./assets/souvenir-timtam-card.svg",
  "./assets/souvenir-merino.jpg",
  "./assets/souvenir-opal.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("australia-guide-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return (await caches.match(request)) || caches.match("./index.html");
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  event.respondWith(request.mode === "navigate" ? networkFirst(request) : cacheFirst(request));
});
