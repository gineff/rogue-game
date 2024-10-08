export function getFormDataOf<T = PlainObject>(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries()) as unknown as T
}
export function redirect2(path = '/', except: string[] = []) {
  if (path != location.pathname && !except.includes(location.pathname)) {
    location.replace(path)
  }
}
export const muteRes = () => {
  return
}
export function roundArrValues<T extends unknown[]>(arr: number[]) {
  return arr.map(val => Math.round(val)) as T
}
/**
 *
 * @param min number Required min value
 * @param max number Optional max value, Infinity if omitted
 * @returns Function that returns number in range
 */
export const createRangeKeeper =
  (min: number, max?: number) => (value: number) =>
    Math.max(min, Math.min(max || Infinity, value))

export const capitalize = (word: string) =>
  word.length > 0 ? word[0].toUpperCase() + word.slice(1) : ''

export const delay = (time: number, callback?: () => void) =>
  new Promise<void>(res => {
    callback?.()
    setTimeout(res, time)
  })

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}
export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}
export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

export const getOAuthRedirectUrl = (defaultUrl: string) => {
  if (window.location.hostname === 'localhost') {
    return `http://localhost:3000`
  } else {
    return defaultUrl
  }
}
