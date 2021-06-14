import React, { useEffect, useRef } from 'react';

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

type UseToggleEffectOptions = {
  onShowStart?: (() => void)[];
  onShowEnd?: (() => void)[];
  onHideStart?: (() => void)[];
  onHideEnd?: (() => void)[];
  visibleArea?: number;
};

/**
 * A react Hook to schedule callbacks to be ran when the menu is lauched or when it is hidden.
 * @param menuRef - The Ref for the actual menu (the one with the children).
 * @param options - An object with the following options:
 *  - `onShowStart: (() => void)[]`: A list os callbacks to be called when the menu
 *     starts to be shown.
 *  - `onShowEnd: (() => void)[]`: A list os callbacks to be called when the menu
 *     is shown.
 *  - `onHideStart: (() => void)[]`: A list os callbacks to be called when the menu
 *     starts to be hidden.
 *  - `onHideEnd: (() => void)[]`: A list os callbacks to be called when the menu
 *     is hidden.
 *  - `visibleArea`: The percentage of the screen the menu ocupies even when is
 *    supposed to be hidden.
 */
export function useToggleEffect(
  menuRef: React.MutableRefObject<null>,
  {
    onShowStart = [],
    onShowEnd = [],
    onHideStart = [],
    onHideEnd = [],
    visibleArea = 0,
  }: UseToggleEffectOptions,
) {
  const firstThreshold = 0.1 + visibleArea / 100;
  const secondThreshold = firstThreshold + (1 - firstThreshold) ** (1 + 1 - firstThreshold);

  const activeRef = useRef(false);

  function observerCallback(entries: IntersectionObserverEntry[]) {
    const showRatio = entries[0].intersectionRatio;

    // showStart
    if (
      showRatio >= firstThreshold
      && showRatio < secondThreshold
      && !activeRef.current
    ) {
      onShowStart.forEach((callback) => callback());
    } else

    // showEnd
    if (
      showRatio >= secondThreshold
      && !activeRef.current
    ) {
      onShowEnd.forEach((callback) => callback());
      activeRef.current = true;
    } else

    // hideStart
    if (
      showRatio <= secondThreshold
      && showRatio > firstThreshold
      && activeRef.current
    ) {
      onHideStart.forEach((callback) => callback());
    } else

    // hideEnd
    if (
      showRatio <= firstThreshold
      && activeRef.current
    ) {
      onHideEnd.forEach((callback) => callback());
      activeRef.current = false;
    }
  }

  useMobileEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: [firstThreshold, secondThreshold],
    });

    observer.observe(menuRef.current as unknown as HTMLElement);
  });
}
