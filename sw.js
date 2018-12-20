//How to put things into Caches, during installing, before activate.
// L6 Open or If no Cache, create it. index be detailed
const staticCache = 'my-cache-10';

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
					'./',
					'img/back.jpg',
					'img/dice-1.png',
					'img/dice-2.png',
					'img/dice-3.png',
					'img/dice-4.png',
					'img/dice-5.png',
					'img/dice-6.png',
					'img/dice-7.png',
					'img/dice-8.png',
					'img/dice-9.png',
					'img/dice-10.png',
					'img/dice-11.png',
					'img/dice-12.png',
					'img/dice-13.png',
					'img/dice-14.png',
					'img/dice-15.png',
					'js/sweetalert2.all.min.js',
					'css/style.css',
					'css/font.css',
					'js/app.js',
					'index.html'
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
