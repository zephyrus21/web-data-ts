export class Attributes<T> {
  constructor(private data: T) {}

  //! here K is a type of any one value of T
  //* i.e T can be any value of id, name, age but K can only be any one value of id, name, age
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
