import React, { useEffect, useRef } from 'react';
import { showCallback, hideCallback, SlideMenuOptions } from './effects';
import type { HideMenuOrderEvent, ShowMenuOrderEvent } from './events';

export function useMobileEffect(callback: Function) {
  const isMobile = window.matchMedia('screen and (max-width: 576px)');
  useEffect(() => {
    callback();
  }, [isMobile]);
}

type UseToggleEffectOptions = {
  onShowStart?: (() => void)[];
  onShowEnd?: (() => void)[];
  onHideStart?: (() => void)[];
  onHideEnd?: (() => void)[];
  visibleArea?: number;
};

/**
 * A react Hook to schedule callbacks to be ran when the menu is lauched or when it is hidden.
 * @param menuRef - The Ref for the actual menu (the one with the children).
 * @param options - An object with the following options:
 *  - `onShowStart: (() => void)[]`: A list os callbacks to be called when the menu
 *     starts to be shown.
 *  - `onShowEnd: (() => void)[]`: A list os callbacks to be called when the menu
 *     is shown.
 *  - `onHideStart: (() => void)[]`: A list os callbacks to be called when the menu
 *     starts to be hidden.
 *  - `onHideEnd: (() => void)[]`: A list os callbacks to be called when the menu
 *     is hidden.
 *  - `visibleArea`: The percentage of the screen the menu ocupies even when is
 *    supposed to be hidden.
 */
export function useToggleEffect(
  menuRef: React.MutableRefObject<null>,
  {
    onShowStart = [],
    onShowEnd = [],
    onHideStart = [],
    onHideEnd = [],
    visibleArea = 0,
  }: UseToggleEffectOptions,
) {
  const firstThreshold = 0.1 + visibleArea / 100;
  const secondThreshold =
    firstThreshold + (1 - firstThreshold) ** (1 + 1 - firstThreshold);

  const activeRef = useRef(false);

  function observerCallback(entries: IntersectionObserverEntry[]) {
    const showRatio = entries[0].intersectionRatio;

    // showStart
    if (
      showRatio >= firstThreshold &&
      showRatio < secondThreshold &&
      !activeRef.current
    ) {
      onShowStart.forEach((callback) => callback());
    }

    // showEnd
    else if (showRatio >= secondThreshold && !activeRef.current) {
      onShowEnd.forEach((callback) => callback());
      activeRef.current = true;
    }

    // hideStart
    else if (
      showRatio <= secondThreshold &&
      showRatio > firstThreshold &&
      activeRef.current
    ) {
      onHideStart.forEach((callback) => callback());
    }

    // hideEnd
    else if (showRatio <= firstThreshold && activeRef.current) {
      onHideEnd.forEach((callback) => callback());
      activeRef.current = false;
    }
  }

  useMobileEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: [firstThreshold, secondThreshold],
    });

    observer.observe(menuRef.current as unknown as HTMLElement);
  });
}

export type CallbackSchedulerOptions = {
  [eventName: string]: React.EventHandler<any>;
};

export function useCallbackScheduler(
  targetRef: React.MutableRefObject<null>,
  events: CallbackSchedulerOptions,
) {
  const effect = () => {
    const target = targetRef.current as unknown as HTMLElement;
    Object.entries(events).forEach(([eventName, callback]) => {
      target.addEventListener(eventName, callback);
    });
  };

  useMobileEffect(effect);
}

export function useLocalEventWatcher(
  target: React.MutableRefObject<null>,
  event: string,
  callback: React.EventHandler<any>,
  onlyMobile = false,
) {
  if (onlyMobile) {
    useMobileEffect(() => {
      const targetElement = target.current as unknown as HTMLElement;
      targetElement.addEventListener(event, callback);
    });
  } else {
    useEffect(() => {
      const targetElement = target.current as unknown as HTMLElement;
      targetElement.addEventListener(event, callback);
    }, []);
  }
}

export function useLifeCycleEvents(
  targetRef: React.MutableRefObject<null>,
  onShown?: React.EventHandler<any>,
  onHidden?: React.EventHandler<any>,
) {
  if (onShown) {
    useLocalEventWatcher(targetRef, 'slideMenuShown', onShown);
  }

  if (onHidden) {
    useLocalEventWatcher(targetRef, 'slideMenuHidden', onHidden);
  }
}

export function useOrderEvents(targetRef: React.MutableRefObject<null>, options: SlideMenuOptions) {
  useMobileEffect(() => {
    const slideMenu = targetRef.current as unknown as HTMLElement;

    function enableShowOrder(event: ShowMenuOrderEvent) {
      if ((event.menuId && event.menuId === slideMenu.id) || !event.menuId) {
        showCallback(targetRef, options);
      }
    }

    function enableHideShowOrder(event: HideMenuOrderEvent) {
      if ((event.menuId && event.menuId === slideMenu.id) || !event.menuId) {
        hideCallback(targetRef, options);
      }
    }

    window.addEventListener('showMenuOrder' as any, enableShowOrder);
    window.addEventListener('hideMenuOrder' as any, enableHideShowOrder);

    return () => {
      window.removeEventListener('showMenuOrder' as any, enableShowOrder);
      window.removeEventListener('hideMenuOrder' as any, enableHideShowOrder);
    };
  });
}
