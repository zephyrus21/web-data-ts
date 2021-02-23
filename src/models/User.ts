interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  constructor(private data: UserProps) {}

  //! we will have array of events and each event will also have array of callback functions
  events: { [key: string]: Callback[] } = {};

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

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
