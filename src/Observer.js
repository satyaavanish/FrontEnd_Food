 
class Observer {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback); // unsubscribe
  }

  notify(data) {
    for (const callback of this.subscribers) {
      callback(data);
    }
  }
}

export const dishObserver = new Observer();
