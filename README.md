# Storage Area

Picks the platform-specific Storage Area ([1],[2],[3]) implementation for Deno, Cloudflare Workers and the browser.

```ts
import { StorageArea } from '@worker-tools/kv-storage'

const storage = new StorageArea('default')
```

The purpose of this module is to make it easier to write cross-runtime code, i.e. code that works on CF Workers and Deno and potentially even the browser.

## Deno
For use in **Deno** loading a storage adapter is required, e.g.

```ts
import 'https://deno.land/x/kv_storage/adapters/sqlite.ts'
// or dynamically:
await import('https://deno.land/x/kv_storage/adapters/sqlite.ts')
```

For details, see [the Deno module](https://workers.tools/deno-kv-storage).


## Cloudflare Workers
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

## Browsers
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

<br/>

--------

<br/>

<p align="center"><a href="https://workers.tools"><img src="https://workers.tools/assets/img/logo.svg" width="100" height="100" /></a>
<p align="center">This module is part of the Worker Tools collection<br/>⁕

[Worker Tools](https://workers.tools) are a collection of TypeScript libraries for writing web servers in [Worker Runtimes](https://workers.js.org) such as Cloudflare Workers, Deno Deploy and Service Workers in the browser. 

If you liked this module, you might also like:

- 🧭 [__Worker Router__][router] --- Complete routing solution that works across CF Workers, Deno and Service Workers
- 🔋 [__Worker Middleware__][middleware] --- A suite of standalone HTTP server-side middleware with TypeScript support
- 📄 [__Worker HTML__][html] --- HTML templating and streaming response library
- 📦 [__Storage Area__][kv-storage] --- Key-value store abstraction across [Cloudflare KV][cloudflare-kv-storage], [Deno][deno-kv-storage] and browsers.
- 🆗 [__Response Creators__][response-creators] --- Factory functions for responses with pre-filled status and status text
- 🎏 [__Stream Response__][stream-response] --- Use async generators to build streaming responses for SSE, etc...
- 🥏 [__JSON Fetch__][json-fetch] --- Drop-in replacements for Fetch API classes with first class support for JSON.
- 🦑 [__JSON Stream__][json-stream] --- Streaming JSON parser/stingifier with first class support for web streams.

Worker Tools also includes a number of polyfills that help bridge the gap between Worker Runtimes:
- ✏️ [__HTML Rewriter__][html-rewriter] --- Cloudflare's HTML Rewriter for use in Deno, browsers, etc...
- 📍 [__Location Polyfill__][location-polyfill] --- A `Location` polyfill for Cloudflare Workers.
- 🦕 [__Deno Fetch Event Adapter__][deno-fetch-event-adapter] --- Dispatches global `fetch` events using Deno’s native HTTP server.

[router]: https://workers.tools/router
[middleware]: https://workers.tools/middleware
[html]: https://workers.tools/html
[kv-storage]: https://workers.tools/kv-storage
[cloudflare-kv-storage]: https://workers.tools/cloudflare-kv-storage
[deno-kv-storage]: https://workers.tools/deno-kv-storage
[kv-storage-polyfill]: https://workers.tools/kv-storage-polyfill
[response-creators]: https://workers.tools/response-creators
[stream-response]: https://workers.tools/stream-response
[json-fetch]: https://workers.tools/json-fetch
[json-stream]: https://workers.tools/json-stream
[request-cookie-store]: https://workers.tools/request-cookie-store
[extendable-promise]: https://workers.tools/extendable-promise
[html-rewriter]: https://workers.tools/html-rewriter
[location-polyfill]: https://workers.tools/location-polyfill
[deno-fetch-event-adapter]: https://workers.tools/deno-fetch-event-adapter

Fore more visit [workers.tools](https://workers.tools).