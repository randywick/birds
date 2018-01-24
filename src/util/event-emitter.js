export default class EventEmitter {

  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).push(callback);
  }

  once(eventName, callback) {
    const cb = (...args) => {
      callback(...args);
      this.removeListener(eventName, cb);
    }

    return this.on(eventName, cb);
  }

  removeListener(eventName, callback) {
    const listeners = this.listeners.get(eventName) || [];
    const index = listeners.indexOf(callback);

    if (index !== -1) {
      listeners.splice(index, 1);

      return true;
    }

    return false;
  }

  emit(eventName, ...args) {
    const listeners = this.listeners.get(eventName);

    if (Array.isArray(listeners)) {
      listeners.forEach(callback => callback(...args));

      return true;
    }

    return false;
  }
}