import type { 
  StorageArea as IStorageArea, Options, AllowedKey, Key 
} from 'https://ghuc.cc/qwtel/kv-storage-interface/index.d.ts';
export type { Options, AllowedKey, Key }

import * as dn from 'https://ghuc.cc/worker-tools/deno-kv-storage/mod.ts';
import * as cf from 'https://ghuc.cc/worker-tools/cloudflare-kv-storage/index.ts';
import * as br from 'https://ghuc.cc/worker-tools/kv-storage-polyfill/index.ts';

type StorageAreaConstructor = new (name: string, opts?: Options) => IStorageArea;
type StorageAreaClass = StorageAreaConstructor & { prototype: IStorageArea };

export const StorageArea: StorageAreaClass =
  'Deno' in globalThis
    ? dn.StorageArea
    : navigator.userAgent?.includes('Cloudflare-Workers')
      ? cf.StorageArea
      : br.StorageArea;
