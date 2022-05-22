import type { StorageArea as IStorageArea, Options } from 'https://ghuc.cc/qwtel/kv-storage-interface/index.d.ts';

import * as deno from 'https://ghuc.cc/worker-tools/deno-kv-storage/mod.ts';
import * as cf from 'https://ghuc.cc/worker-tools/cloudflare-kv-storage/index.ts';
import * as browser from 'https://ghuc.cc/worker-tools/kv-storage-polyfill/index.ts';

type StorageAreaConstructor = new (name: string, opts?: Options) => IStorageArea;
type StorageAreaClass = StorageAreaConstructor & { prototype: IStorageArea };

export const StorageArea: StorageAreaClass =
  'Deno' in globalThis
    ? deno.StorageArea
    : navigator.userAgent?.includes('Cloudflare-Workers')
      ? cf.StorageArea
      : browser.StorageArea;
