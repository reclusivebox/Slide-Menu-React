import type { MutableRefObject } from 'react';

class ShowStartEvent extends CustomEvent<{description: string}> {
  constructor() {
    super('showStart', {
      bubbles: true,
      cancelable: false,
      detail: {
        description:
          'Event fired when the action to display the slide menu is started.',
      },
    });
  }

  get description() {
    return this.detail.description;
  }
}

class ShowEndEvent extends CustomEvent<{description: string}> {
  constructor() {
    super('showEnd', {
      bubbles: true,
      cancelable: false,
      detail: {
        description: 'Event fired when the slide menu is displayed.',
      },
    });
  }

  get description() {
    return this.detail.description;
  }
}

class HideStartEvent extends CustomEvent<{description: string}> {
  constructor() {
    super('hideStart', {
      bubbles: true,
      cancelable: false,
      detail: {
        description:
          'Event fired when the action to hide the slide menu is started.',
      },
    });
  }

  get description() {
    return this.detail.description;
  }
}

class HideEndEvent extends CustomEvent<{description: string}> {
  constructor() {
    super('hideEnd', {
      bubbles: true,
      cancelable: false,
      detail: {
        description: 'Event fired when the slide menu is hidden.',
      },
    });
  }

  get description() {
    return this.detail.description;
  }
}

type SlideMenuEvent<MyEvent extends CustomEvent> = new () => MyEvent;

function dispatcherGenerator<T extends CustomEvent>(
  ref: MutableRefObject<null>,
  MyEvent: SlideMenuEvent<T>,
) {
  return function dispatcher() {
    (ref.current as unknown as HTMLElement).dispatchEvent(new MyEvent());
  };
}

export {
  HideStartEvent,
  HideEndEvent,
  ShowEndEvent,
  ShowStartEvent,
  dispatcherGenerator,
};
