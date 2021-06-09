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
  backdropID: string,
) {
  function callback(entries: IntersectionObserverEntry[]) {
    const backdrop = document.getElementById(backdropID) as HTMLElement;
    const showRatio = entries[0].intersectionRatio;

    if (showRatio > 0.9) {
      setTimeout(() => {
        if (entries[0].target.scrollLeft < 10) {
          backdrop.style.display = 'block';
          setTimeout(() => {
            backdrop.style.opacity = '0.5';
          }, 100);
        }
      }, 100);
    } else if (showRatio < 0.1) {
      backdrop.style.opacity = '0';
      setTimeout(() => {
        backdrop.style.display = 'none';
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

export default function SlideMenu({ children }: SlideMenuProps) {
  const placeholderRef = useRef(null);
  const menuRef = useRef(null);
  const [backdropID, setBackdropID] = useState(UUID());

  usePositionAjuster(placeholderRef);
  // useOpacityAjuster(menuRef, backdropID);

  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuContainer} ref={menuRef}>
        <div className={styles.menuContent}>
          {children}
        </div>
      </div>
      <div className={styles.backdrop} id={backdropID} ref={placeholderRef} />
    </div>
  );
}
