// eslint-disable-next-line no-use-before-define
import React, { useRef, useEffect } from 'react';
import { usePositionAjuster, useToggleEffect } from './hooks';
import { showShadow, hideShadow } from './effects';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  border: 'left' | 'right';
  visibleArea: number;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

const RIGHT_MENU_SETTINGS = {
  '--slide-menu-grid':
    '"backdrop menu" 100vh / calc(100vw - var(--slide-menu-visible-area, 0px)) auto',
};

const LEFT_MENU_SETTINGS = {
  '--slide-menu-grid': '"menu backdrop" 100vh / auto calc(100vw - var(--slide-menu-visible-area, 0px))',
};

export default function SlideMenu({
  children,
  className,
  style,
  visibleArea = 0,
  zIndex = 2000,
  border = 'left',
}: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);
  const gridRef = useRef(null);

  usePositionAjuster(backdropRef);
  // useToggleEffect(menuRef, [showShadow(gridRef)], [hideShadow(gridRef)]);
  useToggleEffect(menuRef, {
    visibleArea,
    onShowEnd: [showShadow(gridRef), () => console.log('working')],
    onHideEnd: [hideShadow(gridRef)],
  });

  // Component configuration
  const customVariables: Object = {};

  // Component configuration 1: Activation border
  if (border === 'right') {
    Object.assign(customVariables, RIGHT_MENU_SETTINGS);
  } else {
    Object.assign(customVariables, LEFT_MENU_SETTINGS);
  }

  // Component configuration 2: z-index
  Object.assign(customVariables, { '--slide-menu-z-index': zIndex });

  // Component configuration 3: visible area
  if (visibleArea > 0 && visibleArea <= 100) {
    Object.assign(customVariables, { '--slide-menu-visible-area': `${visibleArea}vw` });
  }

  return (
    <div className={className} style={style}>
      <div className={styles.menuGrid} ref={gridRef} style={customVariables}>
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
