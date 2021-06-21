import React from 'react';
import { SlideMenuShownEvent, SlideMenuHiddenEvent } from './events';

type SlideMenuOptions = {
  showStateRef: React.MutableRefObject<boolean>;
  animationDuration?: number;
};

function generateMovementHandler(
  slideMenuRef: React.MutableRefObject<null>,
  menuContainerRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const movementHandler: React.EventHandler<
    React.SyntheticEvent<HTMLElement, TouchEvent>
  > = (event) => {
    const touch = (event as unknown as TouchEvent).touches[0];
    const distance = touch.clientX;
    const slideMenu = slideMenuRef.current as unknown as HTMLElement;
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;

    slideMenu.style.transform = `translateX(calc(-100% ${
      options.showStateRef.current ? '+ var(--slide-menu-sensible-area)' : ''
    } + ${
      distance <= menuContainer.offsetWidth
        ? distance
        : menuContainer.offsetWidth
    }px))`;
  };

  return movementHandler;
}

function showCallback(
  slideMenuRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const slideMenu = slideMenuRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;
  slideMenu.style.transform = 'translateX(0%)';
  stateRef.current = true;
  slideMenu.dispatchEvent(new SlideMenuShownEvent());
}

function hideCallback(
  slideMenuRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const slideMenu = slideMenuRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;
  slideMenu.style.transform =
    'translateX(calc(-100% + var(--slide-menu-sensible-area)))';
  stateRef.current = false;
  slideMenu.dispatchEvent(new SlideMenuHiddenEvent());
}

function generateTouchStartHandler(
  slideMenuRef: React.MutableRefObject<null>,
  menuContainerRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const touchStartHandler: React.EventHandler<
    React.SyntheticEvent<HTMLElement, TouchEvent>
  > = (firstEvent) => {
    firstEvent.target.addEventListener(
      'touchend',
      (event) => {
        const touch = (event as unknown as TouchEvent).changedTouches[0];
        const distance = touch.clientX;
        const slideMenu = slideMenuRef.current as unknown as HTMLElement;
        const menuContainer =
          menuContainerRef.current as unknown as HTMLElement;

        slideMenu.style.transition = `transform ${
          options.animationDuration ?? 250
        }ms`;

        if (distance >= menuContainer.offsetWidth / 1.5) {
          showCallback(slideMenuRef, options);
        } else {
          hideCallback(slideMenuRef, options);
        }

        setTimeout(() => {
          slideMenu.style.transition = '';
        }, options.animationDuration ?? 250);
      },
      { once: true },
    );
  };

  return touchStartHandler;
}

export {
  generateMovementHandler,
  generateTouchStartHandler,
  showCallback,
  hideCallback,
  SlideMenuOptions,
};
