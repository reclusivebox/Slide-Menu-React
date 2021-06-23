// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import {
  useLifeCycleEvents,
  useOrderEvents,
  useLocalEventWatcher,
  useMediaQueryObserver,
} from './hooks';
import { generateTouchStartHandler } from './effects';
import SlideMenuOptions from './options';

import mobileStyles from './styles/mobileStyles.module.scss';
import blockStyles from './styles/blockStyles.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  debug?: boolean;
  border?: 'top' | 'right' | 'bottom' | 'left';
  visibleArea?: string;
  sensibleArea?: string;
  sensibleAreaOffset?: string;
  customMediaQuery?: string;
  zIndex?: number;
  animationDuration?: number;
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
  customMediaQuery,
  className,
  style,
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
    customMediaQuery,
  });

  const styles = useMediaQueryObserver(
    menuGeneralOptions.customMediaQuery,
    mobileStyles,
    blockStyles,
  );

  useLifeCycleEvents(menuGeneralOptions, onShown, onHidden);
  useOrderEvents(menuGeneralOptions);
  useLocalEventWatcher(
    sensibleAreaRef,
    'touchstart',
    generateTouchStartHandler(menuGeneralOptions),
    menuGeneralOptions,
    true,
  );

  return (
    <>
      <div
        className={styles.slideMenu}
        style={menuGeneralOptions.cssProps as any}
        ref={mainRef}
        id={id}
      >
        <div
          className={`
            ${styles.menuContainer}
            ${className ? ` ${className}` : ''}
          `}
          style={style}
          ref={menuContainerRef}
        >
          {children}
        </div>
        <div className={styles.sensibleArea} ref={sensibleAreaRef} />
      </div>
    </>
  );
}
