type Callback = () => void;

export class Eventing {
  //! we will have array of events and each event will also have array of callback functions
  events: { [key: string]: Callback[] } = {};

  //! this will create event with callback function
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  //! this will trigger the callback function of the event when called
  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}
