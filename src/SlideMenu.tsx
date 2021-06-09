// eslint-disable-next-line no-use-before-define
import React, { useRef, useEffect, useState } from 'react';
import { v4 as UUID } from 'uuid';
import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{}>;

/**
 * React Hook to ajust the menu position on render
 */
function usePositionAjuster(ref: React.MutableRefObject<null>) {
  useEffect(() => {
    (ref.current as unknown as Element).scrollIntoView({
      inline: 'center',
    });
  }, []);
}

function useOpacityAjuster(
  menuRef: React.MutableRefObject<null>,
  backdropRef: React.MutableRefObject<null>,
) {
  function callback(entries: IntersectionObserverEntry[]) {
    const backdrop = backdropRef.current as unknown as HTMLElement;
    const showRatio = entries[0].intersectionRatio;

    if (showRatio > 0.9) {
      backdrop.style.height = '100vh';
      setTimeout(() => {
        backdrop.style.opacity = '0.5';
      }, 100);
    } else if (showRatio < 0.1) {
      backdrop.style.opacity = '0.01';
      setTimeout(() => {
        backdrop.style.height = '0.1px';
      }, 500);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: [0.1, 0.9],
    });

    observer.observe(menuRef.current as unknown as HTMLElement);
  }, []);
}

function disableEvent(event: React.SyntheticEvent) {
  event.preventDefault();
}

export default function SlideMenu({ children }: SlideMenuProps) {
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const [backdropID, setBackdropID] = useState(UUID());

  usePositionAjuster(backdropRef);
  useOpacityAjuster(menuRef, backdropRef);

  return (
    <div className={styles.menuGrid} onPointerMove={disableEvent}>
      <div className={styles.menuContainer}>
        <div className={styles.menuContent} ref={menuRef}>
          {children}
        </div>
      </div>
      <div className={styles.backdrop} id={backdropID} ref={backdropRef} />
    </div>
  );
}
