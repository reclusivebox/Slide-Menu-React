import React from 'react';
import { SlideMenuShownEvent, SlideMenuHiddenEvent } from './events';
import type SlideMenuOptions from './options';

function showCallback(
  options: SlideMenuOptions,
) {
  const slideMenu = options.mainRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;

  slideMenu.style.transition = `transform ${options.animationDuration}ms`;
  slideMenu.style.transform = 'unset';

  slideMenu.addEventListener(
    'transitionend',
    (event) => {
      if (event.propertyName === 'transform') {
        slideMenu.style.transition = '';

        if (!stateRef.current) {
          stateRef.current = true;
          slideMenu.dispatchEvent(new SlideMenuShownEvent());
        }
      }
    },
    { once: true },
  );
}

function hideCallback(
  options: SlideMenuOptions,
) {
  const slideMenu = options.mainRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;

  slideMenu.style.transition = `transform ${options.animationDuration}ms`;
  slideMenu.style.transform = 'var(--shifting-transformation)';

  slideMenu.addEventListener(
    'transitionend',
    (event) => {
      if (event.propertyName === 'transform') {
        slideMenu.style.transition = '';

        if (stateRef.current) {
          stateRef.current = false;
          slideMenu.dispatchEvent(new SlideMenuHiddenEvent());
        }
      }
    },
    { once: true },
  );
}

// Calculates if the menu should be shown after a partial touch, true means show
function calculateVisibility(element: HTMLElement, touch: Touch, options: SlideMenuOptions) {
  let distance;
  let elementSize;

  switch (options.border) {
    case 'right':
      distance = window.innerWidth - touch.clientX;
      elementSize = element.offsetWidth;
      break;
    case 'top':
      distance = touch.clientY;
      elementSize = element.offsetHeight;
      break;
    case 'bottom':
      distance = window.innerHeight - touch.clientY;
      elementSize = element.offsetHeight;
      break;
    default:
      distance = touch.clientX;
      elementSize = element.offsetWidth;
      break;
  }

  return distance >= elementSize / 1.5;
}

// After a partial touch, hides or shows the menu depending on the distance
function generatePositionAjuster(
  options: SlideMenuOptions,
) {
  return function positionAjuster(event: TouchEvent) {
    const touch = (event as unknown as TouchEvent).changedTouches[0];
    const menuContainer = options.menuContainerRef.current as unknown as HTMLElement;

    if (calculateVisibility(menuContainer, touch, options)) {
      showCallback(options);
    } else {
      hideCallback(options);
    }
  };
}

function moveMenu(
  initialCoordinates: { x: number; y: number },
  currentCoordinates: { x: number; y: number },
  options: SlideMenuOptions,
) {
  const toMove = options.mainRef.current as unknown as HTMLElement;

  if (!options.showStateRef.current) {
    switch (options.border) {
      case 'top':
        toMove.style.transform = `translateY(
            min(
              calc(-100% + ${currentCoordinates.y - initialCoordinates.y}px),
              0px
            )
          )`;
        break;
      case 'right':
        toMove.style.transform = `translateX(
          max(
            calc(100% - ${initialCoordinates.x - currentCoordinates.x}px),
            0px
          )
        )`;
        break;
      case 'bottom':
        toMove.style.transform = `translateY(
            max(
              calc(100% - ${initialCoordinates.y - currentCoordinates.y}px),
              0px
            )
          )`;
        break;
      default:
        toMove.style.transform = `translateX(
          min(
            calc(-100% + ${currentCoordinates.x - initialCoordinates.x}px),
            0px
          )
        )`;
        break;
    }
  } else {
    switch (options.border) {
      case 'top':
        toMove.style.transform = `translateY(-${
          initialCoordinates.y - currentCoordinates.y
        }px)`;
        break;
      case 'right':
        toMove.style.transform = `translateX(
          max(
            ${currentCoordinates.x - initialCoordinates.x}px,
            0px
          )
        )`;
        break;
      case 'bottom':
        toMove.style.transform = `translateY(
          max(
            ${currentCoordinates.y - initialCoordinates.y}px,
            0px
          )
        )`;
        break;
      default:
        toMove.style.transform = `translateX(calc(-${
          initialCoordinates.x - currentCoordinates.x
        }px))`;
        break;
    }
  }
}

function generateMovementHandler(
  initialTouch: Touch,
  options: SlideMenuOptions,
) {
  return function movementHandler(event: TouchEvent) {
    const initialCoordinates = {
      x: initialTouch.clientX,
      y: initialTouch.clientY,
    };
    const currentCoordinates = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };

    moveMenu(initialCoordinates, currentCoordinates, options);
  };
}

function generateTouchStartHandler(
  options: SlideMenuOptions,
) {
  const touchStartHandler: React.EventHandler<any> = (
    firstEvent: TouchEvent,
  ) => {
    const movementHandler = generateMovementHandler(
      firstEvent.touches[0],
      options,
    );

    // Move the menu
    firstEvent.target?.addEventListener('touchmove', movementHandler as any);

    // Remove Handler after movement
    firstEvent.target?.removeEventListener('touchend', movementHandler as any);

    // Ajust the position after the scroll
    firstEvent.target?.addEventListener(
      'touchend',
      generatePositionAjuster(options) as any,
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
