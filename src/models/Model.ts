import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

interface HasID {
  id?: number;
}

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set = (value: T) => {
    this.attributes.set(value);
    this.events.trigger('change');
  };

  fetch = (): void => {
    const id = this.get('id');
    if (typeof id !== 'number') throw new Error('id must be a number');
    this.sync
      .fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
      .catch((error: AxiosError): void => {
        console.log('Error! User not found.');
      });
  };

  save = (): void => {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  };
}
