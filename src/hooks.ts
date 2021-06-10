import React, { useEffect } from 'react';

function useMobileEffect(callback: Function) {
  const isMobile = window.matchMedia('screen and (max-width: 576px)');
  useEffect(() => {
    callback();
  }, [isMobile]);
}

/**
 * React Hook to ajust the menu position on render
 */
export function usePositionAjuster(ref: React.MutableRefObject<null>) {
  useMobileEffect(() => {
    (ref.current as unknown as Element).scrollIntoView({
      inline: 'center',
    });
  });
}

export function useToggleEffect(
  menuRef: React.MutableRefObject<null>,
  activationCallbacks: Function[] = [],
  deactivationCallbacks: Function[] = [],
) {
  function observerCallback(entries: IntersectionObserverEntry[]) {
    const showRatio = entries[0].intersectionRatio;

    if (showRatio > 0.9) {
      activationCallbacks.forEach((callback) => callback());
    } else if (showRatio < 0.1) {
      deactivationCallbacks.forEach((callback) => callback());
    }
  }

  useMobileEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.1, 0.9],
    });

    observer.observe(menuRef.current as unknown as HTMLElement);
  });
}
