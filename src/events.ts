import type { MutableRefObject } from 'react';

// Dispatcher Generator: The easiest way to fire the events from the menu

export type SlideMenuEvent<
    T extends unknown[],
> = (((...args: T) => Event) & {eventName: string}) | ((() => Event) & {eventName: string});

function dispatcherGenerator<
T extends unknown[],
Result extends Event,
>(
  ref: MutableRefObject<null>,
  MyEvent: SlideMenuEvent<T>,
  ...eventArgs: unknown[]
) {
  return function dispatcher() {
    let eventToDispatch;
    if (eventArgs) {
      eventToDispatch = MyEvent();
    } else {
      eventToDispatch = MyEvent();
    }
    (ref.current as unknown as HTMLElement).dispatchEvent(eventToDispatch);
  };
}

// Monitored Events: Events the user can plug a callback
type LifeCycleEvent = Event & { description: string };

const SlideMenuShownEvent: SlideMenuEvent<[]> = function(): LifeCycleEvent {
  const toReturn = new Event('slideMenuShown', {
    bubbles: true,
    cancelable: false,
  });
  Object.assign(toReturn, {description: 'Event fired when the menu is displayed.'})
  return toReturn as LifeCycleEvent;
}
SlideMenuShownEvent.eventName = 'slideMenuShown';

const SlideMenuHiddenEvent: SlideMenuEvent<[]> = function(): LifeCycleEvent {
  const toReturn = new Event('slideMenuHidden', {
    bubbles: true,
    cancelable: false,
  });
  Object.assign(toReturn, {description: 'Event fired when the menu is hidden.'})
  return toReturn as LifeCycleEvent;
}
SlideMenuHiddenEvent.eventName = 'slideMenuHidden';

// Order Events: Events the user will fire to control the menu
type OrderEvent = LifeCycleEvent & { menuId?: string };

const ShowMenuOrderEvent: SlideMenuEvent<[string?]> = function(id?: string): OrderEvent {
  const toReturn = new Event('showMenuOrder', {
    bubbles: true,
    cancelable: false,
  });
  Object.assign(toReturn, {description: 'Fire this event to show the slideMenu'})
  if (id) {
    Object.assign(toReturn, {menuId: id});
  }
  return toReturn as OrderEvent;
}
ShowMenuOrderEvent.eventName = 'showMenuOrder';

const HideMenuOrderEvent: SlideMenuEvent<[string?]> = function(id?: string): OrderEvent {
  const toReturn = new Event('hideMenuOrder', {
    bubbles: true,
    cancelable: false,
  });
  Object.assign(toReturn, {description: 'Fire this event to hide the slideMenu'})
  if (id) {
    Object.assign(toReturn, {menuId: id});
  }
  return toReturn as OrderEvent;
}
HideMenuOrderEvent.eventName = 'hideMenuOrder';

export {
  dispatcherGenerator,
  HideMenuOrderEvent,
  ShowMenuOrderEvent,
  SlideMenuShownEvent,
  SlideMenuHiddenEvent,
};
