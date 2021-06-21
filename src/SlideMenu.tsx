// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { useLifeCycleEvents, useOrderEvents } from './hooks';
import { generateMovementHandler, generateTouchStartHandler } from './effects';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  visibleArea: number;
  debug: boolean;
  zIndex?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onShown?: React.EventHandler<any>,
  onHidden?: React.EventHandler<any>,
}>;

export default function SlideMenu({
  children,
  className,
  style,
  id,
  onShown,
  onHidden,
  visibleArea = 0,
  zIndex = 2000,
}: SlideMenuProps) {
  const mainRef = useRef(null);
  const sensibleAreaRef = useRef(null);
  const menuContainerRef = useRef(null);
  const showStateRef = useRef(false);

  const menuGeneralOptions = { showStateRef };

  // Component configuration 0: Object setup
  const customVariables: Object = {};

  // Component configuration 1: z-index
  Object.assign(customVariables, { '--slide-menu-z-index': zIndex });

  // Component configuration 2: visible area
  if (visibleArea > 0 && visibleArea <= 100) {
    Object.assign(customVariables, {
      '--slide-menu-visible-area': `${visibleArea}vw`,
    });
  }

  useLifeCycleEvents(mainRef, onShown, onHidden);
  useOrderEvents(mainRef, menuGeneralOptions);

  return (
    <>
      <div
        className={styles.slideMenu}
        ref={mainRef}
        id={id}
      >
        <div className={styles.menuContainer} ref={menuContainerRef}>
          {children}
        </div>
        <div
          className={styles.sensibleArea}
          ref={sensibleAreaRef}
          onTouchStart={generateTouchStartHandler(mainRef, menuContainerRef, menuGeneralOptions)}
        />
      </div>
    </>
  );
}
