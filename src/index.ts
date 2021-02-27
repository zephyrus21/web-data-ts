import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.build({ name: 'test', age: 99 });

const root = document.getElementById('root');

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
  console.log(userEdit);
} else {
  throw new Error('Root element not found!');
}
