// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { useMobileEffect } from './hooks';
import { generateMovementHandler, generateTouchStartHandler } from './effects';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  visibleArea: number;
  debug: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onShowStart?: React.EventHandler<any>;
  onHideStart?: React.EventHandler<any>;
  onHideEnd?: React.EventHandler<any>;
  onShowEnd?: React.EventHandler<any>;
}>;

export default function SlideMenu({
  children,
  className,
  style,
  // onShowStart,
  // onShowEnd,
  // onHideStart,
  // onHideEnd,
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

  // useMobileEffect(() => {
  //   const sensibleArea = sensibleAreaRef.current as unknown as HTMLElement;
  //   sensibleArea.addEventListener
  // });

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
