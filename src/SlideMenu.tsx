// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { usePositionAjuster, useToggleEffect } from './hooks';
import { showShadow, hideShadow } from './effects';

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
  debug = false,
}: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);
  const gridRef = useRef(null);

  usePositionAjuster(backdropRef);
  // useToggleEffect(menuRef, [showShadow(gridRef)], [hideShadow(gridRef)]);
  useToggleEffect(menuRef, {
    visibleArea,
    onShowEnd: (debug) ? [showShadow(gridRef), () => console.log('showEnd')] : [showShadow(gridRef)],
    onHideEnd: (debug) ? [hideShadow(gridRef), () => console.log('hideEnd')] : [hideShadow(gridRef)],
    onHideStart: (debug) ? [() => console.log('hideStart')] : [],
    onShowStart: (debug) ? [() => console.log('showStart')] : [],
  });

  // Component configuration
  const customVariables: Object = {};

  // Component configuration 2: z-index
  Object.assign(customVariables, { '--slide-menu-z-index': zIndex });

  // Component configuration 3: visible area
  if (visibleArea > 0 && visibleArea <= 100) {
    Object.assign(customVariables, { '--slide-menu-visible-area': `${visibleArea}vw` });
  }

  return (
    <div className={className} style={style}>
      <div className={styles.menuGrid} id="slideMenu" ref={gridRef} style={customVariables}>
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
