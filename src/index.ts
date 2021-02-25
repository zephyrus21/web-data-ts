import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.build({ name: 'test', age: 99 });

const userForm = new UserForm(document.getElementById('root'), user);

userForm.render();
