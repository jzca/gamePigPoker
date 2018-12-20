//How to put things into Caches, during installing, before activate.
// L6 Open or If no Cache, create it. index be detailed
const staticCache = 'my-cache-1';

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheName => {
			return Promise.all(
				cacheName.filter(cacheName => {
					return cacheName.startsWith('my-') && cacheName !== staticCache
				}).map(cacheName => {
					return caches.delete(cacheName);
				})
			)
		})
	)
})

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(staticCache).then(function (cache) {
			return cache.addAll(
				[
					'js/app.js',
				]
			);
		})
	);
});

		//Cache First, NetWork Second. 
		// if caches have request, give the response.
		// False? => Go out and Fetch
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request)
		})
	);
});
