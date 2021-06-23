// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { useLifeCycleEvents, useOrderEvents, useLocalEventWatcher } from './hooks';
import { generateTouchStartHandler } from './effects';
import SlideMenuOptions from './options';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  debug?: boolean;
  border?: 'top' | 'right' | 'bottom' | 'left';
  visibleArea?: string;
  sensibleArea?: string,
  sensibleAreaOffset?: string,
  zIndex?: number;
  animationDuration?: number,
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onShown?: React.EventHandler<any>;
  onHidden?: React.EventHandler<any>;
}>;

export default function SlideMenu({
  children,
  id,
  onShown,
  onHidden,
  visibleArea,
  zIndex,
  border,
  sensibleArea,
  sensibleAreaOffset,
  animationDuration,
}: SlideMenuProps) {
  const mainRef = useRef(null);
  const menuContainerRef = useRef(null);
  const showStateRef = useRef(false);
  const sensibleAreaRef = useRef(null);

  const menuGeneralOptions = new SlideMenuOptions({
    mainRef,
    showStateRef,
    menuContainerRef,
    visibleArea,
    zIndex,
    border,
    sensibleArea,
    sensibleAreaOffset,
    animationDuration,
  });

  useLifeCycleEvents(mainRef, onShown, onHidden);
  useOrderEvents(menuGeneralOptions);
  useLocalEventWatcher(sensibleAreaRef, 'touchstart', generateTouchStartHandler(menuGeneralOptions), true);

  return (
    <>
      <div
        className={styles.slideMenu}
        style={menuGeneralOptions.cssProps as any}
        ref={mainRef}
        id={id}
      >
        <div className={styles.menuContainer} ref={menuContainerRef}>
          {children}
        </div>
        <div
          className={styles.sensibleArea}
          ref={sensibleAreaRef}
        />
      </div>
    </>
  );
}
