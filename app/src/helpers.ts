export const getRandomId = () => Math.random().toString(36).substr(2, 9);
export const isValidKey = (key: string) => key.startsWith("sk-") && key.length > 30;
export const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
export const isTauri = () => !!window.__TAURI__;

declare global {
  interface Window {
    __TAURI__: any;
  }
}
