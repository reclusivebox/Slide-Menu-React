import React from 'react';
import { SlideMenuShownEvent, SlideMenuHiddenEvent } from './events';

type SlideMenuOptions = {
  showStateRef: React.MutableRefObject<boolean>;
  animationDuration?: number;
  border?: 'top' | 'right' | 'bottom' | 'left';
};

function showCallback(
  slideMenuRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const slideMenu = slideMenuRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;

  slideMenu.style.transition = `transform ${
    options.animationDuration ?? 250
  }ms`;
  slideMenu.style.transform = 'translateX(0%)';

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
  slideMenuRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const slideMenu = slideMenuRef.current as unknown as HTMLElement;
  const stateRef = options.showStateRef;

  slideMenu.style.transition = `transform ${
    options.animationDuration ?? 250
  }ms`;
  slideMenu.style.transform = 'var(--shifting-trnsformation)';

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

// function generateMovementHandler(
//   slideMenuRef: React.MutableRefObject<null>,
//   menuContainerRef: React.MutableRefObject<null>,
//   options: SlideMenuOptions,
// ) {
//   const movementHandler: React.EventHandler<
//     React.SyntheticEvent<HTMLElement, TouchEvent>
//   > = (event) => {
//     const touch = (event as unknown as TouchEvent).touches[0];
//     const distance = touch.clientX;
//     const slideMenu = slideMenuRef.current as unknown as HTMLElement;
//     const menuContainer = menuContainerRef.current as unknown as HTMLElement;

//     slideMenu.style.transform = `translateX(calc(-100% ${
//       options.showStateRef.current ? '+ var(--slide-menu-sensible-area)' : ''
//     } + ${
//       distance <= menuContainer.offsetWidth
//         ? distance
//         : menuContainer.offsetWidth
//     }px))`;
//   };

//   return movementHandler;
// }

function generatePositionAjuster(
  slideMenuRef: React.MutableRefObject<null>,
  menuContainerRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  return function positionAjuster(event: TouchEvent) {
    const touch = (event as unknown as TouchEvent).changedTouches[0];
    const distance = touch.clientX;
    const menuContainer = menuContainerRef.current as unknown as HTMLElement;

    if (distance >= menuContainer.offsetWidth / 1.5) {
      showCallback(slideMenuRef, options);
    } else {
      hideCallback(slideMenuRef, options);
    }
  };
}

function fixFirstTouch(options: SlideMenuOptions) {
  if (!options.showStateRef.current && (options.border ?? 'left') === 'left') {
    return ' + var(--slide-menu-sensible-area)';
  }

  return '';
}

function moveMenu(
  target: React.MutableRefObject<null>,
  initialCoordinates: { x: number; y: number },
  currentCoordinates: { x: number; y: number },
  options: SlideMenuOptions,
) {
  const toMove = target.current as unknown as HTMLElement;

  if (!options.showStateRef.current) {
    switch (options.border ?? 'left') {
      case 'top':
        toMove.style.transform = `translateY(calc(-100% + ${
          currentCoordinates.y - initialCoordinates.y
        }))`;
        break;
      case 'right':
        toMove.style.transform = `translateX(calc(100% - ${
          initialCoordinates.x - currentCoordinates.x
        }px))`;
        break;
      case 'bottom':
        toMove.style.transform = `translateY(calc(100% - ${
          initialCoordinates.y - currentCoordinates.y
        }px))`;
        break;
      default:
        toMove.style.transform = `translateX(calc(-100% + ${currentCoordinates.x - initialCoordinates.x}px))`;
        break;
    }
  } else {
    switch (options.border ?? 'left') {
      case 'top':
        toMove.style.transform = `translateY(-${
          initialCoordinates.y - currentCoordinates.y
        }px)`;
        break;
      case 'right':
        toMove.style.transform = `translateX(${
          currentCoordinates.x - initialCoordinates.x
        }px)`;
        break;
      case 'bottom':
        toMove.style.transform = `translateY(${
          currentCoordinates.y - initialCoordinates.y
        }px)`;
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
  targetRef: React.MutableRefObject<null>,
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

    moveMenu(targetRef, initialCoordinates, currentCoordinates, options);
  };
}

function generateTouchStartHandler(
  slideMenuRef: React.MutableRefObject<null>,
  menuContainerRef: React.MutableRefObject<null>,
  options: SlideMenuOptions,
) {
  const touchStartHandler: React.EventHandler<any> = (
    firstEvent: TouchEvent,
  ) => {
    const movementHandler = generateMovementHandler(
      slideMenuRef,
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
      generatePositionAjuster(slideMenuRef, menuContainerRef, options) as any,
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
