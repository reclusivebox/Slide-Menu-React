// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import {
  monitoredEvents,
  dispatcherGenerator,
} from './events';
import { showShadow, hideShadow } from './effects';
import {
  useToggleEffect, useCallbackScheduler, useMobileEffect, useGlobalEventWatcher,
} from './hooks';
import type { CallbackSchedulerOptions } from './hooks';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  visibleArea: number;
  debug: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onShowStart?: React.EventHandler<any>,
  onHideStart?: React.EventHandler<any>,
  onHideEnd?: React.EventHandler<any>,
  onShowEnd?: React.EventHandler<any>,
}>;

export default function SlideMenu({
  children,
  className,
  style,
  onShowStart,
  onShowEnd,
  onHideStart,
  onHideEnd,
  visibleArea = 0,
  zIndex = 2000,
}: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);
  const gridRef = useRef(null);

  // Controlling functions
  const showMenu = () => {
    (menuContainerRef.current as unknown as HTMLElement).scrollIntoView({
      inline: 'start',
      behavior: 'smooth',
    });
  };

  const hideMenu = () => {
    (backdropRef.current as unknown as HTMLElement).scrollIntoView({
      inline: 'end',
    });
  };

  // Scroll overlay after render
  useMobileEffect(hideMenu);

  // Define callbacks for each stage
  const onShowEndCallbacks: (() => void)[] = [
    showShadow(gridRef),
    dispatcherGenerator(menuRef, monitoredEvents.showEnd),
  ];
  const onHideEndCallbacks: (() => void)[] = [
    hideShadow(gridRef),
    dispatcherGenerator(menuRef, monitoredEvents.hideEnd),
  ];
  const onShowStartCallbacks: (() => void)[] = [
    dispatcherGenerator(menuRef, monitoredEvents.showStart),
  ];
  const onHideStartCallbacks: (() => void)[] = [
    dispatcherGenerator(menuRef, monitoredEvents.hideStart),
  ];

  // Enable callbacks and events
  useToggleEffect(menuRef, {
    visibleArea,
    onShowEnd: onShowEndCallbacks,
    onHideEnd: onHideEndCallbacks,
    onHideStart: onHideStartCallbacks,
    onShowStart: onShowStartCallbacks,
  });

  // Parsing Event Handlers 0: Object setup
  const eventHandlers: CallbackSchedulerOptions = {};

  // Parsing Event Handlers 1: showStart
  if (onShowStart) {
    eventHandlers.showStart = onShowStart;
  }

  // Parsing Event Handlers 2: showEnd
  if (onShowEnd) {
    eventHandlers.showEnd = onShowEnd;
  }

  // Parsing Event Handlers 3: hideStart
  if (onHideStart) {
    eventHandlers.hideStart = onHideStart;
  }

  // Parsing Event Handlers 4: hideEnd
  if (onHideEnd) {
    eventHandlers.hideEnd = onHideEnd;
  }

  // Schedule handlers
  useCallbackScheduler(menuRef, eventHandlers);

  // Enabling control through order events
  useGlobalEventWatcher('showMenuOrder', showMenu);
  useGlobalEventWatcher('hideMenuOrder', hideMenu);

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
