
const cacheName = 'cache-version-1';

const precache = [
  'https://code.jquery.com/jquery-3.2.1.slim.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
  'index.html',
  'contacto.html',
  'offline.html',
  'js/main.js',
  'js/register-sw.js',
  'css/styles.css',
  'img/favicon-sitio.png',
  'img/icon-192x192.png',
  'img/icon-256x256.png',
  'img/icon-384x384.png',
  'img/icon-512x512.png',
];


self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(    
      caches.open(cacheName).then(cache => {
        return cache.addAll(precache)
      })
  );
});


self.addEventListener('activate', event => {

  const cacheWhitelist = [cacheName];

  event.waitUntil(     
      caches.keys().then(cacheNames => {    
        return Promise.all(          
            cacheNames.map(cacheName => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
        )
      })
  );
});


function shouldAcceptResponse(response) {
    return response.status !== 0 && !(response.status >= 400 && response.status < 500) || 
        response.type === 'opaque' || 
        response.type === 'opaqueredirect';
}


self.addEventListener('fetch', event => {

  event.respondWith(
      caches.open(cacheName).then(cache => { 
        return cache.match(event.request).then(response => {          
       
          if (response) {
            return response;
          }
     
          return fetch(event.request).then(
            function(response) {
            
              if(shouldAcceptResponse(response)) {
                return response;
              }
     
              var responseToCache = response.clone();
  
              caches.open(cacheName)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          )

        }).catch(error => {
          console.log('Fallo SW', error); 
      
          return caches.match('offline.html');
        });
      })
  );
});