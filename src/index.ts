import { User } from './models/User';

const user = new User({ name: 'Piyush', age: 20 });

console.log(user.get('name'));

user.set({ name: 'Neha', age: 19 });

console.log(user.get('name'));
