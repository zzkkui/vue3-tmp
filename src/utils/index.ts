import { isObject } from './is';

/**
 * @description 深度合并
 *
 * @export
 * @template T
 * @param {*} [src={}]
 * @param {*} [target={}]
 * @return {*}  {T}
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}

/**
 * @description uuid
 *
 * @export
 * @return {*}  {string}
 */
export function buildUUID(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, '');
}

let unique = 0;

/**
 * @description uuid
 *
 * @export
 * @param {string} [prefix='']
 * @return {*}  {string}
 */
export function buildShortUUID(prefix = ''): string {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  return prefix + '_' + random + unique + String(time);
}

/**
 * @description window.open
 *
 * @export
 * @param {string} url
 * @param {({ target?: '_self' | '_blank' | string; noopener?: boolean; noreferrer?: boolean })} [opt]
 */
export function openWindow(
  url: string,
  opt?: { target?: '_self' | '_blank' | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}
