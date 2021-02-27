import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div>
    <h1>User Details</h1>
    <div>NAME: ${this.model.get('name')}</div>
    <div>AGE: ${this.model.get('age')}</div>
    </div>
`;
  }
}
