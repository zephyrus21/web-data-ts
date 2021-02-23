import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
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

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    if (id)
      axios
        .put(`http://localhost:3000/users/${id}`, this.data)
        .then((response: AxiosResponse): void => {});
    else
      axios
        .post(`http://localhost:3000/users`, this.data)
        .then((response: AxiosResponse): void => {});
  }
}
