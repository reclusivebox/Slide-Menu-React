import type { MutableRefObject } from 'react';

// Monitored Events: Events the user can plug a callback

class SlideMenuShownEvent extends CustomEvent<{description: string}> {
  static eventName = 'slideMenuShown';

  constructor() {
    super(SlideMenuShownEvent.eventName, {
      bubbles: true,
      cancelable: false,
      detail: {
        description:
          'Event fired when the menu is displayed.',
      },
    });
  }

  get description() {
    return this.detail.description;
  }
}

class SlideMenuHiddenEvent extends CustomEvent<{description: string}> {
  static eventName = 'slideMenuHidden';

  constructor() {
    super(SlideMenuHiddenEvent.eventName, {
      bubbles: true,
      cancelable: false,
      detail: {
        description: 'Event fired when the menu is hidden',
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
  static eventName = 'showMenuOrder';

  constructor(id?: string) {
    super(ShowMenuOrderEvent.eventName, {
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
  static eventName = 'hideMenuOrder';

  constructor(id?: string) {
    super(HideMenuOrderEvent.eventName, {
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

export {
  dispatcherGenerator,
  HideMenuOrderEvent,
  ShowMenuOrderEvent,
  SlideMenuShownEvent,
  SlideMenuHiddenEvent,
};
