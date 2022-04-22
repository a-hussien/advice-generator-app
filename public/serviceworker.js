const CACHE_NAME = "v1";
const CACHE_ROUTES = ['index.html', 'offline.html'];

// Install Service Worker
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(CACHE_ROUTES);
        })
    )
})

// Listen for events
this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
                    .catch(() => caches.match(['offline.html']))
        })
    )
})

// Activate Service Worker
this.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys()
        .then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
    
})