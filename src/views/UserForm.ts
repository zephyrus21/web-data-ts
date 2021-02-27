import { View } from './View';

export class UserForm extends View {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.change-name': this.onChangeNameClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onChangeNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>NAME: ${this.model.get('name')}</div>
        <div>AGE: ${this.model.get('age')}</div>
        <input/>
        <button class="change-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }
}
