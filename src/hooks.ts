import React, { useEffect } from 'react';

function useMobileEffect(callback: Function) {
  const isMobile = window.matchMedia('screen and (max-width: 576px)');
  useEffect(() => {
    callback();
  }, [isMobile]);
}

/**
 * A react Hook to scroll the menu on Render.
 * @param ref - The Ref for the element you want to centralize on render.
 */
export function usePositionAjuster(ref: React.MutableRefObject<null>) {
  useMobileEffect(() => {
    (ref.current as unknown as Element).scrollIntoView({
      inline: 'center',
    });
  });
}

/**
 * A react Hook to schedule callbacks to be ran when the menu is lauched or when it is hidden.
 * @param menuRef - The Ref for the actual menu (the one with the children).
 * @param activationCallbacks - A list of functions to be called when the menu is activated.
 * @param deactivationCallbacks - A list of functions to be called when the menu is deactivated.
 */
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
