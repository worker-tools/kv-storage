# Storage Area

Picks the platform-specific Storage Area ([1],[2],[3]) implementation for Deno, Cloudflare Workers and the browser.

```ts
import { StorageArea } from '@worker-tools/kv-storage'

const storage = new StorageArea('default')
```


[1]: https://developers.google.com/web/updates/2019/03/kv-storage
[2]: https://css-tricks.com/kv-storage/
[3]: https://github.com/WICG/kv-storage