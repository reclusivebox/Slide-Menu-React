// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { usePositionAjuster, useToggleEffect } from './hooks';
import {
  showBackdrop, hideBackdrop, hideBorder, resetBorder
} from './effects';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

export default function SlideMenu({
  children,
  className,
  style,
}: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  usePositionAjuster(backdropRef);
  useToggleEffect(
    menuRef,
    [showBackdrop(backdropRef), hideBorder(backdropRef, menuContainerRef)],
    [hideBackdrop(backdropRef), resetBorder(backdropRef, menuContainerRef)],
  );

  return (
    <div className={className} style={style}>
      <div className={styles.menuGrid}>
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
