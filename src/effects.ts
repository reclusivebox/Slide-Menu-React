import type { MutableRefObject } from 'react';

// Backdrop effects
export function showBackdrop(backdropRef: MutableRefObject<null>) {
  return () => {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    backdrop.style.height = '100vh';
    setTimeout(() => {
      backdrop.style.opacity = '0.5';
    }, 100);
  };
}

export function hideBackdrop(backdropRef: MutableRefObject<null>) {
  return () => {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    backdrop.style.opacity = '0.01';
    setTimeout(() => {
      backdrop.style.height = '0.1px';
    }, 500);
  };
}

// Border Effect
export function hideBorder(
  backdropRef: MutableRefObject<null>,
  menuContainerRef: MutableRefObject<null>,
) {
  return () => {
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;
    const backdrop = backdropRef.current as unknown as HTMLElement;

    backdrop.style.width = '100vw';
    menuContainer.style.borderRightWidth = '0px';
  };
}

export function resetBorder(
  backdropRef: MutableRefObject<null>,
  menuContainerRef: MutableRefObject<null>,
) {
  return () => {
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;
    const backdrop = backdropRef.current as unknown as HTMLElement;

    setTimeout(() => {
      backdrop.style.width = 'initial';
    }, 100);
    menuContainer.style.borderRightWidth = '10vw';
  };
}
