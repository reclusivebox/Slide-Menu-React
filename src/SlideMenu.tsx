// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { useLifeCycleEvents } from './hooks';
import { generateMovementHandler, generateTouchStartHandler } from './effects';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  visibleArea: number;
  debug: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onShown?: React.EventHandler<any>,
  onHidden?: React.EventHandler<any>,
}>;

export default function SlideMenu({
  children,
  className,
  style,
  onShown,
  onHidden,
  visibleArea = 0,
  zIndex = 2000,
}: SlideMenuProps) {
  const mainRef = useRef(null);
  const sensibleAreaRef = useRef(null);
  const menuContainerRef = useRef(null);
  const showStateRef = useRef(false);

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

  return (
    <>
      <div
        className={styles.slideMenu}
        ref={mainRef}
      >
        <div className={styles.menuContainer} ref={menuContainerRef}>
          {children}
        </div>
        <div
          className={styles.sensibleArea}
          ref={sensibleAreaRef}
          onTouchMove={generateMovementHandler(mainRef, menuContainerRef, { showStateRef })}
          onTouchStart={generateTouchStartHandler(mainRef, menuContainerRef, { showStateRef })}
        />
      </div>
    </>
  );
}
