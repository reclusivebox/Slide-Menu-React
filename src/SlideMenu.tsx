// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react';
import { usePositionAjuster, useToggleEffect } from './hooks';

import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{}>;

export default function SlideMenu({ children }: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Backdrop effects
  const showBackdrop = () => {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    backdrop.style.height = '100vh';
    setTimeout(() => {
      backdrop.style.opacity = '0.5';
    }, 100);
  };
  const hideBackdrop = () => {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    backdrop.style.opacity = '0.01';
    setTimeout(() => {
      backdrop.style.height = '0.1px';
    }, 500);
  };

  // Border Effect
  const hideBorder = () => {
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;
    const backdrop = backdropRef.current as unknown as HTMLElement;

    backdrop.style.width = '100vw';
    menuContainer.style.borderRightWidth = '0px';
  };
  const resetBorder = () => {
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;
    const backdrop = backdropRef.current as unknown as HTMLElement;

    setTimeout(() => {
      backdrop.style.width = 'initial';
    }, 100);
    menuContainer.style.borderRightWidth = '10vw';
  };

  usePositionAjuster(backdropRef);
  useToggleEffect(menuRef, [showBackdrop, hideBorder], [hideBackdrop, resetBorder]);

  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuContainer} ref={menuContainerRef}>
        <div className={styles.menuContent} ref={menuRef}>
          {children}
        </div>
      </div>
      <div className={styles.backdrop} ref={backdropRef} />
    </div>
  );
}
