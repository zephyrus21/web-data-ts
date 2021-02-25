import { User } from '../models/User';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.model.on('change', () => {
      this.render();
    });
  }

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

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((selector) => {
        selector.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
