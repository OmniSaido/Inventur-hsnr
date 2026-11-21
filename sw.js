/* Service Worker der Handy-Fassung: hält die ganze App auf dem Gerät, damit sie ohne Netz startet.
   Inventurdaten liegen nicht hier, sondern im Speicher des Browsers auf dem Gerät. */
var V='inventur-lokal-39286df055';
var ALLE=["./", "manifest.webmanifest", "static/icon-192.png?v=143cea3f19", "static/icon-512.png?v=83ba79459b", "static/icon-64.png?v=5424f7272e", "static/icon-apple-180.png?v=620904057e", "static/icon-maskable-512.png?v=d0f48b163b", "static/jsbarcode.min.js?v=e11355f2e9", "static/xlsx.full.min.js?v=c9506197ca", "static/zxing.min.js?v=dcda6eab26"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(ALLE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf('inventur-lokal-')===0&&k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==self.location.origin)return;
  var start=new URL('./',self.registration.scope).href;
  if(r.mode==='navigate'){
    /* sofort aus dem Speicher starten, im Hintergrund nach einer neuen Fassung sehen */
    e.respondWith(caches.open(V).then(function(c){return c.match(start).then(function(hit){
      var neu=fetch(r).then(function(res){if(res.ok&&res.type==='basic')c.put(start,res.clone());return res});
      if(hit){neu.catch(function(){});return hit}
      return neu;
    })}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){return hit||fetch(r)}));
});
