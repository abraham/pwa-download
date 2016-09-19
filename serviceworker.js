this.addEventListener('install', event => {
  let wait = caches.open('v1').then(cache => {
    return cache.addAll([
      '/'
    ]);
  });

  event.waitUntil(wait);
});

this.addEventListener('fetch', event => {
  let wait = caches.match(event.request).then(response => {
    if (response) {
      if (event.request.url == 'https://hd.unsplash.com/photo-1470104240373-bc1812eddc9f') {
        console.log('Using cached', event.request.url);
      }
      return response;
    }

    return fetch(event.request.clone())
      .then(response => {
        return response;
      }).then(function(response) {
        if (!event.request.url.startsWith('http')) {
          return response;
        }
        caches.open('v1').then(cache => {
          if (event.request.url == 'https://hd.unsplash.com/photo-1470104240373-bc1812eddc9f') {
            console.log('Caching', event.request.url);
          }
          cache.put(event.request, response);
        });
        return response.clone();
      }).catch(error => {
        console.log('Fetch failed with', error);
      });
  });

  event.respondWith(wait);
});
