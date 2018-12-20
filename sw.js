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
					'gamePigPoker/js/sweetalert2.all.min.js',
					'gamePigPoker/css/style.css',
					'gamePigPoker/css/font.css',
					'gamePigPoker/js/app.js',
					'gamePigPoker/img/back.jpg',
					'gamePigPoker/img/dice-1.png',
					'gamePigPoker/img/dice-2.png',
					'gamePigPoker/img/dice-3.png',
					'gamePigPoker/img/dice-4.png',
					'gamePigPoker/img/dice-5.png',
					'gamePigPoker/img/dice-6.png',
					'gamePigPoker/img/dice-7.png',
					'gamePigPoker/img/dice-8.png',
					'gamePigPoker/img/dice-9.png',
					'gamePigPoker/img/dice-10.png',
					'gamePigPoker/img/dice-11.png',
					'gamePigPoker/img/dice-12.png',
					'gamePigPoker/img/dice-13.png',
					'gamePigPoker/img/dice-14.png',
					'gamePigPoker/img/dice-15.png',
					'gamePigPoker/',
					'gamePigPoker/index.html'
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
