import type { MutableRefObject } from 'react';

// Backdrop effects
export function showShadow(gridRef: MutableRefObject<null>) {
  return () => {
    const grid = gridRef.current as unknown as HTMLElement;
    setTimeout(() => {
      grid.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }, 100);
  };
}

export function hideShadow(gridRef: MutableRefObject<null>) {
  return () => {
    const grid = gridRef.current as unknown as HTMLElement;
    grid.style.backgroundColor = 'rgba(0, 0, 0, 0)';
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
