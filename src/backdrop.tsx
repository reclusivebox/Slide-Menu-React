// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import styles from './styles/backdrop.module.scss';
import { useQueryDependentEvent } from './hooks';
import { SlideMenuShownEvent, SlideMenuHiddenEvent } from './events';

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

export default function Backdrop({
  zIndex,
  exclude,
  mediaQuery,
  opacity,
}: BackdropProps) {
  const backdropRef = useRef(null);

  function menuShownHandler(
    event: React.SyntheticEvent<HTMLElement, SlideMenuShownEvent>,
  ) {
    const target = event.target as HTMLElement;
    if (!(exclude as string[]).includes(target.id)) {
      target.style.display = 'block';
      setTimeout(() => {
        target.style.opacity = opacity as string;
      });
    }
  }

  function menuHiddenHandler(
    event: React.SyntheticEvent<HTMLElement, SlideMenuHiddenEvent>,
  ) {
    const target = event.target as HTMLElement;
    if (!(exclude as string[]).includes(target.id)) {
      target.style.opacity = '0.1';
      target.addEventListener('transitionend', (transitionEvent: TransitionEvent) => {
        const toHide = transitionEvent.target as HTMLElement;
        toHide.style.display = 'none';
      }, { once: true });
    }
  }

  useQueryDependentEvent({
    target: backdropRef,
    eventName: SlideMenuShownEvent.eventName,
    callback: menuShownHandler,
    mediaQuery: mediaQuery as string,
  });

  useQueryDependentEvent({
    target: backdropRef,
    eventName: SlideMenuHiddenEvent.eventName,
    callback: menuHiddenHandler,
    mediaQuery: mediaQuery as string,
  });

  return (
    <div className={styles.backdrop} ref={backdropRef} style={{ zIndex }} />
  );
}

Backdrop.defaultProps = defaultValues;
