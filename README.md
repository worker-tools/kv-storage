# Storage Area

Picks the platform-specific Storage Area ([1],[2],[3]) implementation for Deno, Cloudflare Workers and the browser.

```ts
import { StorageArea } from '@worker-tools/kv-storage'

const storage = new StorageArea('default')
```

The purpose of this module is to make it easier to write cross-runtime code, i.e. code that works on CF Workers and Deno and potentially even the browser.

For use in **Deno** loading a storage adapter is required, e.g.

```ts
import 'https://deno.land/x/kv_storage/adapters/sqlite.ts'
// or dynamically:
await import('https://deno.land/x/kv_storage/adapters/sqlite.ts')
```

For details, see [the Deno module](https://workers.tools/deno-kv-storage).


For use in **Cloudflare Workers**, adding a KV binding is necessary. 

```toml
# file: "wrangler.toml"
kv_namespaces = [ 
  { binding = "KV_STORAGE", id = "...", preview_id = "..." }
]

[vars]
  DEFAULT_KV_NAMESPACE = "KV_STORAGE"
```

For details, see [the Cloudflare module](https://workers.tools/cloudflare-kv-storage).

For use in **Browsers**/Service Workers where bundle size is critical, it's recommended to prevent your bundler from including the Deno and CF Workers specific parts.

When using `esbuild` one way to achieve this is through a custom `tsconfig.json` file, e.g.:

```jsonc
{
  "compilerOptions": {
    "paths": {
      "@worker-tools/kv-storage": ["./node_modules/@worker-tools/kv-storage-polyfill"],
    }
  }
}
```

This will instruct `esbuild` to replace the generic `kv-storage` module with the browser-specific one. Both export the same classes and types. Other bundlers have similar mechanisms.


[1]: https://developers.google.com/web/updates/2019/03/kv-storage
[2]: https://css-tricks.com/kv-storage/
[3]: https://github.com/WICG/kv-storage