import React, { useEffect, useState } from 'react';
import { showCallback, hideCallback } from './effects';
import {
  HideMenuOrderEvent,
  ShowMenuOrderEvent,
  SlideMenuHiddenEvent,
  SlideMenuShownEvent,
} from './events';
import type SlideMenuOptions from './options';

export function useMediaQueryObserver<T>(
  mediaQuery: string,
  onTrue: T,
  onFalse: T,
): T {
  const query = window.matchMedia(mediaQuery);
  const [state, setState] = useState(query.matches);
  query.addEventListener('change', (event) => {
    setState((event.target as MediaQueryList).matches);
  });
  return state ? onTrue : onFalse;
}

export type QueryDependentEventOptions = {
  target: React.MutableRefObject<null> | EventTarget;
  eventName: string;
  callback: React.EventHandler<any>;
  mediaQuery: string;
  capture?: boolean;
};
export function useQueryDependentEvent(options: QueryDependentEventOptions) {
  const shouldExecute = useMediaQueryObserver(options.mediaQuery, true, false);
  if (shouldExecute) {
    useEffect(() => {
      const element = options.target instanceof EventTarget
        ? options.target
        : (options.target.current as unknown as HTMLElement);
      element.addEventListener(options.eventName, options.callback, {
        capture: !!options.capture,
      });
      return () => {
        element.removeEventListener(options.eventName, options.callback);
      };
    }, []);
  }
}

export function useMobileEffect(
  callback: React.EffectCallback,
  options: SlideMenuOptions,
) {
  const isMobile = useMediaQueryObserver(options.customMediaQuery, true, false);
  useEffect(callback, [isMobile]);
}

export function useLocalEventWatcher(
  target: React.MutableRefObject<null>,
  event: string,
  callback: React.EventHandler<any>,
  options: SlideMenuOptions,
  onlyMobile = false,
) {
  if (onlyMobile) {
    useQueryDependentEvent({
      target,
      eventName: event,
      callback,
      mediaQuery: options.customMediaQuery,
    });
  } else {
    useQueryDependentEvent({
      target,
      eventName: event,
      callback,
      mediaQuery: 'all',
    });
  }
}

export function useLifeCycleEvents(
  options: SlideMenuOptions,
  onShown?: React.EventHandler<any>,
  onHidden?: React.EventHandler<any>,
) {
  if (onShown) {
    useLocalEventWatcher(
      options.mainRef,
      SlideMenuShownEvent.eventName,
      onShown,
      options,
    );
  }

  if (onHidden) {
    useLocalEventWatcher(
      options.mainRef,
      SlideMenuHiddenEvent.eventName,
      onHidden,
      options,
    );
  }
}

export function useOrderEvents(options: SlideMenuOptions) {
  useMobileEffect(() => {
    const slideMenu = options.mainRef.current as unknown as HTMLElement;

    function enableShowOrder(event: ShowMenuOrderEvent) {
      if ((event.menuId && event.menuId === slideMenu.id) || !event.menuId) {
        showCallback(options);
      }
    }

    function enableHideShowOrder(event: HideMenuOrderEvent) {
      if ((event.menuId && event.menuId === slideMenu.id) || !event.menuId) {
        hideCallback(options);
      }
    }

    window.addEventListener(
      ShowMenuOrderEvent.eventName as any,
      enableShowOrder,
    );
    window.addEventListener(
      HideMenuOrderEvent.eventName as any,
      enableHideShowOrder,
    );

    return () => {
      window.removeEventListener(
        ShowMenuOrderEvent.eventName as any,
        enableShowOrder,
      );
      window.removeEventListener(
        HideMenuOrderEvent.eventName as any,
        enableHideShowOrder,
      );
    };
  }, options);
}
