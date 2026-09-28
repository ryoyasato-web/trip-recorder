const CACHE="eri-field-recorder-v071";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;

  const url=new URL(e.request.url);
  const isSameOrigin=url.origin===self.location.origin;
  const isPcPage=isSameOrigin && /\/pc(?:\/|$)/.test(url.pathname);

  // PC版は更新頻度が高いため、古いService Workerキャッシュを使わない。
  if(isPcPage){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .catch(()=>caches.match(e.request))
    );
    return;
  }

  // ページ遷移はネットワーク優先。オフライン時のみキャッシュへフォールバック。
  if(e.request.mode==="navigate"){
    e.respondWith(
      fetch(e.request)
        .then(res=>{
          if(isSameOrigin){
            const copy=res.clone();
            caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
          }
          return res;
        })
        .catch(()=>caches.match(e.request).then(hit=>hit||caches.match("./index.html")))
    );
    return;
  }

  // PWAの静的ファイルはキャッシュ優先。
  e.respondWith(
    caches.match(e.request).then(hit=>
      hit || fetch(e.request).then(res=>{
        if(isSameOrigin){
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
        }
        return res;
      })
    )
  );
});
