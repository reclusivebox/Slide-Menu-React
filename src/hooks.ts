import React, { useEffect, useState } from 'react';
import { showCallback, hideCallback } from './effects';
import type { HideMenuOrderEvent, ShowMenuOrderEvent } from './events';
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
    useMobileEffect(() => {
      const targetElement = target.current as unknown as HTMLElement;
      targetElement.addEventListener(event, callback);
      return () => targetElement.removeEventListener(event, callback);
    }, options);
  } else {
    useEffect(() => {
      const targetElement = target.current as unknown as HTMLElement;
      targetElement.addEventListener(event, callback);
      return () => targetElement.removeEventListener(event, callback);
    }, []);
  }
}

export function useLifeCycleEvents(
  options: SlideMenuOptions,
  onShown?: React.EventHandler<any>,
  onHidden?: React.EventHandler<any>,
) {
  if (onShown) {
    useLocalEventWatcher(options.mainRef, 'slideMenuShown', onShown, options);
  }

  if (onHidden) {
    useLocalEventWatcher(options.mainRef, 'slideMenuHidden', onHidden, options);
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

    window.addEventListener('showMenuOrder' as any, enableShowOrder);
    window.addEventListener('hideMenuOrder' as any, enableHideShowOrder);

    return () => {
      window.removeEventListener('showMenuOrder' as any, enableShowOrder);
      window.removeEventListener('hideMenuOrder' as any, enableHideShowOrder);
    };
  }, options);
}
