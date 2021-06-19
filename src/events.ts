import type { MutableRefObject } from 'react';

// Monitored Events: Events the user can plug a callback

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

// Dispatcher Generator: The easiest way to fire the events from the menu

export type SlideMenuEvent<MyEvent extends CustomEvent> = new () => MyEvent;

function dispatcherGenerator<T extends CustomEvent>(
  ref: MutableRefObject<null>,
  MyEvent: SlideMenuEvent<T>,
) {
  return function dispatcher() {
    const eventToDispatch = new MyEvent();
    (ref.current as unknown as HTMLElement).dispatchEvent(eventToDispatch);
  };
}

// Order Events: Events the user will fire to control the menu

class ShowMenuOrderEvent extends CustomEvent<{description: string, id?: string}> {
  constructor(id?: string) {
    super('showMenuOrder', {
      bubbles: true,
      cancelable: false,
      detail: {
        description: 'Fire this event to show the slideMenu',
        id,
      },
    });
  }

  get description() {
    return this.detail.description;
  }

  get menuId() {
    return this.detail.id;
  }
}

class HideMenuOrderEvent extends CustomEvent<{description: string, id?: string}> {
  constructor(id?: string) {
    super('hideMenuOrder', {
      bubbles: true,
      cancelable: false,
      detail: {
        description: 'Fire this event to hide the slideMenu',
        id,
      },
    });
  }

  get description() {
    return this.detail.description;
  }

  get menuId() {
    return this.detail.id;
  }
}

const monitoredEvents = {
  showStart: ShowStartEvent,
  showEnd: ShowEndEvent,
  hideStart: HideStartEvent,
  hideEnd: HideEndEvent,
};

export {
  monitoredEvents,
  dispatcherGenerator,
  HideMenuOrderEvent,
  ShowMenuOrderEvent,
};
