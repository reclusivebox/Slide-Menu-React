// eslint-disable-next-line no-use-before-define
import React, { useRef, useEffect } from 'react';
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
    const backdrop = (backdropRef.current as unknown as HTMLElement);
    const showRatio = entries[0].intersectionRatio;
    backdrop.style.opacity = `${showRatio / 2}`;

    if (showRatio > 0.1 && showRatio < 0.2 && entries[0].isIntersecting) {
      backdrop.style.display = 'block';
    } else if (showRatio < 0.2 && !(entries[0].isIntersecting)) {
      backdrop.style.opacity = '0';
      setTimeout(() => {
        backdrop.style.display = 'none';
      }, 500);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    });

    observer.observe((menuRef.current as unknown as HTMLElement));
  }, []);
}

export default function SlideMenu({ children }: SlideMenuProps) {
  const placeholderRef = useRef(null);
  const menuRef = useRef(null);
  const backdropRef = useRef(null);

  usePositionAjuster(placeholderRef);
  useOpacityAjuster(menuRef, backdropRef);

  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuContainer} ref={menuRef}>{children}</div>
      <div className={styles.placeholder} ref={placeholderRef} />
      <div className={styles.backdrop} ref={backdropRef} />
    </div>
  );
}
