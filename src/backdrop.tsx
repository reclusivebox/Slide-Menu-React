// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import styles from './styles/backdrop.module.scss';
import { useQueryDependentEvent } from './hooks';
import {
  SlideMenuShownEvent,
  SlideMenuHiddenEvent,
  HideMenuOrderEvent,
} from './events';

type BackdropProps = {
  exclude?: string[];
  mediaQuery?: string;
  zIndex?: number;
  opacity?: string;
};

const defaultValues = {
  exclude: [],
  mediaQuery: 'screen',
  zIndex: 1000,
  opacity: '0.5',
};

function Backdrop({
  zIndex, exclude, mediaQuery, opacity,
}: BackdropProps) {
  const backdropRef = useRef(null);
  const activeMenus: React.MutableRefObject<Set<string>> = useRef(new Set());

  function menuShownHandler(
    event: React.SyntheticEvent<HTMLElement, SlideMenuShownEvent>,
  ) {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    const menu = event.target as HTMLElement;
    if (!(exclude as string[]).includes(menu.id)) {
      activeMenus.current.add(menu.id);
      backdrop.style.display = 'block';
      setTimeout(() => {
        backdrop.style.opacity = opacity as string;
      });
    }
  }

  function menuHiddenHandler(
    event: React.SyntheticEvent<HTMLElement, SlideMenuHiddenEvent>,
  ) {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    const menu = event.target as HTMLElement;
    if (!(exclude as string[]).includes(menu.id)) {
      activeMenus.current.delete(menu.id);
      if (activeMenus.current.size === 0) {
        backdrop.style.opacity = '0';
        backdrop.addEventListener(
          'transitionend',
          (transitionEvent: TransitionEvent) => {
            const toHide = transitionEvent.target as HTMLElement;
            toHide.style.display = 'none';
          },
          { once: true },
        );
      }
    }
  }

  const closeOrderEmitter: React.EventHandler<any> = (event) => {
    const numberOfExcludedMenus = exclude?.length ?? 0;
    console.log(`Excluded menus: ${numberOfExcludedMenus}`);
    if (numberOfExcludedMenus < 1) {
      event.target.dispatchEvent(new HideMenuOrderEvent());
      console.log('Emited event');
    } else {
      activeMenus.current.forEach(
        (id) => {
          if (!exclude?.includes(id)) {
            event.target.dispatchEvent(new HideMenuOrderEvent(id));
          }
        },
      );
      console.log('Exclusion Emited event');
    }
  };

  useQueryDependentEvent({
    target: window,
    eventName: SlideMenuShownEvent.eventName,
    callback: menuShownHandler,
    mediaQuery: mediaQuery as string,
    capture: true,
  });

  useQueryDependentEvent({
    target: window,
    eventName: SlideMenuHiddenEvent.eventName,
    callback: menuHiddenHandler,
    mediaQuery: mediaQuery as string,
    capture: true,
  });

  return (
    <div
      className={styles.backdrop}
      onClick={closeOrderEmitter}
      ref={backdropRef}
      style={{ zIndex }}
    />
  );
}

Backdrop.defaultProps = defaultValues;
export { Backdrop };
