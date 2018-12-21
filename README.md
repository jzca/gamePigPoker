# gamePigPoker

## Read the rules inside the actual game.

## Service Worker Info
1. The site can work offline.
2. Clean the unused caches.
   But testing is a bit tricky.
   1. change the cache name in sw.
   2. Clear the storage expect the cache storage.
   3. Wait and reflesh the page.
   4. You will see the old cache will be deleted by the sw.
