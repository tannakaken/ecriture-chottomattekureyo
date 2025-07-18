//キャッシュ名(=バージョン)を指定する
// 更新した場合、バージョン名を更新する。
// すると古いキャッシュは削除されて、ページが更新される。
var CACHE_NAME = "ecriture-chottomattekureyo-v5";
//キャッシュするファイル or ディレクトリを指定する
var urlsToCache = [
   "/",
];

// install
self.addEventListener("install", function (event) {
   event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
         console.log("Opened cache");
         return cache.addAll(urlsToCache);
      })
   );
});
// activate
self.addEventListener("activate", function (event) {
   var cacheWhitelist = [CACHE_NAME];
   event.waitUntil(
      caches.keys().then(function (cacheNames) {
         return Promise.all(
            cacheNames.map(function (cacheName) {
               if (cacheWhitelist.indexOf(cacheName) === -1) {
                  return caches.delete(cacheName);
               }
            })
         );
      })
   );
});
// fetch
self.addEventListener("fetch", function (event) {
   event.respondWith(
      caches.match(event.request).then(function (response) {
         if (response) {
            return response;
         }

         var fetchRequest = event.request.clone();

         return fetch(fetchRequest).then(function (response) {
            if (!response || response.status !== 200 || response.type !== "basic") {
               return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME).then(function (cache) {
               cache.put(event.request, responseToCache);
            });

            return response;
         });
      })
   );
});
