export class LocalStorage {
  constructor() {}

  saveByKey(key, value) {
    localStorage.setItem(key, value);
  }

  getByKey(key) {
    return localStorage.getItem(key);
  }

  removeByKey(key) {
    localStorage.removeItem(key);
  }
}
