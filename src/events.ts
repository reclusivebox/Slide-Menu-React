import type {MutableRefObject} from 'react';

class ShowStartEvent extends CustomEvent {
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
    return super.detail.description;
  }
}

class ShowEndEvent extends CustomEvent {
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
    return super.detail.description;
  }
}

class HideStartEvent extends CustomEvent {
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
    return super.detail.description;
  }
}

class HideEndEvent extends CustomEvent {
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
    return super.detail.description;
  }
}

function dispatcherGenerator(ref: MutableRefObject<null>, MyEvent: any) {
  return () => (ref.current as unknown as HTMLElement).dispatchEvent(new MyEvent());
}

export {
  HideStartEvent, HideEndEvent, ShowEndEvent, ShowStartEvent, dispatcherGenerator,
};
