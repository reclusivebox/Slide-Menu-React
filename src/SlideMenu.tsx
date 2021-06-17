// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import {
  HideStartEvent,
  HideEndEvent,
  ShowEndEvent,
  ShowStartEvent,
  dispatcherGenerator,
} from './events';
import { showShadow, hideShadow } from './effects';
import { usePositionAjuster, useToggleEffect } from './hooks';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  visibleArea: number;
  debug: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

export default function SlideMenu({
  children,
  className,
  style,
  visibleArea = 0,
  zIndex = 2000,
}: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);
  const gridRef = useRef(null);

  // Scroll overlay after render
  usePositionAjuster(backdropRef);

  // Define callbacks for each stage
  const onShowEndCallbacks: (() => void)[] = [
    showShadow(gridRef),
    dispatcherGenerator(menuRef, ShowEndEvent),
  ];
  const onHideEndCallbacks: (() => void)[] = [
    hideShadow(gridRef),
    dispatcherGenerator(menuRef, HideEndEvent),
  ];
  const onShowStartCallbacks: (() => void)[] = [dispatcherGenerator(menuRef, ShowStartEvent)];
  const onHideStartCallbacks: (() => void)[] = [dispatcherGenerator(menuRef, HideStartEvent)];

  // Enable callbacks and events
  useToggleEffect(menuRef, {
    visibleArea,
    onShowEnd: onShowEndCallbacks,
    onHideEnd: onHideEndCallbacks,
    onHideStart: onHideStartCallbacks,
    onShowStart: onShowStartCallbacks,
  });

  // Component configuration 1: Object setup
  const customVariables: Object = {};

  // Component configuration 2: z-index
  Object.assign(customVariables, { '--slide-menu-z-index': zIndex });

  // Component configuration 3: visible area
  if (visibleArea > 0 && visibleArea <= 100) {
    Object.assign(customVariables, {
      '--slide-menu-visible-area': `${visibleArea}vw`,
    });
  }

  return (
    <div className={className} style={style}>
      <div
        className={styles.menuGrid}
        id="slideMenu"
        ref={gridRef}
        style={customVariables}
      >
        <div className={styles.menuContainer} ref={menuContainerRef}>
          <div className={styles.menuContent} ref={menuRef}>
            {children}
          </div>
        </div>
        <div className={styles.backdrop} ref={backdropRef} />
      </div>
    </div>
  );
}
